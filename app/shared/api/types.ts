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
	/** 파견 학생 수 (e.g. "5~10명") */
	studentCount: string | null;
}

export interface UniversitySearchParams {
	/** 단일 국가 필터 (e.g. "일본") */
	nation?: string;
	isExchange?: boolean;
	isVisit?: boolean;
	search?: string;
	gpa?: number;
	/** 복수 국가 필터, 쉼표 구분 (e.g. "일본,미국") */
	nations?: string;
	major?: string;
	hasReview?: boolean;
	page?: number;
	size?: number;
}
