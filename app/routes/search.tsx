import { useState } from "react";
import { useSearchParams } from "react-router";

import { BackButton } from "~/shared/components/back-button";
import { CampusBackground } from "~/shared/components/campus-background";
import { Header } from "~/shared/components/header";
import { SearchFilterBar } from "~/shared/components/search-filter-bar";
import { UniversityCard } from "~/shared/components/university-card";
import countries from "~/shared/constants/countries.json";
import languageCertificates from "~/shared/constants/language-certificates.json";
import majors from "~/shared/constants/majors.json";
import type { FilterFormData } from "~/shared/types/filter";

import type { Route } from "./+types/search";

export interface UniversityResult {
	id: string;
	country: string;
	exchangeType: string;
	program?: string;
	nameEn: string;
	nameKr: string;
	languageRequirements: { name: string; score: string }[];
	hasReview: boolean;
	reviewYears?: string;
}

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
		<div className="relative min-h-screen">
			{/* Blurred campus background */}
			<CampusBackground />

			<div className="relative z-10">
				<Header />

				<div className="border-base-700 border-b bg-surface-glass">
					<div className="mx-auto max-w-5xl px-8 pt-8 pb-5">
						<BackButton href="/" />
					</div>
				</div>

				<main className="bg-surface-glass">
					<div className="mx-auto max-w-5xl px-8 py-10">
						{/* Search filter bar */}
						<div className="border-primary-green border-b pb-5">
							<h2 className="mb-10 text-base-900 text-style-heading-lg">
								내 정보를 입력하고 갈 수 있는 학교를 확인해보세요!
							</h2>
							<SearchFilterBar
								country={filters.country}
								countrySuggestions={countries}
								gpa={filters.gpa}
								languageCert={filters.languageCert}
								languageCertOptions={languageCertificates}
								major={filters.major}
								majorSuggestions={majors}
								onCountryChange={(v) => setFilters({ ...filters, country: v })}
								onGpaChange={(v) => setFilters({ ...filters, gpa: v })}
								onLanguageCertChange={(v) => setFilters({ ...filters, languageCert: v })}
								onMajorChange={(v) => setFilters({ ...filters, major: v })}
								onRequireReviewChange={(v) => setFilters({ ...filters, requireReview: v })}
								onScoreChange={(v) => setFilters({ ...filters, score: v })}
								onSubmit={handleSearch}
								requireReview={filters.requireReview}
								score={filters.score}
							/>
						</div>

						{/* Result summary */}
						<p className="mt-8 text-base-700 text-style-body">
							[{" "}
							<span className="text-style-body-bold">
								{[
									filters.major,
									filters.gpa ? `${filters.gpa}점` : "",
									filters.languageCert && filters.score
										? `${filters.languageCert} ${filters.score}점`
										: "",
									filters.country,
									filters.requireReview ? "후기 보고서 필수" : "",
								]
									.filter(Boolean)
									.join(" / ")}
							</span>{" "}
							] 의 조건으로 분석한{" "}
							<span className="text-style-body-bold">{mockResults.length}개</span>의 학교입니다.
						</p>

						{/* University cards grid */}
						<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{mockResults.map((university) => (
								<UniversityCard key={university.id} {...university} />
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
