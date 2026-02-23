import type { KyInstance } from "ky";
import type {
	ApiResponse,
	UniversityDetailResponse,
	UniversityListResponse,
	UniversitySearchParams,
} from "./types";

export async function getUniversities(
	client: KyInstance,
	params?: UniversitySearchParams,
): Promise<ApiResponse<UniversityListResponse>> {
	const searchParams = Object.fromEntries(
		Object.entries(params ?? {}).filter(([, v]) => v !== undefined),
	);
	return client
		.get("api/v1/universities", { searchParams })
		.json<ApiResponse<UniversityListResponse>>();
}

export async function getUniversityDetail(
	client: KyInstance,
	id: number,
): Promise<ApiResponse<UniversityDetailResponse>> {
	return client
		.get(`api/v1/universities/${id}`)
		.json<ApiResponse<UniversityDetailResponse>>();
}
