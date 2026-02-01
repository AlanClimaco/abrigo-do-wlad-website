import type { CSSProperties, ReactNode } from "react";
import styles from "./Link.module.css";

interface IconLinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  style?: CSSProperties;
}

interface TextLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  style?: CSSProperties;
}

export const IconLink = ({
  href,
  icon,
  children,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
  style,
}: IconLinkProps) => {
  return (
    <div className={`${styles.link} ${styles.iconLink} ${className}`} style={style}>
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
  style,
}: TextLinkProps) => {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={style}
      className={`${styles.link} ${className}`}
    >
      {children}
    </a>
  );
};
