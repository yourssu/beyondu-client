import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

interface TooltipProps {
	content: string;
	children: ReactNode;
	open?: boolean;
	className?: string;
}

export function Tooltip({ children, className, content, open }: TooltipProps) {
	return (
		<div className="group relative inline-block">
			{children}
			<div
				className={cn(
					"absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2",
					open === undefined && "hidden group-hover:block",
					open === false && "hidden",
					className,
				)}
			>
				<div className="relative whitespace-nowrap rounded-tag border border-[#c5c5c5] bg-surface-tooltip px-2.5 py-0.5 text-center text-[10px] leading-6">
					{content}
					<div className="absolute -bottom-[5px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b border-r border-[#c5c5c5] bg-surface-tooltip" />
				</div>
			</div>
		</div>
	);
}
