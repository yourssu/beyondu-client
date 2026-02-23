import { ChevronDown } from "lucide-react";

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
		<div className="relative">
			<select
				className={cn(
					"h-[50px] w-full appearance-none rounded-input border border-base-400 bg-white px-4 py-3 pr-10 text-style-body text-base-900 focus:border-primary-brown focus:outline-none",
					error && "border-red-500",
					className,
				)}
				name={name}
				value={value}
				onChange={(e) => onChange?.(e.target.value)}
			>
				{placeholder && (
					<option disabled value="">
						{placeholder}
					</option>
				)}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			<ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-base-700" />
		</div>
	);
}
