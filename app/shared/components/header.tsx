import type { ReactNode } from "react";
import { Link } from "react-router";

import { cn } from "~/lib/cn";

interface HeaderProps {
	children?: ReactNode;
	className?: string;
}

export function Header({ children, className }: HeaderProps) {
	return (
		<header className={cn("sticky top-0 z-30 bg-surface-header backdrop-blur-sm", className)}>
			<div className="mx-auto flex h-header max-w-5xl items-center px-8">
				<Link
					className="text-logo text-style-logo"
					style={{ viewTransitionName: "header-logo" }}
					to="/"
					viewTransition
				>
					Beyond U
				</Link>
			</div>
			{children}
		</header>
	);
}
