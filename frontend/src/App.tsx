import { DashBoard } from "./pages/DashBoard";
import { SharedBrain } from "./pages/SharedBrain";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/SignUp" />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/share/:hash" element={<SharedBrain />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
