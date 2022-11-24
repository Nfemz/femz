import { useState } from "react";

interface TextProps {
  label?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  placeholder?: string;
}

function Text({ label, onChange, value, placeholder }: TextProps) {
  const [internalValue, setInternalValue] = useState<string>("");

  const componentValue = value || internalValue;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInternalValue(e.target.value);
    onChange && onChange(e);
  }

  return (
    <div id={`text-input-${label}`}>
      {label && (
        <label
          className="block text-sm text-gray-700 font-bold mb-2"
          htmlFor={label}
        >
          {label}
        </label>
      )}
      <input
        className=" appearance-none focus:outline-none focus:shadow-inner focus:border-slate-300 rounded border-2 border-slate-200 w-full h-9 caret-slate-300 p-2"
        type="text"
        id={label}
        value={componentValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
}

const Input = {
  Text,
};

export default Input;
