import React, { useId, useState } from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToggleSize = "sm" | "md";
export type ToggleType = "default" | "slim";

export interface ToggleProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  size?: ToggleSize;
  type?: ToggleType;
  label?: string;
  supportingText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

// ─── Figma dimension tokens ───────────────────────────────────────────────────
// Exact values from Figma: w=44, h=24, thumb=20 for md/default etc.

const DIMS = {
  sm: {
    default: { track: "w-9 h-5",   thumb: "size-4",   translate: "translate-x-4" },
    slim:    { track: "w-8 h-4",   thumb: "size-3",   translate: "translate-x-4" },
  },
  md: {
    default: { track: "w-11 h-6",  thumb: "size-5",   translate: "translate-x-5" },
    slim:    { track: "w-10 h-5",  thumb: "size-4",   translate: "translate-x-5" },
  },
};

// ─── Component ───────────────────────────────────────────────────────────────

export const Toggle = React.forwardRef<HTMLInputElement, ToggleProps>(
  (
    {
      size = "md",
      type = "default",
      label,
      supportingText,
      checked,
      defaultChecked = false,
      onCheckedChange,
      disabled,
      className,
      id: externalId,
      ...props
    },
    ref
  ) => {
    const generatedId           = useId();
    const id                    = externalId ?? generatedId;
    const isControlled          = checked !== undefined;
    const [internal, setInternal] = useState(defaultChecked);
    const isOn                  = isControlled ? !!checked : internal;

    const { track, thumb, translate } = DIMS[size][type];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternal(e.target.checked);
      onCheckedChange?.(e.target.checked);
    };

    return (
      <label
        htmlFor={id}
        className={cn(
          "inline-flex items-start gap-3 cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        {/* Hidden native checkbox for a11y */}
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          aria-checked={isOn}
          checked={isControlled ? isOn : undefined}
          defaultChecked={!isControlled ? defaultChecked : undefined}
          disabled={disabled}
          onChange={handleChange}
          className="sr-only"
          {...props}
        />

        {/* Track */}
        <span
          aria-hidden="true"
          className={cn(
            track,
            "relative inline-flex shrink-0 rounded-full p-0.5",
            "transition-colors duration-200 ease-in-out",
            "focus-within:ring-4",
            isOn
              ? "bg-brand-600 focus-within:ring-brand-200"
              : "bg-gray-200 focus-within:ring-gray-100"
          )}
        >
          {/* Thumb */}
          <span
            className={cn(
              thumb,
              "rounded-full bg-white shadow-sm",
              "transition-transform duration-200 ease-in-out",
              isOn ? translate : "translate-x-0"
            )}
          />
        </span>

        {/* Text */}
        {(label || supportingText) && (
          <span className="flex flex-col gap-0.5 pt-0.5">
            {label && (
              <span className="text-sm font-medium leading-5 text-gray-700">
                {label}
              </span>
            )}
            {supportingText && (
              <span className="text-sm font-normal leading-5 text-gray-500">
                {supportingText}
              </span>
            )}
          </span>
        )}
      </label>
    );
  }
);

Toggle.displayName = "Toggle";
