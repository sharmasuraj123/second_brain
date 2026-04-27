interface InputProps {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
  type?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export function Input({ placeholder, reference, type, onKeyDown }: InputProps) {
  return (
    <div>
      <input
        ref={reference}
        className="px-4 py-2 m-2 rounded border"
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      ></input>
    </div>
  );
}
