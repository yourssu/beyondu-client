import { cn } from "~/lib/cn";

interface TagProps {
	programType: string;
	className?: string;
}

export function Tag({ className, programType }: TagProps) {
	return (
		<span
			className={cn(
				"inline-flex rounded-tag bg-surface-tag px-2 py-0.5 text-base-700 text-style-caption",
				className,
			)}
		>
			{programType}
		</span>
	);
}
