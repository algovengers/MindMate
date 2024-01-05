import { useContext, useEffect, useState } from "react";
import styles from "./login.module.css";
import InputBox from "../../components/inputBox/inputBox";
import Button from "../../components/button/button";
import GoogleIcon from "../../svgs/googleicon.png";
import {
  LoginWithEmail,
  LoginWithGoogle,
  SignupWithEmail,
} from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import LoginContext from "../../context/context";

function Login() {
  const [isRegistered, setIsRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(false);
  const [errorMessage,setErrorMessage] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [logging, setLogging] = useState(false);
  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {login} = useContext(LoginContext)
  useEffect(() => {
    if (isRegistered === true) {
      setError({
        email: "",
        password: "",
      });
    } else {
      setError({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [isRegistered]);

  // const {  } = useContext(userContext);

  const handleLoginDataChange = (e, text) => {
    setLoginError(false)
    const change = e.target.value;
    setLoginData((d) => {
      d[text] = change;
      return { ...d };
    });
  };
  const handleLoginWithGoogle =  () => {
    async function loginGoogle(){
      try {
        const res = await LoginWithGoogle();
        if(res){
          setLoggedIn(true);
        }
      } catch (error) {
        
      }
    }
    loginGoogle();
    
  }
  const LoginandSignup = async (e) => {
    try {
      if (isRegistered) {
        const login = await LoginWithEmail(loginData.email, loginData.password);
        setLogging(false);
        setLoggedIn(true);
      } else {
        const Signup = await SignupWithEmail(
          loginData.email,
          loginData.password
        );
        setLogging(false);
        setLoggedIn(true);
      }
    } catch (error) {
      setLoginError(true);
      setErrorMessage(error.message)
      setLogging(false);
    }
  };
  const handleSubmitButton = (e) => {
    e.preventDefault();
    //first check for errors and then only update the error and if the error is empty send a request

    if (!isRegistered) {
      if (loginData.name === "") {
        setError((prev) => {
          return { ...prev, name: "please Enter a name" };
        });
      } else {
        setError((prev) => {
          delete prev.name;
          return { ...prev };
        });
      }
    }

    if (loginData.email === "") {
      setError((prev) => {
        return { ...prev, email: "please enter an email" };
      });
    } else {
      const isCorrectMail = loginData.email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

      if (!isCorrectMail) {
        setError((prev) => {
          return { ...prev, email: "please enter a correct email" };
        });
      } else {
        setError((prev) => {
          delete prev.email;
          return { ...prev };
        });
      }
    }

    if (loginData.password === "") {
      setError((prev) => {
        return { ...prev, password: "please enter a password" };
      });
    } else if (loginData.password.length < 8) {
      setError((prev) => {
        return { ...prev, password: "please enter a longer password" };
      });
    } else {
      setError((prev) => {
        delete prev.password;
        return { ...prev };
      });
    }
    setLogging(true);
    // calling the request
    LoginandSignup();
  };
  useEffect(() => {
    
    if (loggedIn){ 
      login()
      navigate("/message")};
  }, [loggedIn]);
  useEffect(() => {
    if (Object.keys(error).length === 0) {
    }
  }, [error]);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <div className={styles.leftContainer}>
          <div className={styles.loginContainer} onSubmit={handleSubmitButton}>
            <header>
              {isRegistered ? (
                <h2>
                  Welcome Back <span>👋</span>
                </h2>
              ) : (
                <h2>
                  Register a New Account <span>👇</span>
                </h2>
              )}
            </header>
            <main>
              <InputBox
                label="Email"
                name="email"
                type="email"
                disabled={isLoading}
                value={loginData.email}
                handleChange={handleLoginDataChange}
                error={error.email}
                placeholder="example@email.com"
              />

              <InputBox
                label="Password"
                name="password"
                type="password"
                disabled={isLoading}
                value={loginData.password}
                handleChange={handleLoginDataChange}
                error={error.password}
                placeholder="At least 8 characters"
              />
              {isRegistered && loginError && <span className="text-center">Invalid credentials</span>}
              {!isRegistered && loginError && <span className="text-center">Error Creating Account</span>}
              <Button
                text={isRegistered ? "Sign in" : "Sign up"}
                type="submit"
                handleClick={handleSubmitButton}
                logging={logging}
                style={{
                  backgroundColor: isRegistered
                    ? "rgb(144, 0, 64)"
                    : "rgb(0, 144, 101)",
                }}
              />
              <div className="text-center mt-2 opacity-70">
                <span style={{ font: `'Inter', sans-serif` }}>OR</span>
              </div>
              <div
                className={styles.googleButton}
                onClick={() => {
                  handleLoginWithGoogle();
                }}
              >
                <img src={GoogleIcon} alt="" className={styles.googleImage} />
                <div>{isRegistered ? "Signin " : "Signup "}With Google</div>
              </div>
            </main>
            <footer>
              {isRegistered
                ? `Don't have an account?`
                : `Already have an account?`}{" "}
              {
                <span
                  onClick={() => {
                    setIsRegister((value) => !value);
                    setLoginData({
                      name: "",
                      email: "",
                      password: "",
                    });
                  }}
                >
                  {isRegistered ? "Sign up" : "Sign in"}
                </span>
              }
            </footer>
          </div>
        </div>
        <div className={styles.rightContainer}>{/* img */}</div>
      </div>
    </div>
  );
}

export default Login;
