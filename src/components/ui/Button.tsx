"use client";

import * as React from "react";
import Link from "next/link";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg" | "icon";
  children?: React.ReactNode;
  as?: any;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, as: Component = "button", href, ...props }, ref) => {
    const variants = {
      primary: "bg-saffron text-white hover:bg-orange-600 shadow-md",
      secondary: "bg-deep-blue text-white hover:bg-slate-800 shadow-md",
      outline: "border-2 border-deep-blue text-deep-blue hover:bg-deep-blue hover:text-white",
      ghost: "hover:bg-slate-100 text-slate-600",
      link: "text-deep-blue underline-offset-4 hover:underline p-0 h-auto",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-base font-semibold",
      lg: "px-8 py-4 text-lg font-bold",
      icon: "p-2",
    };

    const MotionComponent = motion(Component);

    const content = (
      <MotionComponent
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </MotionComponent>
    );

    if (href) {
      return (
        <Link href={href} className="contents">
          {content}
        </Link>
      );
    }

    return content;
  }
);

Button.displayName = "Button";

export { Button };
