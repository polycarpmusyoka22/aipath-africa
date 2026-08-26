import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({
  children,
  className = "",
}: Props) {
  return (
    <div
      className={`rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 transition duration-300 hover:border-green-500 ${className}`}
    >
      {children}
    </div>
  );
}