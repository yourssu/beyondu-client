import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

interface BadgeProps {
	variant?: "green" | "neutral";
	children: ReactNode;
	className?: string;
}

export function Badge({ children, className, variant = "green" }: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex rounded-full px-2.75 py-1 text-base-700 text-style-badge-sm",
				variant === "green" && "bg-primary-green",
				variant === "neutral" && "bg-surface-tag",
				className,
			)}
		>
			{children}
		</span>
	);
}
