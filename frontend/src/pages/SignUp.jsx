import { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function SignUp() {
  const navigate = useNavigate();
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/DashBoard");
    }
  }, [navigate]);

  async function singupfun() {
    const userName = userNameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!userName || !password) {
      alert("Please fill all fields");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/v1/auth/signup`, {
        userName,
        password,
      });

      alert(res.data.message || "SignUp successfully.");
      navigate("/SignIn");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      singupfun();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-dark-bg to-dark-bgAlt">
      <div className="animate-fadeInCard bg-dark-surface p-[50px_40px] rounded-lg shadow-2xl w-full max-w-[400px] mx-4">
        <h1 className="animate-fadeInText text-white text-center text-3xl font-display font-semibold mb-10">
          Sign Up
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            singupfun();
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
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/SignIn")}
            className="text-accent hover:text-accent-hover transition-colors duration-300 font-bold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
