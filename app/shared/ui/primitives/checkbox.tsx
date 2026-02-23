import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "~/lib/cn";

interface CheckboxProps {
	label: string;
	checked?: boolean;
	onChange?: (checked: boolean) => void;
	name?: string;
	className?: string;
}

export function Checkbox({ label, checked, onChange, name, className }: CheckboxProps) {
	return (
		<label
			className={cn(
				"text-style-body-bold flex cursor-pointer items-center gap-1 text-base-900",
				className,
			)}
		>
			<CheckboxPrimitive.Root
				checked={checked}
				className={cn(
					"flex size-6 items-center justify-center rounded border",
					checked ? "border-primary-brown bg-primary-brown" : "border-base-400 bg-white",
				)}
				name={name}
				onCheckedChange={(value) => onChange?.(value === true)}
			>
				<CheckboxPrimitive.Indicator>
					<Check className="size-4 text-white" />
				</CheckboxPrimitive.Indicator>
			</CheckboxPrimitive.Root>
			{label}
		</label>
	);
}
