"use client";

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  innerText: string;
}

export default function Title({ innerText, ...props }: TitleProps) {
  return (
    <h1 {...props} className="max-w-5xl mx-auto lg:mb-8 mb-6 text-center text-2xl md:text-3xl font-bold ">
      {innerText}
    </h1>
  );
}
