import { useEffect, useState } from "react";
import styles from "./login.module.css";
import InputBox from "../../components/inputBox/inputBox";
import Button from "../../components/button/button";

function Login() {
  const [isRegistered, setIsRegister] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: "",
    email: "",
    password: "",
  });

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
    const change = e.target.value;
    setLoginData((d) => {
      d[text] = change;
      return { ...d };
    });
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

    // calling the request
  };

  useEffect(() => {
    if (Object.keys(error).length === 0) {
      // if (!isRegistered && !isLoading) {
      //   handleSignup(
      //     loginData.name,
      //     loginData.email,
      //     loginData.password,
      //     handleSetUserToken,
      //     setIsLoading,
      //     setUserId
      //   );
      // }
      // if (isRegistered && !isLoading) {
      //   loginData.name.toLocaleLowerCase();
      //   handleSignin(
      //     loginData.email,
      //     loginData.password,
      //     setIsLoading,
      //     handleSetUserToken,
      //     setUserId
      //   );
      // }
    }
  }, [error]);
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageContent}>
        <div className={styles.leftContainer}>
          <form className={styles.loginContainer} onSubmit={handleSubmitButton}>
            <header>
              {isRegistered ? (
                <h2>
                  Welcome Back <span>👋</span>
                </h2>
              ) : (
                <h2>
                  Register a new account <span>👋</span>
                </h2>
              )}
            </header>
            <main>
              {!isRegistered && (
                <InputBox
                  label="Name"
                  name="name"
                  type="text"
                  value={loginData.name}
                  handleChange={handleLoginDataChange}
                  placeholder="Rohit Kumar"
                  error={error.name}
                  disabled={isLoading}
                />
              )}

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

              <p className={styles.forgotPasswordLink}>Forgot Password?</p>

              <Button
                text={isRegistered ? "Sign in" : "Sign up"}
                type="submit"
                handleClick={handleSubmitButton}
              />
            </main>
            <footer>
              {isRegistered
                ? `Don't have an account?`
                : `Already have an account`}{" "}
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
          </form>
        </div>
        <div className={styles.rightContainer}>{/* img */}</div>
      </div>
    </div>
  );
}

export default Login;
