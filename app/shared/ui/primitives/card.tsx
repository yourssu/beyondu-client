import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

interface CardProps {
	variant?: "default" | "bordered";
	children: ReactNode;
	className?: string;
}

export function Card({ children, className, variant = "default" }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-card bg-white",
				"spring-bounce-10 spring-duration-300 transition",
				variant === "default" && "border border-base-400 hover:shadow-sm",
				variant === "bordered" && "border-2 border-primary-green hover:shadow-sm",
				className,
			)}
		>
			{children}
		</div>
	);
}
