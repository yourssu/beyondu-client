import { MapPin } from "lucide-react";
import { Link } from "react-router";

import { cn } from "~/lib/cn";
import type { UniversitySummaryDto } from "~/shared/api/types";
import { Badge } from "~/shared/ui/primitives/badge";
import { Card } from "~/shared/ui/primitives/card";
import { Tag } from "~/shared/ui/primitives/tag";

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
	return (
		<Link className="block h-full" to={`/detail/${id}`}>
			<Card className={cn("flex h-full flex-col gap-3 p-5", className)}>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 text-base-700">
						<MapPin className="size-4 shrink-0" />
						<span className="text-style-body-sm">{nation}</span>
					</div>
					<div className="flex items-center gap-2">
						<Badge>{badge}</Badge>
						{programType && <Tag programType={programType} />}
					</div>
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="text-base-900 text-style-body-bold">{nameEng}</h3>
					<p className="text-base-700 text-style-body-sm">{nameKor}</p>
				</div>

				{languageRequirementSummary && (
					<p className="text-primary-olive text-style-caption">{languageRequirementSummary}</p>
				)}

				<Badge
					className="mt-auto self-start"
					variant={reviewStatus === "없음" ? "neutral" : "green"}
				>
					{reviewStatus === "없음" ? "후기 없음" : "후기 있음"}
				</Badge>
			</Card>
		</Link>
	);
}
