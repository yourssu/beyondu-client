import { useMemo } from "react";

import type { ExamTypeResponse, LanguageExamParamName } from "~/shared/api/types";
import type { LanguageTestFilter } from "~/shared/types/filter";
import {
	CompoundList,
	CompoundListItem,
	CompoundListItemDetails,
	CompoundListNumberField,
	CompoundListSelectField,
	type CompoundListSelectFieldOption,
} from "~/shared/ui/primitives/compound-list";

import { upsertLanguageTest } from "./utils";

interface LanguageTestCompoundListProps {
	ariaLabel?: string;
	className?: string;
	examTypes?: ExamTypeResponse[];
	onEscapeKeyDown?: () => void;
	onValueChange: (value: LanguageTestFilter[]) => void;
	value: LanguageTestFilter[];
}

const SELECT_FIELD_EXAMS = new Set<LanguageExamParamName>(["JLPT", "HSK", "DELF", "ZD"]);

function rangeOptions(examType: LanguageExamParamName, minScore: number, maxScore: number) {
	if (!Number.isInteger(minScore) || !Number.isInteger(maxScore) || minScore > maxScore) return [];

	return Array.from({ length: maxScore - minScore + 1 }, (_, index) => {
		const value = String(minScore + index);
		return {
			label: examType === "JLPT" ? `N${value}` : `${value}급`,
			value,
		};
	});
}

function scoreStep(examType: LanguageExamParamName) {
	return examType === "IELTS" ? 0.5 : 1;
}

function selectedExamTypes(value: LanguageTestFilter[]) {
	return value.map((test) => test.examType);
}

function syncSelectedTests(
	currentTests: LanguageTestFilter[],
	nextExamTypes: string[],
): LanguageTestFilter[] {
	return nextExamTypes.map((examType) => {
		const typedExamType = examType as LanguageExamParamName;
		return (
			currentTests.find((test) => test.examType === typedExamType) ?? {
				examType: typedExamType,
				score: "",
			}
		);
	});
}

export function LanguageTestCompoundList({
	ariaLabel = "어학성적 선택",
	className,
	examTypes = [],
	onEscapeKeyDown,
	onValueChange,
	value,
}: LanguageTestCompoundListProps) {
	const selectedValues = useMemo(() => selectedExamTypes(value), [value]);

	function updateScore(examType: LanguageExamParamName, score: string) {
		onValueChange(upsertLanguageTest(value, examType, score));
	}

	function removeTest(examType: LanguageExamParamName) {
		onValueChange(value.filter((test) => test.examType !== examType));
	}

	function scoreFor(examType: LanguageExamParamName) {
		return value.find((test) => test.examType === examType)?.score ?? "";
	}

	return (
		<CompoundList
			ariaLabel={ariaLabel}
			className={className}
			onEscapeKeyDown={onEscapeKeyDown}
			onValueChange={(nextValue) => onValueChange(syncSelectedTests(value, nextValue))}
			value={selectedValues}
		>
			{examTypes.map((examType) => {
				const score = scoreFor(examType.paramName);
				const selectOptions: CompoundListSelectFieldOption[] = SELECT_FIELD_EXAMS.has(
					examType.paramName,
				)
					? rangeOptions(examType.paramName, examType.minScore, examType.maxScore)
					: [];

				return (
					<CompoundListItem key={examType.paramName} value={examType.paramName}>
						{examType.displayName}
						<CompoundListItemDetails>
							{selectOptions.length > 0 ? (
								<CompoundListSelectField
									aria-label={`${examType.displayName} 점수`}
									onValueChange={(nextScore) => updateScore(examType.paramName, nextScore)}
									options={selectOptions}
									placeholder="점수 (필수 아님)"
									value={score}
								/>
							) : (
								<CompoundListNumberField
									aria-label={`${examType.displayName} 점수`}
									max={examType.maxScore}
									min={examType.minScore}
									onBlur={(event) => {
										const val = event.currentTarget.value.trim();
										if (!val) {
											removeTest(examType.paramName);
											return;
										}
										const numVal = Number(val);
										if (Number.isNaN(numVal)) return;
										const step = scoreStep(examType.paramName);
										const rounded = Math.round(numVal / step) * step;
										const clamped = Math.min(
											Math.max(rounded, examType.minScore),
											examType.maxScore,
										);
										updateScore(examType.paramName, String(clamped));
									}}
									onChange={(event) => updateScore(examType.paramName, event.currentTarget.value)}
									placeholder="점수 (필수 아님)"
									step={scoreStep(examType.paramName)}
									value={score}
								/>
							)}
						</CompoundListItemDetails>
					</CompoundListItem>
				);
			})}
		</CompoundList>
	);
}
