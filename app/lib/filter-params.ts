import type {
	LanguageExamParamName,
	MajorCategoryResponse,
	NationsByRegionResponse,
	UniversitySearchParams,
} from "~/shared/api/types";
import type { FilterFormData, LanguageTestFilter } from "~/shared/types/filter";

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

function normalizeStringList(values: string[]) {
	const seen = new Set<string>();
	const normalized: string[] = [];

	for (const value of values) {
		const trimmed = value.trim();
		const key = normalizeFilterValue(trimmed);
		if (!trimmed || seen.has(key)) continue;

		seen.add(key);
		normalized.push(trimmed);
	}

	return normalized;
}

function normalizeLanguageTests(languageTests: LanguageTestFilter[]) {
	const tests = new Map<LanguageExamParamName, LanguageTestFilter>();

	for (const test of languageTests) {
		const score = test.score.trim();
		tests.set(test.examType, { examType: test.examType, score });
	}

	return Array.from(tests.values());
}

export function normalizeFilterFormData(filters: FilterFormData): FilterFormData {
	return {
		gpa: filters.gpa.trim(),
		languageGroups: normalizeStringList(filters.languageGroups),
		languageTests: normalizeLanguageTests(filters.languageTests),
		majors: normalizeStringList(filters.majors),
		nations: normalizeStringList(filters.nations),
		regions: normalizeStringList(filters.regions),
		requireReview: filters.requireReview,
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

export function findMajorParamNames(
	majorCategories: MajorCategoryResponse[] | undefined,
	majorValues: string[],
): string[] {
	const params: string[] = [];

	for (const majorValue of majorValues) {
		const selectedMajor = normalizeFilterValue(majorValue);
		for (const category of majorCategories ?? []) {
			const found = category.majors.find((major) => {
				const aliases = [major.enumName, major.name, ...major.koreanMajors];
				return aliases.some((alias) => normalizeFilterValue(alias) === selectedMajor);
			});

			if (found) {
				params.push(found.enumName);
				break;
			}
		}
	}

	return normalizeStringList(params);
}

export function serializeFilterParams(filters: FilterFormData): URLSearchParams {
	const normalizedFilters = normalizeFilterFormData(filters);
	const params = new URLSearchParams();

	for (const nation of normalizedFilters.nations) params.append("nations", nation);
	for (const region of normalizedFilters.regions) params.append("regions", region);
	for (const languageGroup of normalizedFilters.languageGroups) {
		params.append("languageGroups", languageGroup);
	}
	for (const major of normalizedFilters.majors) params.append("majors", major);
	for (const test of normalizedFilters.languageTests) {
		params.append("languageTests", test.score ? `${test.examType}:${test.score}` : test.examType);
	}
	if (normalizedFilters.gpa) params.set("gpa", normalizedFilters.gpa);
	if (normalizedFilters.requireReview) params.set("requireReview", "true");

	return params;
}

function deserializeLanguageTests(params: URLSearchParams): LanguageTestFilter[] {
	const languageTests = params.getAll("languageTests").flatMap((value) => {
		const [examType, score = ""] = value.split(":");
		return isLanguageExamParamName(examType) ? [{ examType, score }] : [];
	});

	const legacyLanguageCert = params.get("languageCert");
	if (legacyLanguageCert && isLanguageExamParamName(legacyLanguageCert)) {
		languageTests.push({ examType: legacyLanguageCert, score: params.get("score") ?? "" });
	}

	for (const examType of LANGUAGE_EXAM_PARAM_NAMES) {
		const score = params.get(examType);
		if (score !== null) languageTests.push({ examType, score });
	}

	return languageTests;
}

export function deserializeFilterParams(params: URLSearchParams): FilterFormData {
	return normalizeFilterFormData({
		gpa: params.get("gpa") ?? "",
		languageGroups: params.getAll("languageGroups"),
		languageTests: deserializeLanguageTests(params),
		majors: [
			...params.getAll("majors"),
			...(params.get("major") ? [params.get("major") ?? ""] : []),
		],
		nations: [
			...params.getAll("nations"),
			...(params.get("nation") ? [params.get("nation") ?? ""] : []),
			...(params.get("country") ? [params.get("country") ?? ""] : []),
		],
		regions: params.getAll("regions"),
		requireReview: params.get("requireReview") === "true",
	});
}

export function toSearchApiParams(
	filters: FilterFormData,
	options?: { majorParamNames?: string[] },
): UniversitySearchParams {
	const normalizedFilters = normalizeFilterFormData(filters);
	const gpa = Number(normalizedFilters.gpa);
	const params: UniversitySearchParams = {
		...(normalizedFilters.nations.length > 0 && { nations: normalizedFilters.nations }),
		...(normalizedFilters.regions.length > 0 && { regions: normalizedFilters.regions }),
		...(normalizedFilters.languageGroups.length > 0 && {
			languageGroups: normalizedFilters.languageGroups,
		}),
		...(options?.majorParamNames && options.majorParamNames.length > 0
			? { majors: options.majorParamNames }
			: normalizedFilters.majors.length > 0 && { majors: normalizedFilters.majors }),
		...(normalizedFilters.gpa !== "" && Number.isFinite(gpa) && { gpa }),
		...(normalizedFilters.requireReview && { hasReview: true }),
	};

	for (const test of normalizedFilters.languageTests) {
		const languageScore = Number(test.score);
		if (test.score !== "" && Number.isFinite(languageScore)) {
			params[test.examType] = languageScore;
		}
	}

	return params;
}
