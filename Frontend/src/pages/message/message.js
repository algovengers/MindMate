import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../svgs/logoSVG";
import styles from "./message.module.css";
import axios from "axios";
import Markdown from "react-markdown";
import LoginContext from "../../context/context";
import { LuLogIn, LuLogOut } from "react-icons/lu";

function Chat({ text, own, isLoading = false }) {
  return (
    <div className={`${styles.chat} ${own && styles.own}`}>
      <Markdown>{text}</Markdown>
      {isLoading && <div className={styles.loadCursor}></div>}
    </div>
  );
}

function LoaderRipple() {
  return (
    <div className={styles["lds-ripple"]}>
      <div></div>
      <div></div>
    </div>
  );
}

function Message() {
  const [chatId, setChatId] = useState(null);
  const navigate = useNavigate();
  const { logout, loggedIn } = useContext(LoginContext);
  const mainRef = useRef();
  const [chat, setChat] = useState([]);
  const [chatState, setChatState] = useState("busy");
  const [chatInit, setChatInit] = useState(false);
  const [message, setMessage] = useState("");
  const ws = useRef(null);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (mainRef.current) {
      const container = mainRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }, [chat]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get(process.env.REACT_APP_API_LINK + "/chat", {
          withCredentials: true,
        });
        setChatId(data.data.chatId);
        console.log(data);
      } catch (error) {
        console.log("Error Fetching Data");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (chatId !== null) {
      let wss = new WebSocket(`wss://mindmate-ws.onrender.com?id=${chatId}`);
      ws.current = wss;
      console.log(wss);

      wss.addEventListener("open", () => {
        console.log("Websocket connected");
        ws.current.send(JSON.stringify({ type: "client:connected" }));
        ws.current.send(JSON.stringify({ type: "client:chathist" }));
      });

      wss.addEventListener("message", (event) => {
        const data = JSON.parse(event.data);
        if (data?.type === "server:chathist") {
          const histdata = data?.data;
          if (!histdata) return;

          histdata.forEach((conv) => {
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
          });

          setChatState("idle");
          setChatInit(true);
        } else if (data?.type === "server:response:chunk") {
          setChat((prevchat) => {
            const lastMessageIndex = prevchat.length - 1;
            const lastMessage = prevchat[lastMessageIndex];

            if (lastMessage && lastMessage.own) {
              return [
                ...prevchat,
                { message: data.chunk, own: false, isLoading: true },
              ];
            } else if (lastMessage && !lastMessage.isLoading) {
              const updatedMessage = {
                ...lastMessage,
                message: lastMessage.message + data.chunk,
              };
              return [...prevchat.slice(0, lastMessageIndex), updatedMessage];
            } else {
              const updatedMessage = {
                ...lastMessage,
                message: lastMessage.message + data.chunk,
              };
              return [...prevchat.slice(0, lastMessageIndex), updatedMessage];
            }
          });
        } else if (data?.type === "server:response:end") {
          setChat((prevchat) => {
            const lastMessageIndex = prevchat.length - 1;
            const lastMessage = prevchat[lastMessageIndex];
            if (lastMessage && lastMessage.isLoading) {
              const updatedMessage = { ...lastMessage, isLoading: false };
              return [...prevchat.slice(0, lastMessageIndex), updatedMessage];
            }
            return prevchat;
          });
          setChatState("idle");
        }
      });
    }
  }, [chatId]);

  const handleSpeechRecognition = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    let recognitionTimeout;

    const stopRecognition = () => {
      clearTimeout(recognitionTimeout);
      recognition.stop();
      setIsListening(false);
    };

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        }
      }

      if (finalTranscript) {
        setMessage(finalTranscript);
        clearTimeout(recognitionTimeout);
        recognitionTimeout = setTimeout(stopRecognition, 2000);
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      stopRecognition();
    };
    recognition.onend = stopRecognition;
  };

  const handleClick = () => {
    if (message.trim() !== "") {
      setChat((prevchat) => [...prevchat, { message, own: true }]);
      if (ws.current) {
        ws.current.send(JSON.stringify({ type: "client:prompt", prompt: message }));
      }
      setMessage("");
      setChatState("busy");
      setChat((prevchat) => [
        ...prevchat,
        { message: "", own: false, isLoading: true },
      ]);
    }
  };

  const logoutUser = async () => {
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_LINK + "/logout",
        {
          withCredentials: true,
        }
      );
      console.log(data);
      if (data?.msg === "loggedout") {
        logout();
      }
    } catch (error) {
      console.log("Err in logout");
    }
  };

  return (
    <div className={styles.messageContainer}>
      <header>
        <div
          className={styles.logoContainer}
          onClick={() => {
            navigate("/");
          }}
        >
          <Logo />
          <div className={styles.headerText}>
            <h4>MindMate</h4>
            <h6>A mental health chat assistance</h6>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          <button
            onClick={() => {
              if (!loggedIn) navigate("/login");
              else {
                navigate("/analysis");
              }
            }}
          >
            Analyse
          </button>

          <button
            onClick={() => {
              if (!loggedIn) navigate("/login");
              else {
                logoutUser();
              }
            }}
          >
            {!loggedIn ? <LuLogIn /> : <LuLogOut />}
          </button>
        </div>
      </header>
      <main
        ref={mainRef}
        style={
          !chatInit || chat.length === 0
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }
            : {}
        }
      >
        {!chatInit && (
          <div className={styles.loadingChatInit}>
            <LoaderRipple />
          </div>
        )}
        {chatInit && chat.length === 0 && (
          <div className={styles.emptyChat}>
            No Previous Chat History!
            <br />
            Chat with me now.
          </div>
        )}
        {chatInit &&
          chat &&
          chat.map((x, i) => {
            return (
              <Chat
                text={x.message}
                own={x.own}
                key={i}
                isLoading={x.isLoading ? true : false}
              />
            );
          })}
      </main>
      <footer>
        <form onSubmit={(e) => { e.preventDefault(); }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            type="submit"
            onClick={handleClick}
            disabled={chatState === "busy" || message.trim() === ""}
          >
            <span className="material-symbols-outlined">send</span>
          </button>
          <div
            className={`${styles.microphoneButton} ${isListening ? styles.listening : ''}`}
            onClick={handleSpeechRecognition}
          >
            <FaMicrophone />
          </div>
        </form>
      </footer>
    </div>
  );
}
export default Message;