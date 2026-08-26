import Link from "next/link";
import { ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function Button({
  children,
  href,
  variant = "primary",
  className,
}: ButtonProps) {
  const styles = clsx(
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold transition-all duration-300",
    variant === "primary" &&
      "bg-green-500 text-black hover:bg-green-400",
    variant === "secondary" &&
      "border border-zinc-700 text-white hover:border-green-500 hover:bg-zinc-900",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return <button className={styles}>{children}</button>;
}