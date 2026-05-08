import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import type { ComponentProps } from "react";

import { cn } from "~/lib/cn";

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;
export const PopoverPortal = PopoverPrimitive.Portal;
export const PopoverPositioner = PopoverPrimitive.Positioner;
export const PopoverClose = PopoverPrimitive.Close;

interface PopoverContentProps extends ComponentProps<typeof PopoverPrimitive.Popup> {
	align?: ComponentProps<typeof PopoverPrimitive.Positioner>["align"];
	alignOffset?: ComponentProps<typeof PopoverPrimitive.Positioner>["alignOffset"];
	positionerClassName?: string;
	side?: ComponentProps<typeof PopoverPrimitive.Positioner>["side"];
	sideOffset?: ComponentProps<typeof PopoverPrimitive.Positioner>["sideOffset"];
}

export function PopoverContent({
	align = "start",
	alignOffset,
	className,
	positionerClassName,
	side = "bottom",
	sideOffset = 8,
	...props
}: PopoverContentProps) {
	return (
		<PopoverPortal>
			<PopoverPositioner
				align={align}
				alignOffset={alignOffset}
				className={cn("z-50", positionerClassName)}
				side={side}
				sideOffset={sideOffset}
			>
				<PopoverPrimitive.Popup
					className={cn(
						"origin-(--transform-origin) rounded-input bg-surface-white shadow-elevation-3 outline-none",
						"animate-dropdown-in data-[ending-style]:animate-dropdown-out",
						className,
					)}
					{...props}
				/>
			</PopoverPositioner>
		</PopoverPortal>
	);
}
