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
		<label className={cn("text-style-body-bold flex cursor-pointer items-center gap-1 text-base-900", className)}>
			<input
				checked={checked}
				className="sr-only"
				name={name}
				type="checkbox"
				onChange={(e) => onChange?.(e.target.checked)}
			/>
			<span
				className={cn(
					"flex size-6 items-center justify-center rounded border",
					checked
						? "border-primary-brown bg-primary-brown"
						: "border-base-400 bg-white",
				)}
			>
				{checked && <Check className="size-4 text-white" />}
			</span>
			{label}
		</label>
	);
}
