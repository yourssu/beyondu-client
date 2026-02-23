import { cn } from "~/lib/cn";

interface TagProps {
	exchangeType: string;
	program?: string;
	className?: string;
}

export function Tag({ className, exchangeType, program }: TagProps) {
	return (
		<span
			className={cn(
				"inline-flex rounded-tag bg-surface-tag px-2 py-0.5 text-base-700 text-style-caption",
				className,
			)}
		>
			{program ? `${exchangeType} | ${program}` : exchangeType}
		</span>
	);
}
