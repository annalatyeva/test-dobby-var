"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  const hasError = Boolean(error);

  return (
    <>
      <label htmlFor={props.id} className={`block text-base font-bold mb-2 transition-colors`}>
        {label}
      </label>

      <input
        {...props}
        className={`w-full py-2 px-4 border-2 border-solid rounded-[16px] text-base transition-all duration-200 focus:outline-none focus:ring-2 ${
          hasError ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-red-100" : "border-gray-300 bg-white focus:border-(--main-orange) focus:ring-orange-100"
        } ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      />

      <div className={`h-4 mb-2 mt-0.5 transition-all duration-200 ${hasError ? "opacity-100" : "opacity-0"}`}>
        <span className="text-red-600 text-sm font-medium block">{error}</span>
      </div>
    </>
  );
}
