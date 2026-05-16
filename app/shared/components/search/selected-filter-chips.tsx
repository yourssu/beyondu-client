import { Chip } from "~/shared/ui/primitives/chip";

import type { SearchFilterBarProps } from "./types";
import { examLabel, removeString } from "./utils";

type SelectedFilterChipGroup = "gpa" | "language" | "location" | "major";

const allChipGroups: SelectedFilterChipGroup[] = ["location", "language", "major"];

interface SelectedFilterChipsProps
	extends Pick<SearchFilterBarProps, "examTypes" | "filters" | "onFiltersChange"> {
	groups?: SelectedFilterChipGroup[];
}

export function SelectedFilterChips({
	examTypes,
	filters,
	groups = allChipGroups,
	onFiltersChange,
}: SelectedFilterChipsProps) {
	const showLocationChips = groups.includes("location");
	const showLanguageChips = groups.includes("language");
	const showMajorChips = groups.includes("major");
	const hasChips =
		(showLocationChips && (filters.nations.length > 0 || filters.regions.length > 0)) ||
		(showLanguageChips &&
			(filters.languageGroups.length > 0 || filters.languageTests.length > 0)) ||
		(showMajorChips && filters.majors.length > 0);

	if (!hasChips) return null;

	return (
		<div className="flex flex-wrap gap-2">
			{showLocationChips &&
				filters.nations.map((nation) => (
					<Chip
						key={`nation-${nation}`}
						label={nation}
						onRemove={() =>
							onFiltersChange({ ...filters, nations: removeString(filters.nations, nation) })
						}
						variant="country"
					/>
				))}
			{showLocationChips &&
				filters.regions.map((region) => (
					<Chip
						key={`region-${region}`}
						label={region}
						onRemove={() =>
							onFiltersChange({ ...filters, regions: removeString(filters.regions, region) })
						}
						variant="country"
					/>
				))}
			{showLanguageChips &&
				filters.languageGroups.map((languageGroup) => (
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
			{showLanguageChips &&
				filters.languageTests.map((test) => (
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
			{showMajorChips &&
				filters.majors.map((major) => (
					<Chip
						key={`major-${major}`}
						label={major}
						onRemove={() =>
							onFiltersChange({ ...filters, majors: removeString(filters.majors, major) })
						}
					/>
				))}
		</div>
	);
}
