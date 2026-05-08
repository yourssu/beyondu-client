import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";

import { serializeFilterParams } from "~/lib/filter-params";
import type {
	ApiResponse,
	ExamTypeResponse,
	MajorCategoryResponse,
	NationsByRegionResponse,
} from "~/shared/api/types";
import { CampusBackground } from "~/shared/components/campus-background";
import { Header } from "~/shared/components/header";
import { SearchFilterBarFull } from "~/shared/components/search/search-filter-bar-full";
import type { FilterFormData } from "~/shared/types/filter";

import type { Route } from "./+types/home";

export function meta(_args: Route.MetaArgs) {
	return [
		{ title: "Beyond U - 교환학생 준비 가이드" },
		{
			content: "내 정보를 입력하고 교환학생 지원 가능 학교를 확인해보세요.",
			name: "description",
		},
	];
}

export default function Home() {
	const navigate = useNavigate();

	const { data: nationsByRegionData, isLoading: nationsLoading } = useQuery({
		queryFn: async () => {
			const res = await fetch("/api/meta/nations-by-region");
			return res.json() as Promise<ApiResponse<NationsByRegionResponse[]>>;
		},
		queryKey: ["meta", "nationsByRegion"],
	});

	const { data: majorsData, isLoading: majorsLoading } = useQuery({
		queryFn: async () => {
			const res = await fetch("/api/meta/majors");
			return res.json() as Promise<ApiResponse<MajorCategoryResponse[]>>;
		},
		queryKey: ["meta", "majors"],
	});

	const { data: examTypesData } = useQuery({
		queryFn: async () => {
			const res = await fetch("/api/meta/exam-types");
			return res.json() as Promise<ApiResponse<ExamTypeResponse[]>>;
		},
		queryKey: ["meta", "examTypes"],
	});

	const [filters, setFilters] = useState<FilterFormData>({
		gpa: "",
		languageGroups: [],
		languageTests: [],
		majors: [],
		nations: [],
		regions: [],
		requireReview: false,
	});

	function handleSubmit(nextFilters = filters) {
		const params = serializeFilterParams(nextFilters);
		const query = params.toString();
		navigate(query ? `/search?${query}` : "/search", { viewTransition: true });
	}

	return (
		<div className="relative min-h-screen overflow-hidden">
			{/* Blurred campus background */}
			<CampusBackground />

			<div className="relative z-10">
				<Header />

				<main className="mx-auto flex max-w-5xl justify-center px-4 py-9">
					<SearchFilterBarFull
						examTypes={examTypesData?.result ?? []}
						filters={filters}
						majorCategories={majorsData?.result}
						majorsLoading={majorsLoading}
						nationsByRegion={nationsByRegionData?.result}
						nationsLoading={nationsLoading}
						onFiltersChange={setFilters}
						onSubmit={handleSubmit}
					/>
				</main>
			</div>
		</div>
	);
}
