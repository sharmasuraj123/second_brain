  export function Input({ placeholder, reference, type, onKeyDown }) {
    return (
      <div>
        <input
          ref={reference}
          className="px-4 py-2 m-2 rounded border"
          type={type}
          placeholder={placeholder}
          onKeyDown={onKeyDown}
        />
      </div>
    );
  }
