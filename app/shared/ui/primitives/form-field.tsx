import { cn } from "~/lib/cn";

interface FormFieldProps {
	label: string;
	htmlFor?: string;
	error?: string;
	children: React.ReactNode;
	className?: string;
}

export function FormField({ label, htmlFor, error, children, className }: FormFieldProps) {
	return (
		<div className={cn("flex flex-col gap-2", className)}>
			<label className="text-base-900 text-style-body-bold" htmlFor={htmlFor}>
				{label}
			</label>
			{children}
			{error && <p className="mt-1 animate-error-in text-red-500 text-sm">{error}</p>}
		</div>
	);
}
