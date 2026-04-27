// import { useRef,useEffect } from "react";
// import { Button } from "../Components/Button";
// import { Input } from "../Components/Input";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// const backendUrl = import.meta.env.VITE_BACKEND_URL;

// export function SignUp() {
//   const navigate = useNavigate();
//   const userNameRef = useRef<HTMLInputElement>(null);
//   const passwordRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     if (localStorage.getItem("token")) {
//       navigate("/DashBoard");
//     }
//   }, []);

//   async function singupfun() {
//     const userName = userNameRef.current?.value;
//     const password = passwordRef.current?.value;

//     if (!userName || !password) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await axios.post(`${backendUrl}/api/v1/auth/signup`, {
//         userName,
//         password,
//       });

//       alert(res.data.message||"SignUp successfully.");
//       navigate("/SignIn");
//     } catch (err: any) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   }

//   const handleKeyDown = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter") {
//       singupfun();
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
//             onClick={singupfun}
//             varient="primary"
//             text="SignUp"
//             fullWidth={true}
//             loading={false}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }



import { useRef, useEffect, useState } from "react";
import { Button } from "../Components/Button";
import { Input } from "../Components/Input";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function SignUp() {
  const navigate = useNavigate();
  const userNameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/DashBoard");
    }
  }, []);

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
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      singupfun();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#1a1a1a] to-[#2d2d2d] font-['Quantico'] quantico-font">
      <div className="animate-fadeInCard bg-[#2a2a2a] p-[50px_40px] rounded-lg shadow-2xl w-full max-w-[400px] mx-4">
        <h1 className="animate-fadeInText text-white text-center text-3xl font-bold mb-10">
          Sign Up
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            singupfun();
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
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Sign In Link */}
        <p className="text-center text-[#b0b0b0] mt-6 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/SignIn")}
            className="text-[#6a9fb5] hover:text-[#7aafc5] transition-colors duration-300 font-bold"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}




{
  /* <style>{`
        
        
        @keyframes fadeInCard {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInText {
          from {
            opacity: 0; */
}
{
  /* }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInInput {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInButton {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeInCard {
          animation: fadeInCard 0.8s ease-in-out;
        }

        .animate-fadeInText {
          animation: fadeInText 1s ease-in-out;
        }

        .animate-fadeInInput {
          animation: fadeInInput 1.2s ease-in-out;
        }

        .animate-fadeInButton {
          animation: fadeInButton 1.4s ease-in-out;
        }

        .input-hover:hover {
          border-color: #5a5a5a;
          background-color: #414141;
        }

        .input-focus:focus {
          outline: none;
          background-color: #454545;
          border-color: #6a9fb5;
          box-shadow: 0 0 10px rgba(106, 159, 181, 0.3);
          transform: scale(1.02);
        }

        .button-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(106, 159, 181, 0.4);
        }

        .button-active:active { */
}
{
  /* transform: translateY(0);
          box-shadow: 0 4px 12px rgba(106, 159, 181, 0.3);
        }

        .button-disabled {
          background: linear-gradient(135deg, #505050 0%, #404040 100%);
          cursor: not-allowed;
          box-shadow: none;
        }
      `}</style> */
}