import { useState } from "react";

import { cn } from "~/lib/cn";
import type { LanguageExamParamName } from "~/shared/api/types";
import { Button } from "~/shared/ui/primitives/button";
import { Checkbox } from "~/shared/ui/primitives/checkbox";
import { NumberInput } from "~/shared/ui/primitives/number-input";
import { Select } from "~/shared/ui/primitives/select";

import { MajorFilterPopover } from "./major-filter-popover";
import { NationFilterPopover } from "./nation-filter-popover";
import { SelectedFilterChips } from "./selected-filter-chips";
import type { SearchFilterBarProps } from "./types";
import { upsertLanguageTest } from "./utils";

export function SearchFilterBarCompact({
	className,
	disabled = false,
	examTypes = [],
	filters,
	majorCategories,
	majorsLoading,
	nationsByRegion,
	nationsLoading,
	onFiltersChange,
	onSubmit,
}: SearchFilterBarProps) {
	const [languageCert, setLanguageCert] = useState<LanguageExamParamName | "NONE">("NONE");
	const [score, setScore] = useState("");

	function applyLanguageTest() {
		if (languageCert === "NONE" || !score.trim()) return;
		onFiltersChange({
			...filters,
			languageTests: upsertLanguageTest(filters.languageTests, languageCert, score),
		});
		setScore("");
	}

	return (
		<div className={cn("flex flex-col items-center gap-6", className)}>
			<div className="flex w-full flex-col gap-3">
				<SelectedFilterChips
					examTypes={examTypes}
					filters={filters}
					onFiltersChange={onFiltersChange}
				/>
				<div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
					<NationFilterPopover
						className="lg:w-filter-country"
						loading={nationsLoading}
						nationsByRegion={nationsByRegion}
						onSelectedNationsChange={(nations) => onFiltersChange({ ...filters, nations })}
						selectedNations={filters.nations}
					/>
					<div className="hidden h-10 border-base-400 border-l lg:block" />
					<Select
						className="lg:w-filter-language"
						onChange={(value) => setLanguageCert(value as LanguageExamParamName | "NONE")}
						options={[
							{ label: "언어 선택", value: "NONE" },
							...examTypes.map((e) => ({ label: e.displayName, value: e.paramName })),
						]}
						placeholder="언어 선택"
						value={languageCert}
					/>
					<NumberInput
						className="lg:w-filter-score"
						disabled={languageCert === "NONE"}
						onBlur={applyLanguageTest}
						onChange={(e) => setScore(e.target.value)}
						placeholder="점수"
						step="any"
						value={score}
					/>
					<div className="hidden h-10 border-base-400 border-l lg:block" />
					<MajorFilterPopover
						className="lg:w-filter-major"
						loading={majorsLoading}
						majorCategories={majorCategories}
						onSelectedMajorsChange={(majors) => onFiltersChange({ ...filters, majors })}
						selectedMajors={filters.majors}
					/>
					<NumberInput
						className="lg:w-filter-gpa"
						max={4.5}
						min={0}
						onChange={(e) => onFiltersChange({ ...filters, gpa: e.target.value })}
						placeholder="학점"
						step={0.1}
						value={filters.gpa}
					/>
				</div>
			</div>
			<div className="flex flex-col items-center gap-3">
				<Checkbox
					checked={filters.requireReview}
					className="text-style-body-sm"
					label="후기 보고서 필수 여부"
					onChange={(requireReview) => onFiltersChange({ ...filters, requireReview })}
				/>
				<Button
					className="w-filter-button"
					disabled={disabled}
					onClick={() => onSubmit()}
					size="md"
				>
					위의 조건으로 확인해보기
				</Button>
			</div>
		</div>
	);
}
