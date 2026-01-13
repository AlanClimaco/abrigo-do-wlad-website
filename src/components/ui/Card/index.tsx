/**
 * CARD ui components
 * based on shadcn-ui
 */

import type { HTMLAttributes } from "react";
import styles from "./Card.module.css";
import { cn } from "../../../lib/utils";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "quote";
  color?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
};

export function Card({
  className,
  variant = "default",
  color = "primary",
  size = "md",
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        variant === "quote" && styles.quote,
        color === "secondary" && styles.colorSecondary,
        size === "sm" && styles.sm,
        size === "lg" && styles.lg,
        className
      )}
      {...props}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardHeader, className)} {...props} />;
}

export function CardIcon({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardIcon, className)} {...props} />;
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <h3 className={cn(styles.cardTitle, className)} {...props} />;
}

export function CardContent({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardContent, className)} {...props} />;
}

export function CardFooter({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.cardFooter, className)} {...props} />;
}
