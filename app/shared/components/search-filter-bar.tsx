import { ArrowRight, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "~/lib/cn";
import type {
	ExamTypeResponse,
	LanguageExamParamName,
	MajorCategoryResponse,
	NationsByRegionResponse,
} from "~/shared/api/types";
import type { FilterFormData, LanguageTestFilter } from "~/shared/types/filter";
import { Button } from "~/shared/ui/primitives/button";
import {
	CategorizedList,
	type CategorizedListCategory,
} from "~/shared/ui/primitives/categorized-list";
import { Checkbox } from "~/shared/ui/primitives/checkbox";
import { Chip } from "~/shared/ui/primitives/chip";
import { FormField } from "~/shared/ui/primitives/form-field";
import { NumberInput } from "~/shared/ui/primitives/number-input";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/primitives/popover";
import { Select } from "~/shared/ui/primitives/select";

interface SearchFilterBarProps {
	filters: FilterFormData;
	onFiltersChange: (filters: FilterFormData) => void;
	onSubmit: (filters?: FilterFormData) => void;
	nationsByRegion?: NationsByRegionResponse[];
	nationsLoading?: boolean;
	majorCategories?: MajorCategoryResponse[];
	majorsLoading?: boolean;
	examTypes?: ExamTypeResponse[];
	languageGroups?: string[];
	regions?: string[];
	disabled?: boolean;
	className?: string;
}

function normalizeValue(value: string) {
	return value.trim().toLowerCase();
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

interface NationFilterPopoverProps {
	className?: string;
	error?: boolean;
	loading?: boolean;
	nationsByRegion?: NationsByRegionResponse[];
	onSelectedNationsChange: (nations: string[]) => void;
	selectedNations: string[];
}

function selectTriggerLabel(
	selectedValues: string[],
	loading: boolean,
	hasOptions: boolean,
	labels: { empty: string; loading: string; noOptions: string },
) {
	if (loading) return labels.loading;
	if (!hasOptions) return labels.noOptions;
	if (selectedValues.length === 0) return labels.empty;
	if (selectedValues.length === 1) return selectedValues[0];
	return `${selectedValues[0]} 외 ${selectedValues.length - 1}개`;
}

function NationFilterPopover({
	className,
	error,
	loading = false,
	nationsByRegion = [],
	onSelectedNationsChange,
	selectedNations,
}: NationFilterPopoverProps) {
	const [open, setOpen] = useState(false);
	const categories = useMemo<CategorizedListCategory[]>(
		() =>
			nationsByRegion
				.filter((group) => group.nations.length > 0)
				.map((group) => ({
					id: group.region,
					items: group.nations.map((nation) => ({ label: nation, value: nation })),
					label: group.region,
				})),
		[nationsByRegion],
	);
	const hasOptions = categories.some((category) => category.items.length > 0);
	const disabled = loading || !hasOptions;
	const label = selectTriggerLabel(selectedNations, loading, hasOptions, {
		empty: "나라 선택",
		loading: "국가 불러오는 중",
		noOptions: "선택 가능한 국가 없음",
	});

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger
				className={cn(
					"flex h-12.5 w-full items-center justify-between rounded-input border border-base-400 bg-surface-white px-4 py-3 text-left text-base-900 text-style-body focus:border-primary-brown focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
					error && "border-red-500",
					className,
				)}
				disabled={disabled}
			>
				<span className={cn(selectedNations.length === 0 && !disabled && "text-base-400")}>
					{label}
				</span>
				<ChevronDown className="size-5 shrink-0 text-base-700" />
			</PopoverTrigger>
			<PopoverContent className="overflow-hidden p-0" sideOffset={4}>
				<CategorizedList
					ariaLabel="국가 선택"
					categories={categories}
					onEscapeKeyDown={() => setOpen(false)}
					onValueChange={onSelectedNationsChange}
					value={selectedNations}
				/>
			</PopoverContent>
		</Popover>
	);
}

interface MajorFilterPopoverProps {
	className?: string;
	error?: boolean;
	loading?: boolean;
	majorCategories?: MajorCategoryResponse[];
	onSelectedMajorsChange: (majors: string[]) => void;
	selectedMajors: string[];
}

function MajorFilterPopover({
	className,
	error,
	loading = false,
	majorCategories = [],
	onSelectedMajorsChange,
	selectedMajors,
}: MajorFilterPopoverProps) {
	const [open, setOpen] = useState(false);
	const categories = useMemo<CategorizedListCategory[]>(
		() =>
			majorCategories
				.filter((group) => group.majors.length > 0)
				.map((group) => ({
					id: group.category,
					items: group.majors.map((major) => ({
						label: major.name,
						tags: major.koreanMajors,
						value: major.name,
					})),
					label: group.category,
				})),
		[majorCategories],
	);
	const hasOptions = categories.some((category) => category.items.length > 0);
	const disabled = loading || !hasOptions;
	const label = selectTriggerLabel(selectedMajors, loading, hasOptions, {
		empty: "전공 선택",
		loading: "전공 불러오는 중",
		noOptions: "선택 가능한 전공 없음",
	});

	return (
		<Popover onOpenChange={setOpen} open={open}>
			<PopoverTrigger
				className={cn(
					"flex h-12.5 w-full items-center justify-between rounded-input border border-base-400 bg-surface-white px-4 py-3 text-left text-base-900 text-style-body focus:border-primary-brown focus:outline-none disabled:cursor-not-allowed disabled:opacity-60",
					error && "border-red-500",
					className,
				)}
				disabled={disabled}
			>
				<span className={cn(selectedMajors.length === 0 && !disabled && "text-base-400")}>
					{label}
				</span>
				<ChevronDown className="size-5 shrink-0 text-base-700" />
			</PopoverTrigger>
			<PopoverContent className="overflow-hidden p-0" sideOffset={4}>
				<CategorizedList
					ariaLabel="전공 선택"
					categories={categories}
					onEscapeKeyDown={() => setOpen(false)}
					onValueChange={onSelectedMajorsChange}
					value={selectedMajors}
				/>
			</PopoverContent>
		</Popover>
	);
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
	majorCategories,
	majorsLoading,
	nationsByRegion,
	nationsLoading,
	onFiltersChange,
	onSubmit,
}: SearchFilterBarProps) {
	const [languageCert, setLanguageCert] = useState<LanguageExamParamName | "NONE">("NONE");
	const [showValidation, setShowValidation] = useState(false);

	const nationError = showValidation && filters.nations.length === 0;
	const majorError = showValidation && filters.majors.length === 0;

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
		setShowValidation(true);
		onFiltersChange(filters);
		if (filters.nations.length === 0 || filters.majors.length === 0) return;
		onSubmit(filters);
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
						<NationFilterPopover
							className="w-full"
							error={nationError}
							loading={nationsLoading}
							nationsByRegion={nationsByRegion}
							onSelectedNationsChange={(nations) => onFiltersChange({ ...filters, nations })}
							selectedNations={filters.nations}
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
						<MajorFilterPopover
							className="w-full"
							error={majorError}
							loading={majorsLoading}
							majorCategories={majorCategories}
							onSelectedMajorsChange={(majors) => onFiltersChange({ ...filters, majors })}
							selectedMajors={filters.majors}
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
