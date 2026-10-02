"use client";

import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "ghost" | "outline";

type SharedProps = {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type ButtonOnlyProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

export type ButtonProps = ButtonOnlyProps | LinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white shadow-md hover:bg-primary-dark hover:shadow-lg",
  secondary:
    "bg-slate-900 text-white shadow-md hover:bg-slate-800 hover:shadow-lg",
  outline:
    "border border-slate-300 bg-white text-slate-700 shadow-sm hover:bg-slate-50",
  whatsapp:
    "bg-[#25D366] text-white shadow-md hover:bg-[#1fb855] hover:shadow-lg",
  ghost:
    "border border-slate-200 bg-white text-slate-800 shadow-sm hover:border-primary/30 hover:bg-primary-soft/60",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variantStyles[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
