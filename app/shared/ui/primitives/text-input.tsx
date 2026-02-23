import { cn } from "~/lib/cn";

interface TextInputProps extends Omit<React.ComponentProps<"input">, "type"> {
	error?: boolean;
	className?: string;
}

export function TextInput({ error, className, ...props }: TextInputProps) {
	return (
		<input
			className={cn(
				"h-[50px] w-full rounded-input border border-base-400 bg-white px-4 py-3 text-base-900 text-style-body placeholder:text-base-400 focus:border-primary-brown focus:outline-none",
				error && "border-red-500",
				className,
			)}
			type="text"
			{...props}
		/>
	);
}
