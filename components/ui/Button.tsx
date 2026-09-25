"use client";

import { type AnchorHTMLAttributes, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "whatsapp" | "ghost";

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
    "bg-amber-500 text-slate-950 border border-amber-500 hover:bg-amber-400",
  secondary:
    "bg-transparent text-white border border-white/30 hover:bg-white/10",
  whatsapp:
    "bg-[#25D366] text-white border border-[#25D366] hover:bg-[#1fb855]",
  ghost:
    "bg-white text-slate-900 border border-slate-200 hover:border-slate-300",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.98]";

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
