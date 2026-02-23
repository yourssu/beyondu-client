import { ArrowRight } from "lucide-react";

import { cn } from "~/lib/cn";
import { Button } from "~/shared/ui/primitives/button";
import { Checkbox } from "~/shared/ui/primitives/checkbox";
import { Combobox } from "~/shared/ui/primitives/combobox";
import { FormField } from "~/shared/ui/primitives/form-field";
import { NumberInput } from "~/shared/ui/primitives/number-input";
import { Select } from "~/shared/ui/primitives/select";

interface SearchFilterBarProps {
	major: string;
	onMajorChange: (value: string) => void;
	gpa: string;
	onGpaChange: (value: string) => void;
	languageCert: string;
	onLanguageCertChange: (value: string) => void;
	score: string;
	onScoreChange: (value: string) => void;
	country: string;
	onCountryChange: (value: string) => void;
	requireReview: boolean;
	onRequireReviewChange: (checked: boolean) => void;
	onSubmit: () => void;
	majorSuggestions?: string[];
	countrySuggestions?: string[];
	languageCertOptions?: { value: string; label: string }[];
	className?: string;
}

export function SearchFilterBar({
	major,
	onMajorChange,
	gpa,
	onGpaChange,
	languageCert,
	onLanguageCertChange,
	score,
	onScoreChange,
	country,
	onCountryChange,
	requireReview,
	onRequireReviewChange,
	onSubmit,
	majorSuggestions = [],
	countrySuggestions = [],
	languageCertOptions = [],
	className,
}: SearchFilterBarProps) {
	return (
		<div className={cn("flex flex-col gap-6", className)}>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				<FormField label="전공">
					<Combobox
						placeholder="예: 경영학과, 컴퓨터학부"
						suggestions={majorSuggestions}
						value={major}
						onChange={onMajorChange}
					/>
				</FormField>

				<FormField label="학점 (4.5 만점)">
					<NumberInput
						placeholder="예: 3.8"
						value={gpa}
						onChange={(e) => onGpaChange(e.target.value)}
					/>
				</FormField>

				<FormField label="보유한 언어 자격증">
					<Select
						options={languageCertOptions}
						placeholder="선택"
						value={languageCert}
						onChange={onLanguageCertChange}
					/>
				</FormField>

				<FormField label="점수">
					<NumberInput
						placeholder="예: 800"
						value={score}
						onChange={(e) => onScoreChange(e.target.value)}
					/>
				</FormField>

				<FormField label="희망 나라">
					<Combobox
						placeholder="예: 미국"
						suggestions={countrySuggestions}
						value={country}
						onChange={onCountryChange}
					/>
				</FormField>

				<div className="flex items-end pb-3">
					<Checkbox
						checked={requireReview}
						label="후기 보고서 필수 여부"
						onChange={onRequireReviewChange}
					/>
				</div>
			</div>

			<Button
				fullWidth
				rightIcon={<ArrowRight className="size-5" />}
				size="lg"
				onClick={onSubmit}
			>
				위의 조건으로 확인해보기
			</Button>
		</div>
	);
}
