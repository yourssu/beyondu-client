import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router";

import { cn } from "~/lib/cn";

const VISIBLE_PAGES = 7;

function getPageNumbers(currentPage: number, totalPages: number): (number | "...")[] {
	if (totalPages <= VISIBLE_PAGES) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// Always show first, last, and 5 middle slots (including ellipses)
	const pages: (number | "...")[] = [1];

	if (currentPage <= 4) {
		// Near the start: 1 2 3 4 5 ... last
		for (let i = 2; i <= 5; i++) pages.push(i);
		pages.push("...");
	} else if (currentPage >= totalPages - 3) {
		// Near the end: 1 ... n-4 n-3 n-2 n-1 last
		pages.push("...");
		for (let i = totalPages - 4; i <= totalPages - 1; i++) pages.push(i);
	} else {
		// Middle: 1 ... p-1 p p+1 ... last
		pages.push("...");
		for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
		pages.push("...");
	}

	pages.push(totalPages);
	return pages;
}

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	buildHref: (page: number) => string;
	className?: string;
}

export function Pagination({ currentPage, totalPages, buildHref, className }: PaginationProps) {
	if (totalPages <= 1) return null;

	const isFirst = currentPage === 1;
	const isLast = currentPage === totalPages;

	return (
		<nav className={cn("flex items-center justify-center gap-1", className)}>
			{isFirst ? (
				<span className="flex size-9 items-center justify-center rounded-lg text-base-600 opacity-30">
					<ChevronLeft className="size-4" />
				</span>
			) : (
				<Link
					className="flex size-9 items-center justify-center rounded-lg text-base-600 transition-colors hover:bg-base-200"
					to={buildHref(currentPage - 1)}
				>
					<ChevronLeft className="size-4" />
				</Link>
			)}

			{getPageNumbers(currentPage, totalPages).map((page, i) =>
				page === "..." ? (
					<span
						className="flex size-9 items-center justify-center text-base-500 text-style-body"
						// biome-ignore lint/suspicious/noArrayIndexKey: ellipsis separator
						key={`ellipsis-${i}`}
					>
						...
					</span>
				) : page === currentPage ? (
					<span
						className="flex size-9 items-center justify-center rounded-lg bg-primary-green text-base-white text-style-body"
						key={page}
					>
						{page}
					</span>
				) : (
					<Link
						className="flex size-9 items-center justify-center rounded-lg text-base-600 text-style-body transition-colors hover:bg-base-200"
						key={page}
						to={buildHref(page)}
					>
						{page}
					</Link>
				),
			)}

			{isLast ? (
				<span className="flex size-9 items-center justify-center rounded-lg text-base-600 opacity-30">
					<ChevronRight className="size-4" />
				</span>
			) : (
				<Link
					className="flex size-9 items-center justify-center rounded-lg text-base-600 transition-colors hover:bg-base-200"
					to={buildHref(currentPage + 1)}
				>
					<ChevronRight className="size-4" />
				</Link>
			)}
		</nav>
	);
}
