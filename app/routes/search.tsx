import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "react-router";

import {
	deserializeFilterParams,
	serializeFilterParams,
	toSearchApiParams,
} from "~/lib/filter-params";
import { createApiClient, getUniversities } from "~/shared/api";
import type { ApiResponse, ExamTypeResponse } from "~/shared/api/types";
import { BackButton } from "~/shared/components/back-button";
import { CampusBackground } from "~/shared/components/campus-background";
import { Header } from "~/shared/components/header";
import { RouteErrorFallback } from "~/shared/components/route-error-fallback";
import { SearchFilterBar } from "~/shared/components/search-filter-bar";
import { UniversityCard } from "~/shared/components/university-card";
import type { FilterFormData } from "~/shared/types/filter";
import { Card } from "~/shared/ui/primitives/card";
import { Pagination } from "~/shared/ui/primitives/pagination";

import type { Route } from "./+types/search";

const PAGE_SIZE = 12;

export function meta(_args: Route.MetaArgs) {
	return [
		{ title: "검색 결과 - Beyond U" },
		{
			content: "교환학생 지원 가능 학교 검색 결과",
			name: "description",
		},
	];
}

export async function loader({ request, context }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const filters = deserializeFilterParams(url.searchParams);
	const apiParams = toSearchApiParams(filters);

	const page = Math.max(1, Number(url.searchParams.get("page") ?? "1"));

	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getUniversities(client, {
		...apiParams,
		page: page - 1,
		size: PAGE_SIZE,
	});

	return {
		filters,
		pageInfo: response.result.pageInfo,
		universities: response.result.universities,
	};
}

export function HydrateFallback() {
	return (
		<div className="relative min-h-screen overflow-hidden">
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
						<div className="border-primary-green border-b pb-5">
							<div className="mb-10 h-8 w-3/4 animate-pulse rounded bg-base-300" />
							<div className="h-12 animate-pulse rounded bg-base-300" />
						</div>
						<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{Array.from({ length: 6 }).map((_, i) => (
								// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
								<SkeletonCard key={i} />
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

function SkeletonCard() {
	return (
		<Card className="flex flex-col gap-3 p-5">
			<div className="flex items-center justify-between">
				<div className="h-4 w-16 animate-pulse rounded bg-base-300" />
				<div className="flex gap-2">
					<div className="h-5 w-12 animate-pulse rounded bg-base-300" />
					<div className="h-5 w-12 animate-pulse rounded bg-base-300" />
				</div>
			</div>
			<div className="flex flex-col gap-1">
				<div className="h-5 w-3/4 animate-pulse rounded bg-base-300" />
				<div className="h-4 w-1/2 animate-pulse rounded bg-base-300" />
			</div>
			<div className="h-4 w-2/3 animate-pulse rounded bg-base-300" />
			<div className="h-5 w-16 animate-pulse rounded bg-base-300" />
		</Card>
	);
}

export default function Search({ loaderData }: Route.ComponentProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useState<FilterFormData>(loaderData.filters);

	const { universities, pageInfo } = loaderData;
	const currentPage = pageInfo.currentPage + 1;

	const { data: nationsData } = useQuery({
		queryFn: async () => {
			const res = await fetch("/api/meta/nations");
			return res.json() as Promise<ApiResponse<string[]>>;
		},
		queryKey: ["meta", "nations"],
	});

	const { data: examTypesData } = useQuery({
		queryFn: async () => {
			const res = await fetch("/api/meta/exam-types");
			return res.json() as Promise<ApiResponse<ExamTypeResponse[]>>;
		},
		queryKey: ["meta", "examTypes"],
	});

	function handleSearch() {
		const params = serializeFilterParams(filters);
		params.delete("page");
		setSearchParams(params);
	}

	function pageHref(page: number) {
		const params = new URLSearchParams(searchParams);
		if (page <= 1) {
			params.delete("page");
		} else {
			params.set("page", String(page));
		}
		const qs = params.toString();
		return qs ? `?${qs}` : "?";
	}

	return (
		<div className="relative min-h-screen overflow-hidden">
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
								examTypes={examTypesData?.result ?? []}
								filters={filters}
								nations={nationsData?.result ?? []}
								onFiltersChange={setFilters}
								onSubmit={handleSearch}
							/>
						</div>

						{/* Result summary */}
						<p className="mt-8 text-base-700 text-style-body">
							[{" "}
							<span className="text-style-body-bold">
								{[
									loaderData.filters.major,
									loaderData.filters.gpa ? `${loaderData.filters.gpa}점` : "",
									loaderData.filters.languageCert &&
									loaderData.filters.languageCert !== "NONE" &&
									loaderData.filters.score
										? `${loaderData.filters.languageCert} ${loaderData.filters.score}점`
										: "",
									loaderData.filters.country,
									loaderData.filters.requireReview ? "후기 보고서 필수" : "",
								]
									.filter(Boolean)
									.join(" / ")}
							</span>{" "}
							] 의 조건으로 분석한{" "}
							<span className="text-style-body-bold">{pageInfo.totalElements}개</span>의 학교입니다.
						</p>

						{/* University cards grid */}
						<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{universities.length > 0 ? (
								universities.map((university, index) => (
									<div
										className="h-full animate-card-stagger-in"
										key={university.id}
										style={{
											animationDelay: `calc(${index % PAGE_SIZE} * var(--delay-card-stagger))`,
											animationTimingFunction: "var(--ease-spring-bouncy)",
										}}
									>
										<UniversityCard {...university} />
									</div>
								))
							) : (
								<div className="col-span-full flex flex-col items-center justify-center gap-4 py-20">
									<SearchIcon className="size-12 text-base-400" />
									<p className="text-base-700 text-style-body">조건에 맞는 학교가 없습니다</p>
								</div>
							)}
						</div>

						{/* Pagination */}
						<Pagination
							buildHref={pageHref}
							className="mt-10"
							currentPage={currentPage}
							totalPages={pageInfo.totalPages}
						/>
					</div>
				</main>
			</div>
		</div>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	return <RouteErrorFallback error={error} />;
}
