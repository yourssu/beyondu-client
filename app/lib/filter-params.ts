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

export function normalizeFilterFormData(filters: FilterFormData): FilterFormData {
	const languageCert = filters.languageCert;

	return {
		country: filters.country.trim(),
		gpa: filters.gpa.trim(),
		languageCert,
		major: filters.major.trim(),
		requireReview: filters.requireReview,
		score: languageCert === "NONE" ? "" : filters.score.trim(),
	};
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
	const normalizedFilters = normalizeFilterFormData(filters);
	const params = new URLSearchParams();
	if (normalizedFilters.major) params.set("major", normalizedFilters.major);
	if (normalizedFilters.gpa) params.set("gpa", normalizedFilters.gpa);
	if (normalizedFilters.languageCert && normalizedFilters.languageCert !== "NONE")
		params.set("languageCert", normalizedFilters.languageCert);
	if (
		normalizedFilters.languageCert &&
		normalizedFilters.languageCert !== "NONE" &&
		normalizedFilters.score
	)
		params.set("score", normalizedFilters.score);
	if (normalizedFilters.country) params.set("country", normalizedFilters.country);
	if (normalizedFilters.requireReview) params.set("requireReview", "true");
	return params;
}

export function deserializeFilterParams(params: URLSearchParams): FilterFormData {
	return normalizeFilterFormData({
		country: params.get("country") ?? "",
		gpa: params.get("gpa") ?? "",
		languageCert: params.get("languageCert") ?? "NONE",
		major: params.get("major") ?? "",
		requireReview: params.get("requireReview") === "true",
		score: params.get("score") ?? "",
	});
}

export function toSearchApiParams(
	filters: FilterFormData,
	options?: SearchApiParamsOptions,
): UniversitySearchParams {
	const normalizedFilters = normalizeFilterFormData(filters);
	const gpa = Number(normalizedFilters.gpa);
	const params: UniversitySearchParams = {
		...(normalizedFilters.major &&
			(options?.majorParamName
				? { majors: [options.majorParamName] }
				: { major: normalizedFilters.major })),
		...(normalizedFilters.gpa !== "" && Number.isFinite(gpa) && { gpa }),
		...(normalizedFilters.country && { nations: [normalizedFilters.country] }),
		...(normalizedFilters.requireReview && { hasReview: true }),
	};

	const languageScore = Number(normalizedFilters.score);
	if (
		isLanguageExamParamName(normalizedFilters.languageCert) &&
		normalizedFilters.score !== "" &&
		Number.isFinite(languageScore)
	) {
		params[normalizedFilters.languageCert] = languageScore;
	}

	return params;
}
