"use client";

import React, { useState, useLayoutEffect } from "react";
import Link from "next/link";

interface RippleProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

interface RippleEffect {
  x: number;
  y: number;
  size: number;
  key: number;
}

const RippleButton = ({
  children,
  className = "",
  onClick,
  href,
  variant = "primary",
  ...props
}: RippleProps) => {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  useLayoutEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];
    if (ripples.length > 0) {
      const lastRipple = ripples[ripples.length - 1];
      const id = setTimeout(() => {
        setRipples((prevState) =>
          prevState.filter((ripple) => ripple.key !== lastRipple.key),
        );
      }, 800);
      timeoutIds.push(id);
    }
    return () => timeoutIds.forEach(clearTimeout);
  }, [ripples]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(btn.clientWidth, btn.clientHeight);

    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    const newRipple: RippleEffect = {
      x,
      y,
      size,
      key: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    if (onClick) onClick(e);
  };

  const styles: Record<string, string> = {
    primary:
      "shadow-lg active:scale-95 transition-all text-lg font-bold px-8 py-3 rounded-xl",
    secondary:
      "active:scale-95 transition-all text-lg font-bold px-8 py-3 rounded-xl",
    ghost: "bg-transparent active:scale-95 transition-all rounded-lg p-2",
  };

  const variantInlineStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: "var(--foreground)",
      color: "var(--background)",
    },
    secondary: {
      backgroundColor: "var(--surface)",
      color: "var(--text-primary)",
      border: "1px solid var(--surface-border)",
    },
    ghost: {},
  };

  const combinedClassName = `relative overflow-hidden inline-flex items-center justify-center gap-2 cursor-pointer isolate ${styles[variant]} ${className}`;

  const RippleEffects = (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.key}
          className="absolute bg-white/40 rounded-full animate-ripple pointer-events-none z-0"
          style={{
            top: ripple.y,
            left: ripple.x,
            width: ripple.size,
            height: ripple.size,
            transform: "scale(0)",
            animation: "ripple 600ms linear forwards",
          }}
        />
      ))}
      <style jsx>{`
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );

  const Content = (
    <span className="relative z-10 flex items-center gap-2 pointer-events-none w-full h-full justify-center">
      {children}
    </span>
  );

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal) {
      return (
        <Link
          href={href}
          className={combinedClassName}
          onClick={handleClick}
          style={{ ...variantInlineStyles[variant], ...(props.style || {}) }}
          {...(props as any)}
        >
          {Content}
          {RippleEffects}
        </Link>
      );
    }
    return (
      <a
        href={href}
        className={combinedClassName}
        onClick={handleClick}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...variantInlineStyles[variant], ...(props.style || {}) }}
        {...props}
      >
        {Content}
        {RippleEffects}
      </a>
    );
  }

  return (
    <button
      className={combinedClassName}
      onClick={handleClick}
      style={{ ...variantInlineStyles[variant], ...(props.style || {}) }}
      {...(props as any)}
    >
      {Content}
      {RippleEffects}
    </button>
  );
};

export default RippleButton;
