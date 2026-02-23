import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

import { cn } from "~/lib/cn";

interface BackButtonProps {
	href?: string;
	onClick?: () => void;
	className?: string;
}

export function BackButton({ href, onClick, className }: BackButtonProps) {
	const content = (
		<>
			<ArrowLeft className="size-5" />
			<span>뒤로가기</span>
		</>
	);

	const sharedClassName = cn(
		"inline-flex items-center gap-2 text-base-700 text-style-body",
		className,
	);

	if (href) {
		return (
			<Link className={sharedClassName} to={href}>
				{content}
			</Link>
		);
	}

	return (
		<button className={sharedClassName} onClick={onClick} type="button">
			{content}
		</button>
	);
}
