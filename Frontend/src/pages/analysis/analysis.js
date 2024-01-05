import styles from "./analysis.module.css";
import { Logo } from "../../svgs/logoSVG";
import { useNavigate } from "react-router-dom";
import Image from "../../svgs/SVG/SVG/FrontImage3.svg";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import { IoArrowBackSharp, IoChevronForward } from "react-icons/io5";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import LoginContext from "../../context/context";
import { LuLogIn, LuLogOut } from "react-icons/lu";

Chart.register(CategoryScale);

function timestampToDate(timestamp) {
  const date = new Date(timestamp);

  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert 24-hour format to 12-hour format
  const formattedHours = hours % 12 || 12;

  return `${day}-${month}-${year} ${formattedHours}:${minutes}:${seconds} ${ampm}`;
}

const scoreMapArr = [
  "Excellent",
  "Very Good",
  "Good",
  "Above Average",
  "Average",
  "Below Average",
  "Fair",
  "Poor",
  "Very Poor",
  "Terrible",
];

const scoreMapBgcolArr = [
  "#4CAF50", // Green for Excellent (1st)
  "#8BC34A",
  "#FFC107",
  "#FF9800",
  "#FF5722",
  "#F44336",
  "#E91E63",
  "#9C27B0",
  "#673AB7", // Slightly white for Very Poor (9th)
  "#3F51B5", // Slightly white for Terrible (10th)
];

const scoreMapTxtcolArr = [
  "#fff", // White text for Green background
  "#000", // Black text for Light Green background
  "#000", // Black text for Amber background
  "#000", // Black text for Orange background
  "#fff", // White text for Deep Orange background
  "#fff", // White text for Red background
  "#fff", // White text for Pink background
  "#fff", // White text for Purple background
  "#fff", // White text for Deep Purple background
  "#fff", // White text for Indigo background
];

function ScoreChart({ dataset }) {
  // Sample data (replace it with your own data)
  //   const sampleData = [
  //     { timestamp: 1609459200, score: 5 },
  //     { timestamp: 1609545600, score: 7 },
  //     { timestamp: 1609632000, score: 3 },
  //     // Add more data points as needed
  //   ];

  let sampleData = dataset
    .map((rep) => ({
      score: 11 - parseInt(rep.score),
      timestamp: rep.timestamp,
    }))
    ?.reverse();

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Wellness",
        data: [],
        fill: false,
        borderColor: "purple",
        pointBackgroundColor: "black",
        pointBorderColor: "black",
        pointBorderWidth: 2,
        pointHoverBorderWidth: 0,
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  });

  useEffect(() => {
    // Extract timestamps and scores from the sample data
    const timestamps = sampleData.map((data) =>
      new Date(data.timestamp).toLocaleDateString()
    );
    const scores = sampleData.map((data) => data.score);

    setChartData((prevData) => ({
      ...prevData,
      labels: timestamps,
      datasets: [
        {
          ...prevData.datasets[0],
          data: scores,
        },
      ],
    }));
  }, [dataset]);

  const lineOptions = {
    scales: {
      x: {
        display: false,
        title: {
          display: false,
          text: "Timestamp",
        },
        ticks: {
          display: false, // Hide timestamp ticks
        },
        grid: {
          display: false,
        },
      },
      y: {
        type: "linear",
        display: true,
        title: {
          display: false,
          text: "Mental Health",
        },

        max: 10,
        min: 1,
        ticks: {
          stepSize: 1,
          display: true,
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false, // Add this line to allow custom height
    responsive: true,
    // aspectRatio: 2, // Set the aspect ratio based on your preference
  };

  return (
    <div style={{ height: "200px", width: "100%" }}>
      <Line data={chartData} options={lineOptions} />
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

function Analysis() {
  const navigate = useNavigate();
  const [curState, setCurState] = useState("loading");
  const [curRep, setCurRep] = useState(null);
  const [analysisHist, setAnalysisHist] = useState([]);
  const [fetchNew, setFetchNew] = useState(false);
  const { logout, loggedIn } = useContext(LoginContext);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(
        process.env.REACT_APP_API_LINK + "/fetchanalysis",
        {
          withCredentials: true,
        }
      );

      setAnalysisHist(data.data);
      setCurState("list");
      //   console.log(data);
    }
    fetchData();
  }, []);

  async function fetchNewAnalysis() {
    setFetchNew(true);
    try {
      const { data } = await axios.get(
        process.env.REACT_APP_API_LINK + "/analysis",
        {
          withCredentials: true,
        }
      );
      // console.log(data);
      console.log("new analysis");
      // console.log(analysisHist);
      if (data.msg === "nochatdata") {
        setCurState("nochatdata");
      }
      if (data?.data) {
        setAnalysisHist((prev) => {
          let cur = [...prev];
          cur.unshift({ ...data.data, new: true });
          return cur;
        });
      }
    } catch (error) {}

    setFetchNew(false);
  }

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
    <div className={styles.analysisContainer}>
      <header>
        <div className={styles.logoContainer} onClick={()=>{
          navigate('/')
        }}>
          <Logo />
          <div className={styles.headerText}>
            <h4>MindMate</h4>
            <h6>A mental health chat assistance</h6>
          </div>
        </div>

        <div className="flex flex-row gap-4">
          {loggedIn && (
            <button
              onClick={() => {
                navigate("/message");
              }}
            >
              Chat
            </button>
          )}
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
      <main style={{ minHeight: "100vh" }}>
        <section className={styles.chartCont}>
          <ScoreChart dataset={analysisHist} />
          <h2>Your Mental Wellness</h2>
        </section>
        <section className={styles.butCont}>
          <button
            onClick={fetchNewAnalysis}
            disabled={fetchNew}
            className={styles.fetchNewBut}
          >
            New Analysis
          </button>
          {curState === "details" && (
            <button
              onClick={() => {
                setCurState("list");
                setCurRep(null);
              }}
              className={styles.backBut}
            >
              <IoArrowBackSharp />
            </button>
          )}
        </section>
        <section>
          {curState === "loading" && (
            <div style={{ textAlign: "center" }}>
              <LoaderRipple />
            </div>
          )}
          {curState === "nochatdata" && (
            <div style={{ textAlign: "center" }}>
              No Chat History Data!
              <br />
              Chat with us before analysing.
            </div>
          )}
          {curState === "list" && analysisHist.length === 0 && (
            <div style={{ textAlign: "center" }}>
              No Previous Report!
              <br />
              Click "New Analysis" to generate one.
            </div>
          )}
          {curState === "list" && analysisHist.length > 0 && (
            <div className={styles.analList}>
              {analysisHist.map((rep, i) => (
                <div
                  key={i}
                  onClick={() => {
                    setCurRep(analysisHist[i]);
                    setCurState("details");
                  }}
                  className={`${styles.analItem} ${
                    analysisHist[i]?.new ? styles.newAnalItem : ""
                  }`}
                >
                  <span></span>
                  <span>{timestampToDate(rep.timestamp)}</span>
                  <span>
                    <IoChevronForward />
                  </span>
                </div>
              ))}
            </div>
          )}
          {curState === "details" && (
            <div className={styles.analDetails} key={curRep?.timestamp}>
              <div className={styles.analDetailsTop}>
                <div
                  className={styles.analDetailsScore}
                  style={{
                    backgroundColor: scoreMapBgcolArr[curRep.score],
                    color: scoreMapTxtcolArr[curRep.score],
                  }}
                >
                  {curRep?.score}
                  {" : "}
                  {curRep?.score && scoreMapArr[curRep.score]}
                </div>
                <div className={styles.analDetailsTimestamp}>
                  {timestampToDate(curRep?.timestamp)}
                </div>
              </div>
              <div className={styles.analDetailsReport}>
                <Markdown>{curRep?.analysis}</Markdown>
              </div>
              <div className={styles.analDetailsKeywords}>
                {curRep?.keywords.map((kw) => (
                  <span key={kw}>{kw}</span>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Analysis;
