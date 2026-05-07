import type { LanguageExamParamName } from "~/shared/api/types";

export interface LanguageTestFilter {
	examType: LanguageExamParamName;
	score: string;
}

export interface FilterFormData {
	gpa: string;
	languageGroups: string[];
	languageTests: LanguageTestFilter[];
	majors: string[];
	nations: string[];
	regions: string[];
	requireReview: boolean;
}
