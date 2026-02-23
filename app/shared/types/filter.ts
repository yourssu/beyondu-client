export interface FilterFormData {
	major: string;
	gpa: string;
	languageCert: string;
	score: string;
	country: string;
	requireReview: boolean;
}

export const languageCertOptions = [
	{ label: "없음", value: "없음" },
	{ label: "TOEFL", value: "TOEFL" },
	{ label: "IELTS", value: "IELTS" },
	{ label: "TOEIC", value: "TOEIC" },
	{ label: "기타", value: "기타" },
];
