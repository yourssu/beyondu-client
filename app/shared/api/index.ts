export { createApiClient } from "./client";
export {
	getExamTypes,
	getLanguageGroups,
	getMajors,
	getNations,
	getNationsByRegion,
	getRegions,
} from "./meta";
export type {
	ApiResponse,
	ExamTypeResponse,
	LanguageExamParamName,
	LanguageRequirementResponse,
	MajorCategoryResponse,
	NationsByRegionResponse,
	PageInfo,
	SubMajorResponse,
	UniversityDetailResponse,
	UniversityListResponse,
	UniversitySearchParams,
	UniversitySummaryDto,
} from "./types";
export { getUniversities, getUniversityDetail } from "./universities";
