const varientClasses = {
  primary:
    "bg-accent hover:bg-accent-hover text-white cursor-pointer transition-all duration-300",
  secondary:
    "bg-dark-surfaceAlt hover:bg-dark-borderHover text-gray-200 border border-dark-border cursor-pointer transition-all duration-300",
};

const defaultStyle = "px-4 py-2 rounded-md font-light flex items-center";

export function Button({
  varient,
  text,
  startIcon,
  onClick,
  fullWidth,
  loading,
}) {
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
