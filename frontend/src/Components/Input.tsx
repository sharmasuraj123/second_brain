interface InputProps {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
  type?:string
}

export function Input({ placeholder, reference,type }: InputProps) {
  return (
    <div>
      <input
        ref={reference}
        className="px-4 py-2 m-2 rounded border"
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
