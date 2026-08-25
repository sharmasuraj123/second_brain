import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { LogOutIcon } from "../icons/LogOutIcon";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function UserProfile() {
  const [userName, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/v1/user/me`, {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUsername(res.data.userName);
      } catch (e) {
        setUsername("Guest User");
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/SignIn");
  };

  return (
    <div className="relative px-4 pb-4 mt-auto group">
      <div
        className="absolute bottom-full left-4 mb-2 w-48 bg-dark-surfaceAlt border border-dark-border rounded-xl shadow-xl overflow-hidden z-50
                      invisible opacity-0 translate-y-2 transition-all duration-200
                      group-hover:visible group-hover:opacity-100 group-hover:translate-y-0"
      >
        <div className="p-4 border-b border-dark-border bg-dark-surface">
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
            Current User
          </p>
          <p className="text-sm font-semibold text-white truncate mt-1">
            {userName}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors font-medium"
        >
          <LogOutIcon />
          Logout
        </button>
      </div>

      <div className="w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 border border-dark-border bg-dark-surfaceAlt group-hover:bg-dark-border group-hover:border-dark-borderHover cursor-default">
        <div className="h-9 w-9 min-w-9 rounded-full bg-accent flex items-center justify-center text-white font-bold shadow-inner">
          {userName ? userName.charAt(0).toUpperCase() : "?"}
        </div>
        <div className="flex flex-col text-left overflow-hidden">
          <span className="text-sm font-bold text-gray-200 truncate">
            {userName || "User"}
          </span>
        </div>
      </div>
    </div>
  );
}
