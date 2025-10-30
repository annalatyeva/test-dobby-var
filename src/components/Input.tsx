"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={props.id}>{label}</label>
      <input {...props} className="w-full py-2 px-3 border-3 border-solid border-(--main-orange) rounded-[22px]" />
      <div className="text-red-600">{error}</div>
    </>
  );
}
