import { Chip } from "~/shared/ui/primitives/chip";

import type { SearchFilterBarProps } from "./types";
import { examLabel, removeString } from "./utils";

export function SelectedFilterChips({
	examTypes,
	filters,
	onFiltersChange,
}: Pick<SearchFilterBarProps, "examTypes" | "filters" | "onFiltersChange">) {
	const hasChips =
		filters.nations.length > 0 ||
		filters.regions.length > 0 ||
		filters.languageGroups.length > 0 ||
		filters.languageTests.length > 0 ||
		filters.majors.length > 0 ||
		filters.gpa;

	if (!hasChips) return null;

	return (
		<div className="flex flex-wrap gap-2">
			{filters.nations.map((nation) => (
				<Chip
					key={`nation-${nation}`}
					label={nation}
					onRemove={() =>
						onFiltersChange({ ...filters, nations: removeString(filters.nations, nation) })
					}
					variant="country"
				/>
			))}
			{filters.regions.map((region) => (
				<Chip
					key={`region-${region}`}
					label={region}
					onRemove={() =>
						onFiltersChange({ ...filters, regions: removeString(filters.regions, region) })
					}
					variant="country"
				/>
			))}
			{filters.languageGroups.map((languageGroup) => (
				<Chip
					key={`language-group-${languageGroup}`}
					label={languageGroup}
					onRemove={() =>
						onFiltersChange({
							...filters,
							languageGroups: removeString(filters.languageGroups, languageGroup),
						})
					}
					variant="language"
				/>
			))}
			{filters.languageTests.map((test) => (
				<Chip
					key={`language-test-${test.examType}`}
					label={examLabel(examTypes ?? [], test.examType)}
					onRemove={() =>
						onFiltersChange({
							...filters,
							languageTests: filters.languageTests.filter(
								(item) => item.examType !== test.examType,
							),
						})
					}
					value={test.score}
					variant="language"
				/>
			))}
			{filters.majors.map((major) => (
				<Chip
					key={`major-${major}`}
					label={major}
					onRemove={() =>
						onFiltersChange({ ...filters, majors: removeString(filters.majors, major) })
					}
				/>
			))}
			{filters.gpa && (
				<Chip
					label="학점"
					onRemove={() => onFiltersChange({ ...filters, gpa: "" })}
					value={filters.gpa}
				/>
			)}
		</div>
	);
}
