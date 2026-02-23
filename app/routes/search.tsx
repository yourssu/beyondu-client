import { useState } from "react";
import { useSearchParams } from "react-router";

import type { FilterFormData } from "~/frames/main-frame";
import type { UniversityResult } from "~/frames/search-frame";
import { SearchFrame } from "~/frames/search-frame";

import type { Route } from "./+types/search";

export function meta(_args: Route.MetaArgs) {
	return [
		{ title: "검색 결과 - Beyond U" },
		{
			content: "교환학생 지원 가능 학교 검색 결과",
			name: "description",
		},
	];
}

const mockResults: UniversityResult[] = [
	{
		country: "미국, Oklahoma",
		exchangeType: "일반교환",
		hasReview: true,
		id: "1",
		languageRequirements: [
			{ name: "TOEFL", score: "79" },
			{ name: "IELTS", score: "6.5" },
		],
		nameEn: "University of Oklahoma",
		nameKr: "오클라호마 대학교",
		program: "학부",
		reviewYears: "2023-2024",
	},
	{
		country: "호주, Sydney",
		exchangeType: "일반교환",
		hasReview: true,
		id: "2",
		languageRequirements: [
			{ name: "IELTS", score: "6.5" },
			{ name: "TOEFL", score: "85" },
		],
		nameEn: "University of Sydney",
		nameKr: "시드니 대학교",
		reviewYears: "2022-2023",
	},
	{
		country: "일본, Tokyo",
		exchangeType: "교환학생",
		hasReview: false,
		id: "3",
		languageRequirements: [{ name: "JLPT", score: "N2" }],
		nameEn: "University of Tokyo",
		nameKr: "도쿄 대학교",
		program: "대학원",
	},
	{
		country: "독일, Berlin",
		exchangeType: "일반교환",
		hasReview: true,
		id: "4",
		languageRequirements: [{ name: "IELTS", score: "6.0" }],
		nameEn: "Freie Universität Berlin",
		nameKr: "베를린 자유대학교",
		reviewYears: "2023",
	},
	{
		country: "영국, London",
		exchangeType: "일반교환",
		hasReview: true,
		id: "5",
		languageRequirements: [
			{ name: "IELTS", score: "7.0" },
			{ name: "TOEFL", score: "100" },
		],
		nameEn: "King's College London",
		nameKr: "킹스칼리지 런던",
		program: "학부",
		reviewYears: "2024",
	},
];

export default function Search() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [filters, setFilters] = useState<FilterFormData>({
		country: searchParams.get("country") ?? "",
		gpa: searchParams.get("gpa") ?? "",
		languageCert: searchParams.get("languageCert") ?? "",
		major: searchParams.get("major") ?? "",
		requireReview: searchParams.get("requireReview") === "true",
		score: searchParams.get("score") ?? "",
	});

	function handleSearch() {
		const params = new URLSearchParams();
		if (filters.major) params.set("major", filters.major);
		if (filters.gpa) params.set("gpa", filters.gpa);
		if (filters.languageCert) params.set("languageCert", filters.languageCert);
		if (filters.score) params.set("score", filters.score);
		if (filters.country) params.set("country", filters.country);
		if (filters.requireReview) params.set("requireReview", "true");
		setSearchParams(params);
	}

	return (
		<SearchFrame
			filters={filters}
			onFiltersChange={setFilters}
			onSearch={handleSearch}
			resultCount={mockResults.length}
			results={mockResults}
		/>
	);
}
