import type { ButtonHTMLAttributes, ReactNode } from "react";

import { cn } from "~/lib/cn";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: "primary" | "outline";
	size?: "md" | "lg";
	rightIcon?: ReactNode;
	fullWidth?: boolean;
	children: ReactNode;
	className?: string;
}

export function Button({
	children,
	className,
	fullWidth,
	rightIcon,
	size = "md",
	variant = "primary",
	...props
}: ButtonProps) {
	return (
		<button
			className={cn(
				"inline-flex items-center justify-center rounded-button text-style-body-bold",
				"spring-bounce-20 spring-duration-200 transition",
				"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/50 focus-visible:ring-offset-2",
				"active:scale-97",
				"disabled:pointer-events-none disabled:opacity-50",
				variant === "primary" &&
					"border border-base-900 bg-primary-brown text-white hover:bg-primary-brown/90",
				variant === "outline" &&
					"border border-base-400 bg-transparent text-base-900 hover:border-base-700 hover:bg-base-900/5",
				size === "md" && "px-6 py-3",
				size === "lg" && "px-8 py-4",
				fullWidth && "w-full",
				rightIcon && "gap-2",
				className,
			)}
			{...props}
		>
			{children}
			{rightIcon}
		</button>
	);
}
