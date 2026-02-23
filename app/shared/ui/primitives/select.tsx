import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "~/lib/cn";

interface SelectOption {
	value: string;
	label: string;
}

interface SelectProps {
	options: SelectOption[];
	placeholder?: string;
	value?: string;
	onChange?: (value: string) => void;
	error?: boolean;
	className?: string;
	name?: string;
}

export function Select({
	options,
	placeholder,
	value,
	onChange,
	error,
	className,
	name,
}: SelectProps) {
	return (
		<SelectPrimitive.Root name={name} onValueChange={onChange} value={value}>
			<SelectPrimitive.Trigger
				className={cn(
					"flex h-12.5 w-full items-center justify-between rounded-input border border-base-400 bg-white px-4 py-3 text-base-900 text-style-body focus:border-primary-brown focus:outline-none",
					error && "border-red-500",
					className,
				)}
			>
				<SelectPrimitive.Value placeholder={placeholder} />
				<SelectPrimitive.Icon>
					<ChevronDown className="size-5 text-base-700" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					className="z-50 overflow-hidden rounded-input border border-base-400 bg-white shadow-lg"
					position="popper"
					sideOffset={4}
				>
					<SelectPrimitive.Viewport>
						{options.map((option) => (
							<SelectPrimitive.Item
								className="flex cursor-pointer items-center gap-2 px-4 py-2 text-style-body outline-none data-[highlighted]:bg-surface-page"
								key={option.value}
								value={option.value}
							>
								<SelectPrimitive.ItemIndicator>
									<Check className="size-4" />
								</SelectPrimitive.ItemIndicator>
								<SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Viewport>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}
