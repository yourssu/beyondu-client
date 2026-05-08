import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { cn } from "~/lib/cn";
import { Button } from "~/shared/ui/primitives/button";
import { Checkbox } from "~/shared/ui/primitives/checkbox";
import { FormField } from "~/shared/ui/primitives/form-field";
import { NumberInput } from "~/shared/ui/primitives/number-input";

import { LanguageTestPopover } from "./language-test-popover";
import { MajorFilterPopover } from "./major-filter-popover";
import { NationFilterPopover } from "./nation-filter-popover";
import { SelectedFilterChips } from "./selected-filter-chips";
import type { SearchFilterBarProps } from "./types";

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
	const [showValidation, setShowValidation] = useState(false);

	const nationError = showValidation && filters.nations.length === 0;
	const majorError = showValidation && filters.majors.length === 0;

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
						<LanguageTestPopover
							className="w-full"
							examTypes={examTypes}
							onLanguageTestsChange={(languageTests) =>
								onFiltersChange({ ...filters, languageTests })
							}
							selectedLanguageTests={filters.languageTests}
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
