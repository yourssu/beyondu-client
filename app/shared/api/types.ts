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
	languageRequirementSummary?: string | null;
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
	programType: string;
	badge: string;
	hasReview: boolean;
	reviewReportUrl?: string | null;
	minGpa: number;
	websiteUrl?: string | null;
	significantNote?: string | null;
	remark?: string | null;
	languageRequirements: LanguageRequirementResponse[];
	availableMajors?: string[] | null;
	courseListUrl?: string | null;
	/** 파견 학생 수 (e.g. "5~10명") */
	studentCount?: string | null;
	location?: string | null;
}

export interface ExamTypeResponse {
	paramName: LanguageExamParamName;
	displayName: string;
	minScore: number;
	maxScore: number;
}

export interface NationsByRegionResponse {
	region: string;
	nations: string[];
}

export interface SubMajorResponse {
	enumName: string;
	name: string;
	koreanMajors: string[];
}

export interface MajorCategoryResponse {
	category: string;
	majors: SubMajorResponse[];
}

export type LanguageExamParamName =
	| "TOEFL_IBT"
	| "TOEFL_ITP"
	| "IELTS"
	| "TOEIC"
	| "TOEIC_Speaking"
	| "HSK"
	| "JLPT"
	| "JPT"
	| "DELF"
	| "ZD";

export type UniversitySearchParams = {
	/** 단일 국가 필터 (e.g. "일본") */
	nation?: string;
	isExchange?: boolean;
	isVisit?: boolean;
	gpa?: number;
	/** 복수 국가 필터 (e.g. ?nations=일본&nations=미국) */
	nations?: string[];
	/** 복수 대륙 필터 (e.g. ?regions=아시아&regions=유럽) */
	regions?: string[];
	/** 복수 언어권 필터 (e.g. ?languageGroups=ENGLISH&languageGroups=JAPANESE) */
	languageGroups?: string[];
	major?: string;
	/** 복수 전공 필터 (e.g. ?majors=COMPUTER_SCIENCE&majors=ACCOUNTING) */
	majors?: string[];
	hasReview?: boolean;
	page?: number;
	size?: number;
} & Partial<Record<LanguageExamParamName, number>>;
