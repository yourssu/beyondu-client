import type { LanguageExamParamName, UniversitySearchParams } from "~/shared/api/types";
import type { FilterFormData } from "~/shared/types/filter";

const LANGUAGE_EXAM_PARAM_NAMES = [
	"TOEFL_IBT",
	"TOEFL_ITP",
	"IELTS",
	"TOEIC",
	"TOEIC_Speaking",
	"HSK",
	"JLPT",
	"JPT",
	"DELF",
	"ZD",
] as const satisfies readonly LanguageExamParamName[];

function isLanguageExamParamName(value: string): value is LanguageExamParamName {
	return LANGUAGE_EXAM_PARAM_NAMES.includes(value as LanguageExamParamName);
}

export function serializeFilterParams(filters: FilterFormData): URLSearchParams {
	const params = new URLSearchParams();
	if (filters.major) params.set("major", filters.major);
	if (filters.gpa) params.set("gpa", filters.gpa);
	if (filters.languageCert && filters.languageCert !== "NONE")
		params.set("languageCert", filters.languageCert);
	if (filters.languageCert && filters.languageCert !== "NONE" && filters.score)
		params.set("score", filters.score);
	if (filters.country) params.set("country", filters.country);
	if (filters.requireReview) params.set("requireReview", "true");
	return params;
}

export function deserializeFilterParams(params: URLSearchParams): FilterFormData {
	return {
		country: params.get("country") ?? "",
		gpa: params.get("gpa") ?? "",
		languageCert: params.get("languageCert") ?? "NONE",
		major: params.get("major") ?? "",
		requireReview: params.get("requireReview") === "true",
		score: params.get("score") ?? "",
	};
}

export function toSearchApiParams(filters: FilterFormData): UniversitySearchParams {
	const params: UniversitySearchParams = {
		...(filters.major && { major: filters.major }),
		...(filters.gpa !== "" && { gpa: Number(filters.gpa) }),
		...(filters.country && { nation: filters.country }),
		...(filters.requireReview && { hasReview: true }),
	};

	const languageScore = Number(filters.score);
	if (
		isLanguageExamParamName(filters.languageCert) &&
		filters.score !== "" &&
		Number.isFinite(languageScore)
	) {
		params[filters.languageCert] = languageScore;
	}

	return params;
}
