import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

interface TooltipProps {
	content: string;
	children: ReactNode;
	open?: boolean;
	defaultOpen?: boolean;
	className?: string;
}

export function Tooltip({ children, className, content, defaultOpen, open }: TooltipProps) {
	return (
		<TooltipPrimitive.Provider>
			<TooltipPrimitive.Root defaultOpen={defaultOpen} open={open}>
				<TooltipPrimitive.Trigger asChild>{children}</TooltipPrimitive.Trigger>
				<TooltipPrimitive.Portal>
					<TooltipPrimitive.Content
						className={cn(
							"z-50 whitespace-nowrap rounded-tag border border-base-300 bg-surface-tooltip px-2.5 py-0.5 text-center text-style-badge-sm",
							"animate-tooltip-in data-[state=closed]:animate-tooltip-out",
							className,
						)}
						sideOffset={8}
					>
						{content}
						<TooltipPrimitive.Arrow className="fill-surface-tooltip" />
					</TooltipPrimitive.Content>
				</TooltipPrimitive.Portal>
			</TooltipPrimitive.Root>
		</TooltipPrimitive.Provider>
	);
}
