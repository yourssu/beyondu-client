import type {
	LanguageExamParamName,
	MajorCategoryResponse,
	NationsByRegionResponse,
	UniversitySearchParams,
} from "~/shared/api/types";
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

function normalizeFilterValue(value: string) {
	return value.trim().toLowerCase();
}

export function flattenMajorNames(majorCategories?: MajorCategoryResponse[]): string[] {
	return Array.from(
		new Set(
			majorCategories?.flatMap((category) => category.majors.map((major) => major.name)) ?? [],
		),
	);
}

export function flattenNationsByRegion(nationsByRegion?: NationsByRegionResponse[]): string[] {
	return Array.from(new Set(nationsByRegion?.flatMap((group) => group.nations) ?? []));
}

export function findMajorParamName(
	majorCategories: MajorCategoryResponse[] | undefined,
	majorValue: string,
): string | undefined {
	const selectedMajor = normalizeFilterValue(majorValue);

	for (const category of majorCategories ?? []) {
		for (const major of category.majors) {
			const aliases = [major.enumName, major.name, ...major.koreanMajors];
			if (aliases.some((alias) => normalizeFilterValue(alias) === selectedMajor)) {
				return major.enumName;
			}
		}
	}
}

interface SearchApiParamsOptions {
	majorParamName?: string;
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

export function toSearchApiParams(
	filters: FilterFormData,
	options?: SearchApiParamsOptions,
): UniversitySearchParams {
	const major = filters.major.trim();
	const country = filters.country.trim();
	const gpa = Number(filters.gpa);
	const params: UniversitySearchParams = {
		...(major && (options?.majorParamName ? { majors: [options.majorParamName] } : { major })),
		...(filters.gpa !== "" && Number.isFinite(gpa) && { gpa }),
		...(country && { nations: [country] }),
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
