import type { UniversitySearchParams } from "~/shared/api/types";
import type { FilterFormData } from "~/shared/types/filter";

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
	return {
		...(filters.major && { major: filters.major }),
		...(filters.gpa !== "" && { gpa: Number(filters.gpa) }),
		...(filters.country && { nation: filters.country }),
		...(filters.requireReview && { hasReview: true }),
	};
}
