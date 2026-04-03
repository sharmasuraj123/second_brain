import type { ReactElement } from "react";

interface ButtonProps {
  varient: "primary" | "secondary";
  text: string;
  startIcon: ReactElement;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const varientClasses = {
  primary:
    "bg-purple-600 hover:bg-purple-800 text-white cursor-pointer transition-all duration-300",
  secondary:
    "bg-purple-200 hover:bg-purple-500 text-purple-600 cursor-pointer transition-all duration-300",
};

const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center";

export function Button({
  varient,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={
        varientClasses[varient] +
        " " +
        defaultStyle +
        `${fullWidth ? " w-full flex justify-center items-center" : ""} ${loading ? "opacity-45" : ""}`
      }
      disabled={loading}
    >
      <div className="pr-2"> {startIcon}</div>
      {text}
    </button>
  );
}
