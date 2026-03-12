import type { KyInstance } from "ky";

import type { ApiResponse, ExamTypeResponse } from "./types";

export async function getNations(client: KyInstance): Promise<ApiResponse<string[]>> {
	return client.get("api/v1/meta/nations").json<ApiResponse<string[]>>();
}

export async function getExamTypes(client: KyInstance): Promise<ApiResponse<ExamTypeResponse[]>> {
	return client.get("api/v1/meta/exam-types").json<ApiResponse<ExamTypeResponse[]>>();
}
