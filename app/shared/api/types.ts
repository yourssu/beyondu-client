export interface ApiResponse<T> {
	code: string;
	message: string;
	result: T;
}

export interface PageInfo {
	currentPage: number;
	totalElements: number;
	totalPages: number;
	isLast: boolean;
}

export interface UniversitySummaryDto {
	id: number;
	nameKor: string;
	nameEng: string;
	nation: string;
	badge: string;
	isExchange: boolean;
	isVisit: boolean;
	programType: string;
	languageRequirementSummary: string | null;
	reviewStatus: string;
}

export interface UniversityListResponse {
	universities: UniversitySummaryDto[];
	pageInfo: PageInfo;
}

export interface LanguageRequirementResponse {
	languageGroup: string;
	examType: string;
	minScore: number;
}

export interface UniversityDetailResponse {
	id: number;
	nameKor: string;
	nameEng: string;
	nation: string;
	region: string;
	isExchange: boolean;
	isVisit: boolean;
	badge: string;
	hasReview: boolean;
	minGpa: number;
	websiteUrl: string | null;
	significantNote: string | null;
	remark: string | null;
	languageRequirements: LanguageRequirementResponse[];
	availableMajors: string[] | null;
	courseListUrl: string | null;
	studentCount: string | null;
}

export interface UniversitySearchParams {
	nation?: string;
	isExchange?: boolean;
	isVisit?: boolean;
	search?: string;
	gpa?: number;
	nations?: string;
	major?: string;
	hasReview?: boolean;
	page?: number;
	size?: number;
}
