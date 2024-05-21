import React, { useEffect, useState } from "react";
import style from "./AboutPage.module.css";
import axios from "axios";
import ContributorCard from "./ContributorCard";

export default function AboutPage() {
  const [contributors, setContributors] = useState([]);

  useEffect(() => {
    async function fetchContributors() {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/algovengers/MindMate/contributors"
        );
        setContributors(response.data);
      } catch (error) {
        console.error("Error fetching contributors:", error);
      }
    }

    fetchContributors();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <div className={style.about}>
      <div
        className={`${style.responsivecontainerblock} ${style.bigContainer}`}
      >
        <div
          className={`${style.responsivecontainerblock} ${style.container} ${style.bottomContainer}`}
        >
          <div className={`${style.allText} ${style.bottomText}`}>
            <p className={style.headingText}>About Us</p>
            <p className={style.subHeadingText}>We Are build</p>
            <p className={style.description}>
              Welcome to our mental health chat assistant platform. We are here
              for you – a supportive community where our empathetic AI actively
              listens, offers encouragement, and provides valuable resources.
              Together, we prioritize your well-being, fostering open dialogue
              around mental health. You're not alone; we, as your dedicated
              companions, stand with you on your journey. Let's build a space
              where understanding and support thrive.
            </p>
            <a
              href="https://www.youtube.com/watch?v=fUD5HcZhtQI"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={style.explore}>View More</button>
            </a>
          </div>
          <div className={style.videoContainer}>
            <iframe
              allowFullScreen
              className={style.mainVideo}
              controls
              src="https://www.youtube.com/embed/fUD5HcZhtQI?si=GwQPNzqdOjFZ8kXG"
            ></iframe>
            <img
              className={`${style.dotsImg} image-block`}
              src="https://workik-widget-assets.s3.amazonaws.com/widget-assets/images/cw3.svg"
              alt="Decorative dots"
            />
          </div>
        </div>
      </div>

      <div className={style.contributors}>
        <h1>Meet Our Team</h1>
        <div className={style.contributorsGrid}>
          {contributors.map((contributorData) => (
            <ContributorCard
              key={contributorData.id}
              contributor={contributorData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
