export function Input({ placeholder, reference, type, onKeyDown }) {
  return (
    <div>
      <input
        ref={reference}
        className="input-focus input-hover px-4 py-2 m-2 rounded border-2 border-dark-border bg-dark-surfaceAlt text-white placeholder-gray-500 transition-all duration-300"
        type={type}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
