
export function Input({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <input
        className="px-4 py-2 m-2 rounded border"
        type={"text"}
        placeholder={placeholder}
        onChange={onChange}
      ></input>
    </div>
  );
}
