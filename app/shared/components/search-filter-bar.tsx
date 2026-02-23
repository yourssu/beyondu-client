import { ArrowRight } from "lucide-react";

import { cn } from "~/lib/cn";
import countries from "~/shared/constants/countries.json";
import languageCertificates from "~/shared/constants/language-certificates.json";
import majors from "~/shared/constants/majors.json";
import type { FilterFormData } from "~/shared/types/filter";
import { Button } from "~/shared/ui/primitives/button";
import { Checkbox } from "~/shared/ui/primitives/checkbox";
import { Combobox } from "~/shared/ui/primitives/combobox";
import { FormField } from "~/shared/ui/primitives/form-field";
import { NumberInput } from "~/shared/ui/primitives/number-input";
import { Select } from "~/shared/ui/primitives/select";

interface SearchFilterBarProps {
	filters: FilterFormData;
	onFiltersChange: (filters: FilterFormData) => void;
	onSubmit: () => void;
	variant?: "compact" | "full";
	disabled?: boolean;
	className?: string;
}

export function SearchFilterBar({
	filters,
	onFiltersChange,
	onSubmit,
	variant = "compact",
	disabled = false,
	className,
}: SearchFilterBarProps) {
	function updateField<K extends keyof FilterFormData>(field: K, value: FilterFormData[K]) {
		onFiltersChange({ ...filters, [field]: value });
	}

	function handleLanguageCertChange(value: string) {
		if (value === "NONE") {
			onFiltersChange({ ...filters, languageCert: value, score: "" });
		} else {
			onFiltersChange({ ...filters, languageCert: value });
		}
	}

	const isFull = variant === "full";

	const majorField = (
		<FormField label="전공">
			<Combobox
				onChange={(v) => updateField("major", v)}
				placeholder="e.g. Business, Computer Science"
				restrictToSuggestions
				suggestions={majors}
				value={filters.major}
			/>
		</FormField>
	);

	const gpaField = (
		<FormField label="학점 (4.5 만점)">
			<NumberInput
				max={4.5}
				min={0}
				onChange={(e) => updateField("gpa", e.target.value)}
				placeholder="예: 3.8"
				step={0.1}
				value={filters.gpa}
			/>
		</FormField>
	);

	const languageCertField = (
		<FormField label="보유한 언어 자격증">
			<Select
				onChange={handleLanguageCertChange}
				options={languageCertificates}
				placeholder="선택"
				value={filters.languageCert}
			/>
		</FormField>
	);

	const scoreField = (
		<FormField label="점수">
			<NumberInput
				disabled={filters.languageCert === "NONE"}
				onChange={(e) => updateField("score", e.target.value)}
				placeholder="예: 800"
				value={filters.score}
			/>
		</FormField>
	);

	const countryField = (
		<FormField label="희망 나라">
			<Combobox
				onChange={(v) => updateField("country", v)}
				placeholder="예: 미국"
				restrictToSuggestions
				suggestions={countries}
				value={filters.country}
			/>
		</FormField>
	);

	const checkboxField = (
		<Checkbox
			checked={filters.requireReview}
			label="후기 보고서 필수 여부"
			onChange={(v) => updateField("requireReview", v)}
		/>
	);

	if (isFull) {
		return (
			<div className={cn("flex w-full flex-col gap-9", className)}>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{majorField}
					{gpaField}
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
					{languageCertField}
					{scoreField}
				</div>
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{countryField}</div>
				<div className="flex w-full items-center">{checkboxField}</div>
			</div>
		);
	}

	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{majorField}
				{gpaField}
				{languageCertField}
				{scoreField}
				{countryField}
				<div className="flex items-end pb-3">{checkboxField}</div>
			</div>

			<Button
				disabled={disabled}
				fullWidth
				onClick={onSubmit}
				rightIcon={<ArrowRight className="size-5" />}
				size="lg"
			>
				위의 조건으로 확인해보기
			</Button>
		</div>
	);
}
