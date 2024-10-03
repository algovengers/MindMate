import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import LoginPage from "./pages/login/login";
import Message from "./pages/message/message";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import LoginContext from "./context/context";
import { PrivateRoute } from "./components/router/PrivateRouter";
import { PrivateRouteAnalysis } from "./components/router/PrivateRouterAnalysis";
import Analysis from "./pages/analysis/analysis";
import Error from "./pages/error/error";
import AboutPage from "./pages/AboutUs/AboutPage";
import Preloader from "./pages/Preloader/Preloader";

function App() {
  const { login } = useContext(LoginContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function isUser() {
      try {
        const user = await axios.get(
          process.env.REACT_APP_API_LINK + "/isUser",
          {
            withCredentials: true,
          }
        );
        if (user) {
          console.log("Yes");
          login();
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        // Keep preloader visible for at least 1 second
        setTimeout(() => {
          setLoading(false); // Set loading to false after the timeout
        }, 1000);
      }
    }

    isUser();
  }, [login]);

  return (
    <BrowserRouter>
      {loading ? (
        <Preloader /> // Show Preloader while loading
      ) : (
        <Routes>
          <Route
            path="/login"
            element={
              <PrivateRoute>
                <LoginPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Homepage />} />
          <Route path="/message" element={<Message />} />
          <Route
            path="/analysis"
            element={
              <PrivateRouteAnalysis>
                <Analysis />
              </PrivateRouteAnalysis>
            }
          />
          <Route path="/aboutus" element={<AboutPage />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
