import { X } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

type ChipVariant = "default" | "country" | "language";

interface ChipProps {
	children?: ReactNode;
	className?: string;
	label?: ReactNode;
	onRemove?: () => void;
	value?: ReactNode;
	variant?: ChipVariant;
}

const variantClassNames = {
	country: "border-chip-orange-border bg-chip-orange-bg text-chip-orange-text",
	default: "border-chip-green-border bg-chip-green-bg text-chip-green-text",
	language: "border-chip-blue-border bg-chip-blue-bg text-chip-blue-text",
} satisfies Record<ChipVariant, string>;

export function Chip({
	children,
	className,
	label,
	onRemove,
	value,
	variant = "default",
}: ChipProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center justify-center gap-2 rounded-full border px-3 py-1.5 text-style-body-sm",
				variantClassNames[variant],
				className,
			)}
		>
			<span className="inline-flex items-center gap-1.5 whitespace-nowrap">
				{children ?? (
					<>
						{label}
						{value && (
							<span className={cn(variant === "language" && "text-chip-blue-value")}>{value}</span>
						)}
					</>
				)}
			</span>
			{onRemove && (
				<button
					aria-label="필터 제거"
					className="spring-bounce-20 spring-duration-150 inline-flex size-4 items-center justify-center rounded-full transition hover:bg-base-900/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/40"
					onClick={onRemove}
					type="button"
				>
					<X className="size-2.5" />
				</button>
			)}
		</span>
	);
}
