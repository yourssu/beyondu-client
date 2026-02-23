import { MapPin } from "lucide-react";
import { Link } from "react-router";

import { cn } from "~/lib/cn";
import { Badge } from "~/shared/ui/primitives/badge";
import { Card } from "~/shared/ui/primitives/card";
import { Tag } from "~/shared/ui/primitives/tag";

interface LanguageRequirement {
	name: string;
	score: string;
}

interface UniversityCardProps {
	id: string;
	country: string;
	exchangeType: string;
	program?: string;
	nameEn: string;
	nameKr: string;
	languageRequirements: LanguageRequirement[];
	hasReview: boolean;
	reviewYears?: string;
	className?: string;
}

export function UniversityCard({
	id,
	country,
	exchangeType,
	program,
	nameEn,
	nameKr,
	languageRequirements,
	hasReview,
	reviewYears,
	className,
}: UniversityCardProps) {
	return (
		<Link className="block" to={`/detail/${id}`}>
			<Card className={cn("flex flex-col gap-3 p-5", className)}>
				<div className="flex items-center gap-2">
					<Badge>{exchangeType}</Badge>
					<Tag exchangeType={exchangeType} program={program} />
				</div>

				<div className="flex flex-col gap-1">
					<h3 className="text-style-body-bold text-base-900">{nameEn}</h3>
					<p className="text-style-body-sm text-base-700">{nameKr}</p>
				</div>

				<div className="flex items-center gap-1 text-base-700">
					<MapPin className="size-4 shrink-0" />
					<span className="text-style-body-sm">{country}</span>
				</div>

				{languageRequirements.length > 0 && (
					<div className="flex flex-wrap gap-1.5">
						{languageRequirements.map((req) => (
							<span
								className="text-style-caption text-primary-olive"
								key={req.name}
							>
								{req.name} {req.score}
							</span>
						))}
					</div>
				)}

				{hasReview && (
					<p className="text-style-caption text-base-700">
						후기 있음{reviewYears ? ` (${reviewYears})` : ""}
					</p>
				)}
			</Card>
		</Link>
	);
}
