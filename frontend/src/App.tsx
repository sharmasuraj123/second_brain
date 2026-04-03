import { DashBoard } from "./pages/DashBoard";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/DashBoard" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
