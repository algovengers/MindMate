import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import LoginPage from "./pages/login/login";
import Message from "./pages/message/message";
import { useContext, useEffect } from "react";
import axios from "axios";
import LoginContext from "./context/context";
import { PrivateRoute } from "./components/router/PrivateRouter";

// import Analysis from "./pages/analysis/analysis";



function App() {
  const {login} = useContext(LoginContext)
  useEffect(()=>{
    async function isUser(){
    try {
      const user = await axios.get('http://localhost:8800/isUser', {
        withCredentials: true,
      })
      if(user){
        console.log('Yes');
        login()
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  isUser()
    },[])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element = {
          <PrivateRoute>
            <LoginPage />
          </PrivateRoute>
        } />
        <Route path="/" element={<Homepage />} />
        <Route path="/message" element={<Message />} />
        {/* <Route path="/analysis" element={<Analysis />} /> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
