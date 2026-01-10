import type { ComponentProps, ReactNode } from "react";
import { clsx } from "clsx";
import style from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "text";
  size?: "sm" | "md" | "lg";
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
} & ComponentProps<"button">;

export function Button({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        style.btn,
        style[variant],
        style[size],
        className,
      )}
      {...props}
    >
      {leftIcon && <span className={style.icon}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={style.icon}>{rightIcon}</span>}
    </button>
  );
}
