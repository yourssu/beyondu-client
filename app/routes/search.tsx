import { useState } from "react";
import { useSearchParams } from "react-router";

import { deserializeFilterParams, serializeFilterParams } from "~/lib/filter-params";
import type { UniversitySummaryDto } from "~/shared/api/types";
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

export function meta(_args: Route.MetaArgs) {
	return [
		{ title: "검색 결과 - Beyond U" },
		{
			content: "교환학생 지원 가능 학교 검색 결과",
			name: "description",
		},
	];
}

const mockResults: UniversitySummaryDto[] = [
	{
		badge: "일반교환",
		id: 1,
		isExchange: true,
		isVisit: false,
		languageRequirementSummary: "TOEFL 79 / IELTS 6.5",
		nameEng: "University of Oklahoma",
		nameKor: "오클라호마 대학교",
		nation: "미국",
		programType: "학부",
		reviewStatus: "있음",
	},
	{
		badge: "일반교환",
		id: 2,
		isExchange: true,
		isVisit: false,
		languageRequirementSummary: "IELTS 6.5 / TOEFL 85",
		nameEng: "University of Sydney",
		nameKor: "시드니 대학교",
		nation: "호주",
		programType: "",
		reviewStatus: "있음",
	},
	{
		badge: "교환학생",
		id: 3,
		isExchange: true,
		isVisit: false,
		languageRequirementSummary: "JLPT N2",
		nameEng: "University of Tokyo",
		nameKor: "도쿄 대학교",
		nation: "일본",
		programType: "대학원",
		reviewStatus: "없음",
	},
	{
		badge: "일반교환",
		id: 4,
		isExchange: true,
		isVisit: false,
		languageRequirementSummary: "IELTS 6.0",
		nameEng: "Freie Universität Berlin",
		nameKor: "베를린 자유대학교",
		nation: "독일",
		programType: "",
		reviewStatus: "있음",
	},
	{
		badge: "일반교환",
		id: 5,
		isExchange: true,
		isVisit: false,
		languageRequirementSummary: "IELTS 7.0 / TOEFL 100",
		nameEng: "King's College London",
		nameKor: "킹스칼리지 런던",
		nation: "영국",
		programType: "학부",
		reviewStatus: "있음",
	},
];

export default function Search() {
	const [searchParams, setSearchParams] = useSearchParams();

	const [filters, setFilters] = useState<FilterFormData>(() =>
		deserializeFilterParams(searchParams),
	);

	function handleSearch() {
		setSearchParams(serializeFilterParams(filters));
	}

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Blurred campus background */}
			<CampusBackground />

			<div className="relative z-10">
				<Header className="border-base-700 border-b" />

				<div className="bg-surface-glass">
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
								onCountryChange={(v) => setFilters((prev) => ({ ...prev, country: v }))}
								onGpaChange={(v) => setFilters((prev) => ({ ...prev, gpa: v }))}
								onLanguageCertChange={(v) => setFilters((prev) => ({ ...prev, languageCert: v }))}
								onMajorChange={(v) => setFilters((prev) => ({ ...prev, major: v }))}
								onRequireReviewChange={(v) => setFilters((prev) => ({ ...prev, requireReview: v }))}
								onScoreChange={(v) => setFilters((prev) => ({ ...prev, score: v }))}
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
									filters.languageCert && filters.languageCert !== "NONE" && filters.score
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
