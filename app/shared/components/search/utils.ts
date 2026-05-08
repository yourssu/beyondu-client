import type { ExamTypeResponse, LanguageExamParamName } from "~/shared/api/types";
import type { LanguageTestFilter } from "~/shared/types/filter";

export function normalizeValue(value: string) {
	return value.trim().toLowerCase();
}

export function removeString(values: string[], value: string) {
	return values.filter((item) => normalizeValue(item) !== normalizeValue(value));
}

export function upsertLanguageTest(
	tests: LanguageTestFilter[],
	examType: LanguageExamParamName,
	score: string,
) {
	return [...tests.filter((test) => test.examType !== examType), { examType, score: score.trim() }];
}

export function examLabel(examTypes: ExamTypeResponse[], examType: LanguageExamParamName) {
	return examTypes.find((item) => item.paramName === examType)?.displayName ?? examType;
}

export function selectTriggerLabel(
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
