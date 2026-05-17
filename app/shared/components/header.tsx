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
					style={{ viewTransitionName: "header-logo" }}
					to="/"
					viewTransition
				>
					<img alt="Beyond U" className="h-9" src="/logo.svg" />
				</Link>
			</div>
			{children}
		</header>
	);
}
