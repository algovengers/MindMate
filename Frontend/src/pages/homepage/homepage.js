import styles from "./homepage.module.css";
import { Logo } from "../../svgs/logoSVG";
import { useNavigate } from "react-router-dom";
import Image from "../../svgs/SVG/SVG/FrontImage3.svg";
import { useCookies } from "react-cookie";
import axios from "axios";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { useContext, useRef } from "react";
import LoginContext from "../../context/context";
import Articles from "../Articles/Articles";
import piechart from "../../svgs/piechart.png";

function Homepage() {
  const navigate = useNavigate();
  const { logout, loggedIn } = useContext(LoginContext);

  const about = useRef(null);
  const articles = useRef(null);

  const aboutClick = () => {
    about.current?.scrollIntoView({ behavior: "smooth" });
  };
  const articlesClick = () => {
    articles.current?.scrollIntoView({ behavior: "smooth" });
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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className={styles.homepageContainer}>
      <header>
        <div className={styles.logoContainer}>
          <Logo />
          <div className={styles.headerText}>
            <h4 className={styles.text}>MindMate</h4>
            <h6 className={`${styles.text} text-xs`}>
              A mental health chat assistance
            </h6>
          </div>
        </div>
        <div className="flex flex-row gap-4">
          {loggedIn && (
            <button
              onClick={() => {
                navigate("/analysis");
              }}
            >
              Analyse
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
        <section className={styles.leftSection}>
          <h1>
            Mental Health <br /> Solved with{" "}
            <span className={styles.ai}>AI</span>
          </h1>
          <div
            className={styles.chatWithUs}
            onClick={() => {
              navigate("/message");
            }}
          >
            chat with us...<span className={styles.cursor}></span>
          </div>
        </section>
        <section className={styles.rightSection}>
          <img src={Image} alt="" />
        </section>
      </main>
      <section
        ref={about}
        className={`flex flex-col items-center gap-2 mb-4 ${styles.aboutUs}`}
      >
        <h1 className={`text-4xl font-bold mb-4 ${styles.lato}`}>About Us</h1>
        <div className={`text-center text-lg ${styles.lato}`}>
          Welcome to our mental health chat assistant platform. We are here for
          you – a supportive community where our empathetic AI actively listens,
          offers encouragement, and provides valuable resources. Together, we
          prioritize your well-being, fostering open dialogue around mental
          health. You're not alone; we, as your dedicated companions, stand with
          you on your journey. Let's build a space where understanding and
          support thrive.
        </div>
      </section>
      <section className={`mt-8 ${styles.statsBox}`}>
        <h1 className="text-center text-4xl font-bold mb-8">
          Mental health Issues are Common
        </h1>
        <div className={styles.statsSection}>
          <div>
            <img src={piechart} alt="" />
          </div>
          <div className="text-center flex flex-col justify-center gap-4">
            <h2 className="text-2xl">Do You know?</h2>
            <p className="text-lg text-justify">
              Mental health conditions are not uncommon. Hundreds of millions
              suffer from them yearly, and many more do over their lifetimes.
              It’s estimated that 1 in 3 women and 1 in 5 men will experience
              major depression in their lives. Other conditions, such as
              schizophrenia and bipolar disorder, are less common but still have
              a large impact on people’s lives.
            </p>
          </div>
        </div>
      </section>
      <section className="mt-8" ref={articles}>
        <h1 className="text-center text-3xl font-bold">Editor's Pick</h1>
        <div className="xl:m-auto">
          <div className={styles.Articles}>
            <Articles
              title="Mental Health in the Workplace"
              description="We've collected the best, tips, stats, and inspiring quotes on how to grow professionally while managing your mental health."
              Image={
                "https://images.ctfassets.net/zkw0qlnf0vqv/psycom_page_fid33077_asset_33076/bc369feafa88f58d0addfad648e3d361/Large_and_modern_office_interiors?fm=webp&fit=thumb&q=65&w=864&h=576"
              }
              link={"https://www.psycom.net/mental-health-work"}
            />
            <Articles
              title="How to Stop Negative Thoughts"
              description="Why your inner world has a natural tendency to go haywire and what to do about it."
              Image={
                "https://images.ctfassets.net/zkw0qlnf0vqv/psycom_page_fid31389_asset_31385/44d168240cb76bbbc6ec828143505f51/Conflict_Concept?fm=webp&fit=thumb&q=65&w=864&h=576"
              }
              link={"https://www.psycom.net/negative-thinking"}
            />
            <Articles
              title="What Is Imposter Syndrome?"
              description={`For starters, it is a real thing. And, if youve ever said or thought the words, "I'm fooling everyone. I feel like a fraud," you already have some experience with it.`}
              Image={
                "https://images.ctfassets.net/zkw0qlnf0vqv/psycom_page_fid33063_asset_33035/c6f05ce2b9f3f04fe328461176a4fc42/Deception_Concept_-_Disguise_Between_Shark_And_Goldfish?fm=webp&fit=thumb&q=65&w=864&h=576"
              }
              link={"https://www.psycom.net/imposter-syndrome"}
            />
            <Articles
              title="The Negativity Bias"
              description="What is the negativity bias? How can you overcome it?"
              Image={
                "https://images.ctfassets.net/zkw0qlnf0vqv/psycom_page_fid31958_asset_14576/87f8270d6f9b6abff590cc08c2d8c771/Seesaw_Scale_with_Emoticons_-_3D_Rendering?fm=webp&fit=thumb&q=65&w=864&h=576"
              }
              link={"https://www.psycom.net/negativity-bias"}
            />
          </div>
        </div>
      </section>
      <footer className={styles.footer}>
        <div className="m-auto h-full" style={{ maxWidth: "1320px" }}>
          <div className="grid grid-cols-2 h-5/6">
            <div className="flex flex-col justify-center items-center gap-3 text-lg">
              <div onClick={aboutClick} className="cursor-pointer">
                About
              </div>
              <div onClick={articlesClick} className="cursor-pointer">
                Articles
              </div>
              <div
                onClick={() => {
                  navigate("/message");
                }}
                className="cursor-pointer"
              >
                Chat
              </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-3 text-lg">
              <a
                href="https://github.com/subharthihazra/MindMate"
                className=" text-white"
              >
                <div>Github</div>
              </a>
              <a
                href="https://www.youtube.com/watch?v=fUD5HcZhtQI"
                className=" text-white"
              >
                <div>Youtube</div>
              </a>
            </div>
          </div>
          <div className="text-center">© 2024 by Algovengers</div>
        </div>
      </footer>
      <button className={styles.scrollButton} onClick={scrollToTop}>
        &#9650;
      </button>
    </div>
  );
}

export default Homepage;
