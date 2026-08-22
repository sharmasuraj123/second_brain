export function SideBarItem({ text, icon }) {
  return (
    <div className="flex py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-300">
      <div className="pr-2">{icon}</div>
      <div>{text}</div>
    </div>
  );
}
