import type { FilterFormData } from "~/shared/types/filter";

export function serializeFilterParams(filters: FilterFormData): URLSearchParams {
	const params = new URLSearchParams();
	if (filters.major) params.set("major", filters.major);
	if (filters.gpa) params.set("gpa", filters.gpa);
	if (filters.languageCert && filters.languageCert !== "NONE")
		params.set("languageCert", filters.languageCert);
	if (filters.languageCert !== "NONE" && filters.score) params.set("score", filters.score);
	if (filters.country) params.set("country", filters.country);
	if (filters.requireReview) params.set("requireReview", "true");
	return params;
}
