import { cn } from "~/lib/cn";

interface NumberInputProps extends Omit<React.ComponentProps<"input">, "type"> {
	error?: boolean;
	className?: string;
}

export function NumberInput({ error, className, ...props }: NumberInputProps) {
	return (
		<input
			className={cn(
				"h-12.5 w-full rounded-input border border-base-400 bg-white px-4 py-3 text-base-900 text-style-body placeholder:text-base-400",
				"spring-bounce-0 spring-duration-200 transition",
				"hover:border-base-700",
				"focus:border-primary-brown focus:outline-none focus:ring-2 focus:ring-primary-brown/20",
				"disabled:cursor-not-allowed disabled:bg-surface-page disabled:opacity-50",
				error && "border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500/20",
				className,
			)}
			type="number"
			{...props}
		/>
	);
}
