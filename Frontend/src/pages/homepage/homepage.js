import styles from "./homepage.module.css";
import { Logo } from "../../svgs/logoSVG";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  return (
    <div className={styles.homepageContainer}>
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
      <main>
        <section className={styles.leftSection}>
          <h1>
            You are a <br /> Precious Being
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
        <section className={styles.rightSection}>Image</section>
      </main>
    </div>
  );
}

export default Homepage;
