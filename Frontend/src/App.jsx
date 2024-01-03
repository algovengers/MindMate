import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" element=<Homepage /> /> */}
        {/* <Route path="/message" element=<Message /> /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
