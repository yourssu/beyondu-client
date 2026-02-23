import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

interface ContentSectionProps {
	title: string;
	children: ReactNode;
	className?: string;
}

export function ContentSection({ title, children, className }: ContentSectionProps) {
	return (
		<section className={cn("flex flex-col gap-4", className)}>
			<h2 className="text-base-900 text-style-heading-md">{title}</h2>
			<div className="rounded-card bg-surface-page p-6">{children}</div>
		</section>
	);
}
