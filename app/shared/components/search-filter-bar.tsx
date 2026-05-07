import { ArrowRight } from "lucide-react";
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
	onSubmit: (filters?: FilterFormData) => void;
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
	disabled = false,
	examTypes = [],
	filters,
	majorSuggestions = [],
	nations = [],
	onFiltersChange,
	onSubmit,
}: SearchFilterBarProps) {
	const [majorInput, setMajorInput] = useState("");
	const [nationInput, setNationInput] = useState("");
	const [languageCert, setLanguageCert] = useState<LanguageExamParamName | "NONE">("NONE");
	const [showValidation, setShowValidation] = useState(false);

	const nationError = showValidation && filters.nations.length === 0;
	const majorError = showValidation && filters.majors.length === 0;

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

	function selectLanguageCert(value: string) {
		const nextLanguageCert = value as LanguageExamParamName | "NONE";
		setLanguageCert(nextLanguageCert);
		onFiltersChange({
			...filters,
			languageTests:
				nextLanguageCert === "NONE"
					? []
					: upsertLanguageTest(filters.languageTests, nextLanguageCert, ""),
		});
	}

	function handleSubmit() {
		const nextFilters = {
			...filters,
			majors: upsertString(filters.majors, majorInput),
			nations: upsertString(filters.nations, nationInput),
		};
		setShowValidation(true);
		onFiltersChange(nextFilters);
		if (nextFilters.nations.length === 0 || nextFilters.majors.length === 0) return;
		onSubmit(nextFilters);
	}

	return (
		<div
			className={cn(
				"mx-auto flex w-full max-w-2xl flex-col items-center gap-14 rounded-3xl border border-primary-brown bg-surface-glass px-24 pt-14 pb-12",
				className,
			)}
		>
			<div className="flex w-full max-w-md flex-col gap-16">
				<div className="flex flex-col gap-2">
					<h2 className="text-base-900 text-style-heading-lg">나의 조건 입력하기</h2>
					<p className="text-base-900 text-style-body">
						입력하신 정보를 바탕으로 지원 가능한 학교를 분석합니다
					</p>
				</div>

				<div className="flex flex-col gap-9">
					<SelectedFilterChips
						examTypes={examTypes}
						filters={filters}
						onFiltersChange={onFiltersChange}
					/>

					<FormField
						error={nationError ? "희망하는 나라 또는 대륙을 입력해 주세요." : undefined}
						label="희망하는 나라 또는 대륙"
						required
						requiredLabel="(필수)"
					>
						<Combobox
							className="w-full"
							error={nationError}
							onChange={setNationInput}
							onKeyDown={(e) => {
								if (e.key === "Enter") addNation();
							}}
							onSelect={selectNation}
							placeholder="미국, 유럽"
							restrictToSuggestions={nations.length > 0}
							suggestions={nations}
							value={nationInput}
						/>
					</FormField>

					<FormField className="w-64" label="준비할 언어 자격증">
						<Select
							onChange={selectLanguageCert}
							options={[
								{ label: "없음", value: "NONE" },
								...examTypes.map((e) => ({ label: e.displayName, value: e.paramName })),
							]}
							placeholder="TOEIC"
							value={languageCert}
						/>
					</FormField>

					<FormField
						error={majorError ? "수강 희망 전공을 입력해 주세요." : undefined}
						label="수강 희망 전공"
						required
						requiredLabel="(필수)"
					>
						<Combobox
							className="w-full"
							error={majorError}
							onChange={setMajorInput}
							onKeyDown={(e) => {
								if (e.key === "Enter") addMajor();
							}}
							onSelect={selectMajor}
							placeholder="숭실대 전공 검색으로도 탐색할 수 있어요!"
							restrictToSuggestions={majorSuggestions.length > 0}
							suggestions={majorSuggestions}
							value={majorInput}
						/>
					</FormField>

					<FormField className="w-64" label="나의 학점 (4.5 만점)">
						<NumberInput
							max={4.5}
							min={0}
							onBlur={(e) => onFiltersChange({ ...filters, gpa: e.target.value })}
							onChange={(e) => onFiltersChange({ ...filters, gpa: e.target.value })}
							placeholder="3.8"
							step={0.1}
							value={filters.gpa}
						/>
					</FormField>
				</div>
			</div>

			<div className="flex flex-col items-center gap-4">
				<Checkbox
					checked={filters.requireReview}
					label="후기 보고서 필수 여부"
					onChange={(requireReview) => onFiltersChange({ ...filters, requireReview })}
				/>
				<Button
					className="w-80 rounded-lg"
					disabled={disabled}
					onClick={handleSubmit}
					rightIcon={<ArrowRight className="size-5" />}
					size="lg"
				>
					맞춤 학교 찾아보기
				</Button>
			</div>
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
