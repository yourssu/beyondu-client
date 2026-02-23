import type { ReactNode } from "react";

import { cn } from "~/lib/cn";
import { Card } from "~/shared/ui/primitives/card";

interface InfoCardProps {
	title: string;
	children: ReactNode;
	className?: string;
}

export function InfoCard({ title, children, className }: InfoCardProps) {
	return (
		<Card className={cn("flex flex-col gap-3 p-7.5", className)} variant="bordered">
			<h3 className="text-style-body-bold text-base-900">{title}</h3>
			{children}
		</Card>
	);
}
