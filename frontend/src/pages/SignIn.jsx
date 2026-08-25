import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function SignIn() {
  const navigate = useNavigate();
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signinfun() {
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!userName || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/v1/auth/signin`, {
        userName,
        password,
      });

      const jwt = res.data.token;
      localStorage.setItem("token", jwt);

      alert(res.data.message || "Login successful");
      navigate("/DashBoard");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      signinfun();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-dark-bg to-dark-bgAlt">
      <div className="animate-fadeInCard bg-dark-surface p-[50px_40px] rounded-lg shadow-2xl w-full max-w-[400px] mx-4">
        <h1 className="animate-fadeInText text-white text-center text-3xl font-display font-semibold mb-10">
          Sign In
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signinfun();
          }}
        >
          <div className="animate-fadeInInput mb-6">
            <label className="block text-gray-400 mb-2 font-normal text-sm uppercase tracking-wider">
              Username
            </label>
            <input
              ref={userNameRef}
              type="text"
              placeholder="Enter your username"
              onKeyDown={handleKeyDown}
              className="input-focus input-hover w-full px-4 py-3 bg-dark-surfaceAlt border-2 border-dark-border rounded-lg text-white placeholder-gray-500 transition-all duration-300 ease-in-out"
            />
          </div>

          <div className="animate-fadeInInput mb-8">
            <label className="block text-gray-400 mb-2 font-normal text-sm uppercase tracking-wider">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              onKeyDown={handleKeyDown}
              className="input-focus input-hover w-full px-4 py-3 bg-dark-surfaceAlt border-2 border-dark-border rounded-lg text-white placeholder-gray-500 transition-all duration-300 ease-in-out"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`animate-fadeInButton button-hover button-active w-full py-3 bg-gradient-to-r from-accent to-accent-dark text-white rounded-lg font-display font-semibold text-base uppercase tracking-wider transition-all duration-300 ease-in-out ${
              isLoading ? "button-disabled" : ""
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/SignUp")}
            className="text-accent hover:text-accent-hover transition-colors duration-300 font-bold"
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}
