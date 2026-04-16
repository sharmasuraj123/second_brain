import { useRef, } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function SignIn() {
  const navigate = useNavigate();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  async function singinfun() {
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!userName || !password) {
      alert("Please fill all fields");
      return;
    }

    try {

      const res = await axios.post(`${backendUrl}/api/v1/auth/signin`, {
        userName,
        password,
      });
  
      const jwt = res.data.token;
      localStorage.setItem("token", jwt);
       

      alert(res.data.message || "Login successful");
      navigate("/DashBoard");

    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  }
  return (
    <div className="bg-gray-200 h-screen w-screen flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input reference={userNameRef} placeholder="UserName" type="text"/>
        <Input reference={passwordRef} placeholder="Password" type="password"/>
        <div className="pt-4 flex justify-center">
          <Button
            onClick={singinfun}
            varient="primary"
            text="SignIn"
            fullWidth={true}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}
