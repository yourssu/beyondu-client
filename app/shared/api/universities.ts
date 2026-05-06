import type { KyInstance } from "ky";

import type {
	ApiResponse,
	UniversityDetailResponse,
	UniversityListResponse,
	UniversitySearchParams,
} from "./types";

function compactSearchParams(params?: UniversitySearchParams): URLSearchParams {
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(params ?? {})) {
		if (value === undefined) {
			continue;
		}

		if (Array.isArray(value)) {
			for (const item of value) {
				searchParams.append(key, item);
			}
		} else {
			searchParams.append(key, String(value));
		}
	}

	return searchParams;
}

export async function getUniversities(
	client: KyInstance,
	params?: UniversitySearchParams,
): Promise<ApiResponse<UniversityListResponse>> {
	const searchParams = compactSearchParams(params);

	return client
		.get("api/v1/universities", { searchParams })
		.json<ApiResponse<UniversityListResponse>>();
}

export async function getUniversityDetail(
	client: KyInstance,
	id: number,
): Promise<ApiResponse<UniversityDetailResponse>> {
	return client.get(`api/v1/universities/${id}`).json<ApiResponse<UniversityDetailResponse>>();
}
