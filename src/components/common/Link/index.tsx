import type { ReactNode } from "react";
import styles from "./Link.module.css";

interface IconLinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
}

export const IconLink = ({
  href,
  icon,
  children,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
}: IconLinkProps) => {
  return (
    <div className={`${className}`}>
      {icon}
      <a href={href} target={target} rel={rel} className="ml-2">
        {children}
      </a>
    </div>
  );
};

export const TextLink = ({
  href,
  children,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
}: TextLinkProps) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`${styles.link} ${className}`}
    >
      {children}
    </a>
  );
};
