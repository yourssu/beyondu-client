import type { CSSProperties, ReactNode, Ref } from "react";

import { cn } from "~/lib/cn";

interface CardProps {
	variant?: "default" | "bordered";
	children: ReactNode;
	className?: string;
	style?: CSSProperties;
	ref?: Ref<HTMLDivElement>;
}

export function Card({ children, className, variant = "default", style, ref }: CardProps) {
	return (
		<div
			className={cn(
				"rounded-card bg-white",
				"spring-bounce-10 spring-duration-300 transition",
				variant === "default" && "border border-base-400 hover:shadow-sm",
				variant === "bordered" && "border-2 border-primary-green hover:shadow-sm",
				className,
			)}
			ref={ref}
			style={style}
		>
			{children}
		</div>
	);
}
