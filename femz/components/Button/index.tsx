import classNames from "../../utils/classNames";

interface ButtonProps {
  type: "primary" | "secondary" | "tertiary";
  text: string;
  onClick?: () => void;
}

export default function Button({
  text,
  onClick,
  type = "primary",
}: ButtonProps) {
  const buttonClasses = classNames({
    "p-2 drop-shadow-md bg-sky-600 rounded text-white border-sky-600":
      type === "primary",
    "p-2 drop-shadow-md bg-slate-300 rounded border-black":
      type === "secondary",
  });
  return (
    <button className={buttonClasses} onClick={onClick}>
      {text}
    </button>
  );
}
