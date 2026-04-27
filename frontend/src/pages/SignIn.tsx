// import { useRef, } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "../Components/Button";
// import { Input } from "../Components/Input";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// export function SignIn() {
//   const navigate = useNavigate();
//   const userNameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   async function singinfun() {
//     const userName = userNameRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (!userName || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {

//       const res = await axios.post(`${backendUrl}/api/v1/auth/signin`, {
//         userName,
//         password,
//       });
  
//       const jwt = res.data.token;
//       localStorage.setItem("token", jwt);
       

//       alert(res.data.message || "Login successful");
//       navigate("/DashBoard");

//     } catch (err: any) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   }

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       singinfun();
//     }
//   };
//   return (
//     <div className="bg-gray-200 h-screen w-screen flex justify-center items-center">
//       <div className="bg-white rounded-xl border min-w-48 p-8">
//         <Input
//           reference={userNameRef}
//           placeholder="UserName"
//           type="text"
//           onKeyDown={handleKeyDown}
//         />
//         <Input
//           reference={passwordRef}
//           placeholder="Password"
//           type="password"
//           onKeyDown={handleKeyDown}
//         />
//         <div className="pt-4 flex justify-center">
//           <Button
//             onClick={singinfun}
//             varient="primary"
//             text="SignIn"
//             fullWidth={true}
//             loading={false}
//           />
//         </div>
//         <div className="flex gap-1 text-sm text-gray-600">
//           <span>Don't have an account?</span>
//           <Link
//             to="/signup"
//             className="text-purple-600 font-semibold hover:underline cursor-pointer"
//           >
//             Create account
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }


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
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      signinfun();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] quantico-font">
      <div className="animate-fadeInCard bg-[#2a2a2a] p-[50px_40px] rounded-lg shadow-2xl w-full max-w-[400px] mx-4">
        <h1 className="animate-fadeInText text-white text-center text-3xl font-bold mb-10">
          Sign In
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            signinfun();
          }}
        >
          {/* Username Field */}
          <div className="animate-fadeInInput mb-6">
            <label className="block text-[#b0b0b0] mb-2 font-normal text-sm uppercase tracking-wider">
              Username
            </label>
            <input
              ref={userNameRef}
              type="text"
              placeholder="Enter your username"
              onKeyDown={handleKeyDown}
              className="input-focus input-hover w-full px-4 py-3 bg-[#3a3a3a] border-2 border-[#4a4a4a] rounded-lg text-white placeholder-[#7a7a7a] transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Password Field */}
          <div className="animate-fadeInInput mb-8">
            <label className="block text-[#b0b0b0] mb-2 font-normal text-sm uppercase tracking-wider">
              Password
            </label>
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter your password"
              onKeyDown={handleKeyDown}
              className="input-focus input-hover w-full px-4 py-3 bg-[#3a3a3a] border-2 border-[#4a4a4a] rounded-lg text-white placeholder-[#7a7a7a] transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`animate-fadeInButton button-hover button-active w-full py-3 bg-gradient-to-r from-[#6a9fb5] to-[#5a8fa5] text-white rounded-lg font-bold text-base uppercase tracking-wider transition-all duration-300 ease-in-out ${
              isLoading ? "button-disabled" : ""
            }`}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center text-[#b0b0b0] mt-6 text-sm">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/SignUp")}
            className="text-[#6a9fb5] hover:text-[#7aafc5] transition-colors duration-300 font-bold"
          >
            Create account
          </button>
        </p>
      </div>
    </div>
  );
}
