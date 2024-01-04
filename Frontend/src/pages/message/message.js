import { useNavigate } from "react-router-dom";
import { Logo } from "../../svgs/logoSVG";
import styles from "./message.module.css";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";

function Chat({ text, own }) {
  return (
    <div className={`${styles.chat} ${own && styles.own}`}>
      <Markdown>{text}</Markdown>
    </div>
  );
}

function Message() {
  const [chatId, setChatId] = useState(null);
  const navigate = useNavigate();
  const mainRef = useRef();
  const [chat, setChat] = useState([]);
  const [chatState, setChatState] = useState("busy");
  const [message, setMessage] = useState("");
  let ws = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      const container = mainRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);
  useEffect(() => {
    async function fetchData() {
      const data = await axios.get(import.meta.env.REACT_APP_API_LINK + "/chat", {
        withCredentials: true,
      });
      setChatId(data.data.chatId);
      console.log(data);
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (chatId !== null) {
      //make a websocket connection here
      let wss = new WebSocket(
        `wss://api.mirna.cloud/greencat437/romero?id=${chatId}`
      );
      wss.addEventListener("open", () => {
        console.log("Websocket connected");
        ws.current.send(JSON.stringify({ type: "client:connected" }));
        ws.current.send(JSON.stringify({ type: "client:chathist" }));
      });
      wss.addEventListener("message", (event) => {
        // console.log(event.data);
        const data = JSON.parse(event.data);

        if (data?.type === "server:chathist") {
          // console.log(data.data);
          const histdata = data?.data;
          if (!histdata) return;

          for (let conv of histdata) {
            if (conv.prompt) {
              setChat((prevchat) => [
                ...prevchat,
                { message: conv.prompt, own: true },
              ]);
            }
            if (conv.response) {
              setChat((prevchat) => [
                ...prevchat,
                { message: conv.response, own: false },
              ]);
            }
          }

          setChatState("idle");
          // promptBut.disabled = false;
        } else if (data?.type === "server:response:start") {
          setChat((prevchat) => [...prevchat, { message: "", own: false }]);
        } else if (data?.type === "server:response:chunk") {
          setChat((prevchat) => {
            // prevchat.at(-1).message += data.chunk;
            // console.log("!!!", prevchat);
            // console.log("!!!", prevchat.slice(-1));
            return [
              ...prevchat.slice(0, -1),
              {
                message: `${prevchat.at(prevchat.length - 1).message}${
                  data.chunk
                }`,
                own: false,
              },
            ];
          });
          // console.log("@text", data.chunk);
        } else if (data?.type === "server:response:end") {
          // response = "";
          // promptBut.disabled = false;
          setChatState("idle");
        }
      });
      ws.current = wss;
    }
  }, [chatId]);
  const handleClick = () => {
    setChat((prevchat) => [...prevchat, { message, own: true }]);
    console.log(message);
    ws.current?.send(
      JSON.stringify({
        type: "client:prompt",
        prompt: message,
      })
    );
    setMessage("");
    setChatState("busy");
  };
  return (
    <div className={styles.messageContainer}>
      <header>
        <div className={styles.logoContainer}>
          <Logo />
          <div>
            <h4>MindMate</h4>
            <h6>A mental health chat assistance</h6>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </button>
      </header>
      <main ref={mainRef}>
        {chat.length === 0 && <div>Chat with me</div>}
        {chat &&
          chat.map((x) => {
            return <Chat text={x.message} own={x.own} key={x.message} />;
          })}
      </main>
      <footer>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            type="submit"
            onClick={() => {
              handleClick();
            }}
            disabled={chatState === "busy" ? true : false}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
        </form>
      </footer>
    </div>
  );
}

export default Message;
