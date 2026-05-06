import type { KyInstance } from "ky";

import type {
	ApiResponse,
	ExamTypeResponse,
	MajorCategoryResponse,
	NationsByRegionResponse,
} from "./types";

export async function getNations(client: KyInstance): Promise<ApiResponse<string[]>> {
	return client.get("api/v1/meta/nations").json<ApiResponse<string[]>>();
}

export async function getNationsByRegion(
	client: KyInstance,
): Promise<ApiResponse<NationsByRegionResponse[]>> {
	return client.get("api/v2/meta/nations").json<ApiResponse<NationsByRegionResponse[]>>();
}

export async function getRegions(client: KyInstance): Promise<ApiResponse<string[]>> {
	return client.get("api/v1/meta/regions").json<ApiResponse<string[]>>();
}

export async function getMajors(client: KyInstance): Promise<ApiResponse<MajorCategoryResponse[]>> {
	return client.get("api/v1/meta/majors").json<ApiResponse<MajorCategoryResponse[]>>();
}

export async function getLanguageGroups(client: KyInstance): Promise<ApiResponse<string[]>> {
	return client.get("api/v1/meta/language-groups").json<ApiResponse<string[]>>();
}

export async function getExamTypes(client: KyInstance): Promise<ApiResponse<ExamTypeResponse[]>> {
	return client.get("api/v1/meta/exam-types").json<ApiResponse<ExamTypeResponse[]>>();
}
