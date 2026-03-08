import React from "react";
import { cn } from "../../utils/cn";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonSize =
  | "sm"   // h-9  (36px)
  | "md"   // h-10 (40px)
  | "lg"   // h-11 (44px)
  | "xl"   // h-12 (48px)
  | "2xl"; // h-[60px]

export type ButtonHierarchy =
  | "primary"
  | "secondary-color"
  | "secondary-gray"
  | "tertiary-color"
  | "tertiary-gray"
  | "link-color"
  | "link-gray";

export type ButtonIconMode = "default" | "dot-leading" | "icon-only";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  hierarchy?: ButtonHierarchy;
  icon?: ButtonIconMode;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  /** Required for icon-only buttons for accessibility */
  ariaLabel?: string;
}

// ─── Style maps (exact Figma values) ─────────────────────────────────────────

const hierarchyClasses: Record<ButtonHierarchy, string> = {
  "primary": [
    "bg-brand-600 text-white border border-brand-600",
    "shadow-xs-skeuomorphic",
    "hover:bg-brand-700 hover:border-brand-700",
    "focus-visible:shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),inset_0px_-2px_0px_0px_rgba(10,13,18,0.05),inset_0px_0px_0px_1px_rgba(10,13,18,0.18),0px_0px_0px_4px_rgba(127,86,217,0.24)]",
    "disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:shadow-none",
  ].join(" "),

  "secondary-color": [
    "bg-white text-brand-700 border border-brand-300",
    "shadow-xs",
    "hover:bg-brand-50 hover:border-brand-300",
    "focus-visible:shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),0px_0px_0px_4px_rgba(127,86,217,0.24)]",
    "disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:shadow-none",
  ].join(" "),

  "secondary-gray": [
    "bg-white text-gray-700 border border-gray-300",
    "shadow-xs",
    "hover:bg-gray-50 hover:border-gray-300",
    "focus-visible:shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05),0px_0px_0px_4px_rgba(152,162,179,0.20)]",
    "disabled:bg-gray-50 disabled:text-gray-400 disabled:border-gray-200 disabled:shadow-none",
  ].join(" "),

  "tertiary-color": [
    "bg-transparent text-brand-700 border border-transparent",
    "hover:bg-brand-50",
    "focus-visible:shadow-focus-brand",
    "disabled:text-gray-400",
  ].join(" "),

  "tertiary-gray": [
    "bg-transparent text-gray-600 border border-transparent",
    "hover:bg-gray-50",
    "focus-visible:shadow-focus-gray",
    "disabled:text-gray-400",
  ].join(" "),

  "link-color": [
    "bg-transparent text-brand-700 border border-transparent p-0",
    "hover:underline underline-offset-4",
    "focus-visible:underline",
    "disabled:text-gray-400",
  ].join(" "),

  "link-gray": [
    "bg-transparent text-gray-600 border border-transparent p-0",
    "hover:underline underline-offset-4",
    "focus-visible:underline",
    "disabled:text-gray-400",
  ].join(" "),
};

const sizeClasses: Record<ButtonSize, string> = {
  sm:   "h-9 px-[14px] text-sm leading-5 rounded-md gap-1",
  md:   "h-10 px-[14px] text-sm leading-5 rounded-md gap-1",
  lg:   "h-11 px-[18px] text-base leading-6 rounded-lg gap-1.5",
  xl:   "h-12 px-5 text-base leading-6 rounded-lg gap-1.5",
  "2xl":"h-[60px] px-7 text-lg leading-7 rounded-xl gap-2.5",
};

const iconOnlySizeClasses: Record<ButtonSize, string> = {
  sm:   "h-9 w-9 rounded-md",
  md:   "h-10 w-10 rounded-md",
  lg:   "h-11 w-11 rounded-lg",
  xl:   "h-12 w-12 rounded-lg",
  "2xl":"h-[60px] w-[60px] rounded-xl",
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm:   "size-4",
  md:   "size-5",
  lg:   "size-5",
  xl:   "size-5",
  "2xl":"size-6",
};

const dotSizeClasses: Record<ButtonSize, string> = {
  sm:   "size-1.5",
  md:   "size-2",
  lg:   "size-2",
  xl:   "size-2.5",
  "2xl":"size-3",
};

// ─── Component ───────────────────────────────────────────────────────────────

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      size = "md",
      hierarchy = "primary",
      icon = "default",
      leadingIcon,
      trailingIcon,
      ariaLabel,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const isLink = hierarchy === "link-color" || hierarchy === "link-gray";

    return (
      <button
        ref={ref}
        disabled={disabled}
        aria-label={icon === "icon-only" ? ariaLabel : undefined}
        className={cn(
          // Base
          "inline-flex items-center justify-center font-semibold font-body",
          "transition-all duration-150 ease-in-out",
          "focus-visible:outline-none",
          "disabled:pointer-events-none",
          "cursor-pointer",
          // Hierarchy
          hierarchyClasses[hierarchy],
          // Size — skip padding for link and icon-only
          icon === "icon-only"
            ? iconOnlySizeClasses[size]
            : isLink
            ? cn("text-sm", { "text-sm": size === "sm" || size === "md", "text-base": size === "lg" || size === "xl", "text-lg": size === "2xl" })
            : sizeClasses[size],
          className
        )}
        {...props}
      >
        {/* Dot indicator */}
        {icon === "dot-leading" && (
          <span
            className={cn(dotSizeClasses[size], "rounded-full bg-current opacity-75 shrink-0")}
            aria-hidden="true"
          />
        )}

        {/* Leading icon */}
        {icon === "default" && leadingIcon && (
          <span className={cn(iconSizeClasses[size], "shrink-0 flex items-center justify-center")} aria-hidden="true">
            {leadingIcon}
          </span>
        )}

        {/* Label */}
        {icon !== "icon-only" && (
          <span className="px-0.5 whitespace-nowrap">{children}</span>
        )}

        {/* Icon-only content */}
        {icon === "icon-only" && (
          <span className={cn(iconSizeClasses[size], "flex items-center justify-center")} aria-hidden="true">
            {children}
          </span>
        )}

        {/* Trailing icon */}
        {icon === "default" && trailingIcon && (
          <span className={cn(iconSizeClasses[size], "shrink-0 flex items-center justify-center")} aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
