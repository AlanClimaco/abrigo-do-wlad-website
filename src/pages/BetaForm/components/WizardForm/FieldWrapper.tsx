import * as React from "react";
import type { FieldError } from "./useWizardForm";
import styles from "./WizardForm.module.css";

interface FieldWrapperProps {
  name: string;
  label: string;
  required?: boolean;
  errors: FieldError;
  children: React.ReactNode;
}

export function FieldWrapper({
  name,
  label,
  required = false,
  errors,
  children,
}: FieldWrapperProps) {
  const error = errors[name];

  return (
    <div className={`${styles.field} ${error ? styles.fieldError : ""}`}>
      <label htmlFor={name}>
        {label} {required && <span className={styles.required}>*</span>}
      </label>
      {children}
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
}
