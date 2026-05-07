import { useState } from "react";

import { cn } from "~/lib/cn";
import type { ExamTypeResponse, LanguageExamParamName } from "~/shared/api/types";
import type { FilterFormData, LanguageTestFilter } from "~/shared/types/filter";
import { Button } from "~/shared/ui/primitives/button";
import { Checkbox } from "~/shared/ui/primitives/checkbox";
import { Chip } from "~/shared/ui/primitives/chip";
import { Combobox } from "~/shared/ui/primitives/combobox";
import { FormField } from "~/shared/ui/primitives/form-field";
import { NumberInput } from "~/shared/ui/primitives/number-input";
import { Select } from "~/shared/ui/primitives/select";

interface SearchFilterBarProps {
	filters: FilterFormData;
	onFiltersChange: (filters: FilterFormData) => void;
	onSubmit: () => void;
	nations?: string[];
	majorSuggestions?: string[];
	examTypes?: ExamTypeResponse[];
	languageGroups?: string[];
	regions?: string[];
	disabled?: boolean;
	className?: string;
}

function normalizeValue(value: string) {
	return value.trim().toLowerCase();
}

function upsertString(values: string[], value: string) {
	const trimmed = value.trim();
	if (!trimmed) return values;

	const next = values.filter((item) => normalizeValue(item) !== normalizeValue(trimmed));
	return [...next, trimmed];
}

function removeString(values: string[], value: string) {
	return values.filter((item) => normalizeValue(item) !== normalizeValue(value));
}

function upsertLanguageTest(
	tests: LanguageTestFilter[],
	examType: LanguageExamParamName,
	score: string,
) {
	return [...tests.filter((test) => test.examType !== examType), { examType, score: score.trim() }];
}

function examLabel(examTypes: ExamTypeResponse[], examType: LanguageExamParamName) {
	return examTypes.find((item) => item.paramName === examType)?.displayName ?? examType;
}

function SelectedFilterChips({
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

export function SearchFilterBarFull({
	className,
	examTypes = [],
	filters,
	majorSuggestions = [],
	nations = [],
	onFiltersChange,
}: SearchFilterBarProps) {
	const [majorInput, setMajorInput] = useState("");
	const [nationInput, setNationInput] = useState("");
	const [languageCert, setLanguageCert] = useState<LanguageExamParamName | "NONE">("NONE");
	const [score, setScore] = useState("");

	function addMajor(value = majorInput) {
		const next = upsertString(filters.majors, value);
		onFiltersChange({ ...filters, majors: next });
		setMajorInput("");
	}

	function selectMajor(value: string) {
		onFiltersChange({ ...filters, majors: upsertString(filters.majors, value) });
		setMajorInput("");
	}

	function addNation(value = nationInput) {
		const next = upsertString(filters.nations, value);
		onFiltersChange({ ...filters, nations: next });
		setNationInput("");
	}

	function selectNation(value: string) {
		onFiltersChange({ ...filters, nations: upsertString(filters.nations, value) });
		setNationInput("");
	}

	function applyLanguageTest() {
		if (languageCert === "NONE" || !score.trim()) return;
		onFiltersChange({
			...filters,
			languageTests: upsertLanguageTest(filters.languageTests, languageCert, score),
		});
		setScore("");
	}

	return (
		<div className={cn("flex w-full flex-col gap-9", className)}>
			<SelectedFilterChips
				examTypes={examTypes}
				filters={filters}
				onFiltersChange={onFiltersChange}
			/>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormField label="전공">
					<Combobox
						onChange={setMajorInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") addMajor();
						}}
						onSelect={selectMajor}
						placeholder="e.g. Business, Computer Science"
						restrictToSuggestions={majorSuggestions.length > 0}
						suggestions={majorSuggestions}
						value={majorInput}
					/>
				</FormField>
				<FormField label="학점 (4.5 만점)">
					<NumberInput
						max={4.5}
						min={0}
						onBlur={(e) => onFiltersChange({ ...filters, gpa: e.target.value })}
						onChange={(e) => onFiltersChange({ ...filters, gpa: e.target.value })}
						placeholder="예: 3.8"
						step={0.1}
						value={filters.gpa}
					/>
				</FormField>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormField label="보유한 언어 자격증">
					<Select
						onChange={(value) => setLanguageCert(value as LanguageExamParamName | "NONE")}
						options={[
							{ label: "없음", value: "NONE" },
							...examTypes.map((e) => ({ label: e.displayName, value: e.paramName })),
						]}
						placeholder="선택"
						value={languageCert}
					/>
				</FormField>
				<FormField label="점수">
					<NumberInput
						disabled={languageCert === "NONE"}
						onBlur={applyLanguageTest}
						onChange={(e) => setScore(e.target.value)}
						placeholder="예: 800"
						step="any"
						value={score}
					/>
				</FormField>
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormField label="희망 나라">
					<Combobox
						onChange={setNationInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") addNation();
						}}
						onSelect={selectNation}
						placeholder="예: 미국"
						restrictToSuggestions={nations.length > 0}
						suggestions={nations}
						value={nationInput}
					/>
				</FormField>
			</div>
			<Checkbox
				checked={filters.requireReview}
				label="후기 보고서 필수 여부"
				onChange={(requireReview) => onFiltersChange({ ...filters, requireReview })}
			/>
		</div>
	);
}

export function SearchFilterBarCompact({
	className,
	disabled = false,
	examTypes = [],
	filters,
	majorSuggestions = [],
	nations = [],
	onFiltersChange,
	onSubmit,
}: SearchFilterBarProps) {
	const [nationInput, setNationInput] = useState("");
	const [majorInput, setMajorInput] = useState("");
	const [languageCert, setLanguageCert] = useState<LanguageExamParamName | "NONE">("NONE");
	const [score, setScore] = useState("");

	function addNation() {
		onFiltersChange({ ...filters, nations: upsertString(filters.nations, nationInput) });
		setNationInput("");
	}

	function selectNation(value: string) {
		onFiltersChange({ ...filters, nations: upsertString(filters.nations, value) });
		setNationInput("");
	}

	function addMajor() {
		onFiltersChange({ ...filters, majors: upsertString(filters.majors, majorInput) });
		setMajorInput("");
	}

	function selectMajor(value: string) {
		onFiltersChange({ ...filters, majors: upsertString(filters.majors, value) });
		setMajorInput("");
	}

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
					<Combobox
						className="lg:w-filter-country"
						onChange={setNationInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") addNation();
						}}
						onSelect={selectNation}
						placeholder="나라 선택"
						restrictToSuggestions={nations.length > 0}
						suggestions={nations}
						value={nationInput}
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
					<Combobox
						className="lg:w-filter-major"
						onChange={setMajorInput}
						onKeyDown={(e) => {
							if (e.key === "Enter") addMajor();
						}}
						onSelect={selectMajor}
						placeholder="수강 희망 전공 선택"
						restrictToSuggestions={majorSuggestions.length > 0}
						suggestions={majorSuggestions}
						value={majorInput}
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
				<Button className="w-filter-button" disabled={disabled} onClick={onSubmit} size="md">
					위의 조건으로 확인해보기
				</Button>
			</div>
		</div>
	);
}
