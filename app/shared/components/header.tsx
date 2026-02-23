import type { ReactNode } from "react";

import { cn } from "~/lib/cn";

interface HeaderProps {
	children?: ReactNode;
	className?: string;
}

export function Header({ children, className }: HeaderProps) {
	return (
		<header className={cn("sticky top-0 z-30 bg-surface-glass backdrop-blur-sm", className)}>
			<div className="mx-auto flex h-20 max-w-5xl items-center px-8">
				<a className="text-logo text-style-logo" href="/">
					Beyond U
				</a>
			</div>
			{children}
		</header>
	);
}
