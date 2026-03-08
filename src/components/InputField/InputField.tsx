import React, { useId } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputSize = "sm" | "md";
export type InputVariant =
  | "default"
  | "icon-leading"
  | "leading-text"
  | "leading-dropdown"
  | "trailing-dropdown"
  | "trailing-button";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  variant?: InputVariant;
  destructive?: boolean;
  label?: string;
  required?: boolean;
  hintText?: string;
  helpIcon?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  leadingText?: string;
  leadingDropdown?: React.ReactNode;
  trailingDropdown?: React.ReactNode;
  trailingButton?: React.ReactNode;
}

// ─── Help icon SVG ────────────────────────────────────────────────────────────

function HelpCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-gray-400 shrink-0">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M6.06 5.86a2 2 0 013.88.67c0 1.33-2 2-2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11.5" r=".75" fill="currentColor" />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="text-error-500 shrink-0">
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="11" r=".75" fill="currentColor" />
    </svg>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      size = "md",
      variant = "default",
      destructive = false,
      label,
      required,
      hintText,
      helpIcon,
      leadingIcon,
      trailingIcon,
      leadingText,
      leadingDropdown,
      trailingDropdown,
      trailingButton,
      className,
      disabled,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id          = externalId ?? generatedId;
    const hintId      = `${id}-hint`;

    const wrapperPadding = size === "sm" ? "py-2 px-[14px]" : "py-[10px] px-[14px]";
    const inputTextSize  = size === "sm" ? "text-sm leading-5" : "text-base leading-6";

    return (
      <div className={cn("flex flex-col gap-1.5 w-full font-body", className)}>

        {/* Label */}
        {label && (
          <div className="flex items-center gap-0.5">
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium leading-5 text-gray-700",
                disabled && "opacity-50"
              )}
            >
              {label}
            </label>
            {required && (
              <span className="text-sm leading-5 text-brand-600" aria-hidden="true">*</span>
            )}
          </div>
        )}

        {/* Input wrapper */}
        <div
          className={cn(
            "flex items-center gap-2 w-full",
            "bg-white border rounded-md",
            "shadow-xs",
            "transition-colors duration-150",
            // Border colours
            destructive
              ? "border-error-500 focus-within:border-error-500 focus-within:shadow-[0px_1px_2px_rgba(10,13,18,0.05),0px_0px_0px_4px_rgba(240,68,56,0.24)]"
              : "border-gray-300 focus-within:border-brand-600 focus-within:shadow-[0px_1px_2px_rgba(10,13,18,0.05),0px_0px_0px_4px_rgba(127,86,217,0.24)]",
            disabled && "bg-gray-50 border-gray-200 shadow-none",
            // Remove horizontal padding when addons present
            variant === "leading-dropdown" || variant === "leading-text" ? "pl-0" : "",
            variant === "trailing-dropdown" || variant === "trailing-button" ? "pr-0" : "",
            variant === "default" || variant === "icon-leading" ? wrapperPadding : `py-0 pr-0 pl-[14px]`,
            (variant === "leading-dropdown" || variant === "leading-text") && "pl-0"
          )}
        >
          {/* Leading icon */}
          {variant === "icon-leading" && leadingIcon && (
            <span className="text-gray-400 shrink-0 flex items-center">{leadingIcon}</span>
          )}

          {/* Leading text e.g. "https://" */}
          {variant === "leading-text" && leadingText && (
            <span className={cn("text-gray-500 shrink-0 border-r border-gray-300 pr-3 pl-[14px] self-stretch flex items-center", size === "sm" ? "text-sm" : "text-base")}>
              {leadingText}
            </span>
          )}

          {/* Leading dropdown */}
          {variant === "leading-dropdown" && leadingDropdown && (
            <div className="shrink-0 border-r border-gray-300 self-stretch flex items-center px-3">
              {leadingDropdown}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-describedby={hintText ? hintId : undefined}
            aria-invalid={destructive ? "true" : undefined}
            className={cn(
              "flex-1 min-w-0 bg-transparent outline-none",
              inputTextSize,
              "text-gray-900 placeholder:text-gray-400",
              "disabled:cursor-not-allowed disabled:text-gray-400",
              // Add padding back for addon variants
              (variant === "leading-text" || variant === "leading-dropdown") && "pl-3",
              (variant === "trailing-dropdown" || variant === "trailing-button") && "pr-3",
              variant === "default" || variant === "icon-leading" ? "" : `${size === "sm" ? "py-2" : "py-[10px]"}`,
            )}
            {...props}
          />

          {/* Help icon */}
          {helpIcon && !trailingIcon && variant !== "trailing-dropdown" && variant !== "trailing-button" && (
            <HelpCircle />
          )}

          {/* Error icon */}
          {destructive && !helpIcon && !trailingIcon && (
            <ErrorIcon />
          )}

          {/* Trailing icon */}
          {trailingIcon && (
            <span className="text-gray-400 shrink-0 flex items-center">{trailingIcon}</span>
          )}

          {/* Trailing dropdown */}
          {variant === "trailing-dropdown" && trailingDropdown && (
            <div className="shrink-0 border-l border-gray-300 self-stretch flex items-center px-3">
              {trailingDropdown}
            </div>
          )}

          {/* Trailing button */}
          {variant === "trailing-button" && trailingButton && (
            <div className="shrink-0 border-l border-gray-300 self-stretch flex items-center px-3">
              {trailingButton}
            </div>
          )}
        </div>

        {/* Hint / error text */}
        {hintText && (
          <p
            id={hintId}
            className={cn(
              "text-sm leading-5",
              destructive ? "text-error-600" : "text-gray-500"
            )}
          >
            {hintText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
