"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  innerText: string;
}

export default function Button({ innerText, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        w-[55%] my-2 self-center bg-(--main-orange) text-black font-semibold py-2 px-6 rounded-[16px]  transition-all duration-200 ease-out cursor-pointer focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed 
        ${props.className || ""}
      `}>
      {innerText}
    </button>
  );
}
