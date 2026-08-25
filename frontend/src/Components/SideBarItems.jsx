export function SideBarItem({ text, icon }) {
  return (
    <div className="flex py-2 cursor-pointer hover:bg-dark-surfaceAlt rounded max-w-48 pl-4 transition-all duration-300 text-gray-300 hover:text-white">
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}
