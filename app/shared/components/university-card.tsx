import { MapPin } from "lucide-react";
import { Link, useLocation, useViewTransitionState } from "react-router";

import { cn } from "~/lib/cn";
import type { UniversitySummaryDto } from "~/shared/api/types";
import { Badge } from "~/shared/ui/primitives/badge";
import { Card } from "~/shared/ui/primitives/card";

interface UniversityCardProps extends UniversitySummaryDto {
	className?: string;
}

export function UniversityCard({
	id,
	nation,
	badge,
	programType,
	nameEng,
	nameKor,
	languageRequirementSummary,
	reviewStatus,
	className,
}: UniversityCardProps) {
	const location = useLocation();
	const isTransitioning = useViewTransitionState(`/detail/${id}`);

	return (
		<Link
			className="group block h-full"
			state={{ from: location.pathname + location.search }}
			to={`/detail/${id}`}
			viewTransition
		>
			<Card
				className={cn(
					"spring-duration-200 spring-bounce-20 flex h-full flex-col gap-3 p-5 transition group-hover:scale-97 group-hover:border-primary-green group-hover:bg-card-hover group-hover:shadow-elevation-1",
					className,
				)}
				style={isTransitioning ? { viewTransitionName: "university-hero" } : undefined}
			>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 text-base-700">
						<MapPin className="size-4 shrink-0" />
						<span className="text-style-body-sm">{nation}</span>
					</div>
					<Badge className="rounded-tag" variant="neutral">
						{programType ? `${badge} | ${programType}` : badge}
					</Badge>
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="line-clamp-2 text-base-900 text-style-body-bold">{nameEng}</h3>
					<p className="text-base-700 text-style-body-sm">{nameKor}</p>
				</div>

				{languageRequirementSummary && (
					<p className="truncate text-base-900 text-style-body-sm">{languageRequirementSummary}</p>
				)}

				<Badge
					className="mt-auto self-start rounded-tag"
					variant={reviewStatus === "있음" ? "green" : "neutral"}
				>
					{reviewStatus === "있음" ? "후기 있음" : "후기 없음"}
				</Badge>
			</Card>
		</Link>
	);
}
