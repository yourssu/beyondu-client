import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2, Search as SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";

import { cn } from "~/lib/cn";
import {
	deserializeFilterParams,
	serializeFilterParams,
	toSearchApiParams,
} from "~/lib/filter-params";
import type { ApiResponse, UniversityListResponse } from "~/shared/api/types";
import { BackButton } from "~/shared/components/back-button";
import { CampusBackground } from "~/shared/components/campus-background";
import { Header } from "~/shared/components/header";
import { RouteErrorFallback } from "~/shared/components/route-error-fallback";
import { SearchFilterBar } from "~/shared/components/search-filter-bar";
import { UniversityCard } from "~/shared/components/university-card";
import type { FilterFormData } from "~/shared/types/filter";
import { Card } from "~/shared/ui/primitives/card";

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

export async function clientLoader({ request }: Route.ClientLoaderArgs) {
	const url = new URL(request.url);
	const filters = deserializeFilterParams(url.searchParams);
	return { filters };
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

async function fetchUniversities(
	filters: FilterFormData,
	page: number,
): Promise<ApiResponse<UniversityListResponse>> {
	const apiParams = toSearchApiParams(filters);
	const searchParams = new URLSearchParams();

	for (const [key, value] of Object.entries(apiParams)) {
		if (value !== undefined) searchParams.set(key, String(value));
	}
	searchParams.set("page", String(page));
	searchParams.set("size", String(PAGE_SIZE));

	const response = await fetch(`/api/universities?${searchParams}`);
	if (!response.ok) throw new Error("대학 목록을 불러올 수 없습니다.");
	return response.json();
}

export default function Search({ loaderData }: Route.ComponentProps) {
	const [, setSearchParams] = useSearchParams();
	const [filters, setFilters] = useState<FilterFormData>(loaderData.filters);
	const sentinelRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFilters(loaderData.filters);
	}, [loaderData.filters]);

	const apiParams = toSearchApiParams(loaderData.filters);

	const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteQuery({
		getNextPageParam: (lastPage) => {
			const { currentPage, isLast } = lastPage.result.pageInfo;
			return isLast ? undefined : currentPage + 1;
		},
		initialPageParam: 0,
		queryFn: ({ pageParam }) => fetchUniversities(loaderData.filters, pageParam),
		queryKey: ["universities", apiParams],
	});

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ rootMargin: "200px" },
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [hasNextPage, isFetchingNextPage, fetchNextPage]);

	const universities = data?.pages.flatMap((page) => page.result.universities) ?? [];
	const totalElements = data?.pages[0]?.result.pageInfo.totalElements ?? 0;

	function handleSearch() {
		setSearchParams(serializeFilterParams(filters));
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
								disabled={isLoading}
								filters={filters}
								onFiltersChange={setFilters}
								onSubmit={handleSearch}
							/>
						</div>

						{/* Result summary */}
						{!isLoading && (
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
								] 의 조건으로 분석한 <span className="text-style-body-bold">{totalElements}개</span>
								의 학교입니다.
							</p>
						)}

						{/* University cards grid */}
						<div className={cn("mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3")}>
							{isLoading ? (
								Array.from({ length: PAGE_SIZE }).map((_, i) => (
									// biome-ignore lint/suspicious/noArrayIndexKey: static skeleton list
									<SkeletonCard key={i} />
								))
							) : universities.length > 0 ? (
								universities.map((university) => (
									<UniversityCard key={university.id} {...university} />
								))
							) : (
								<div className="col-span-full flex flex-col items-center justify-center gap-4 py-20">
									<SearchIcon className="size-12 text-base-400" />
									<p className="text-base-700 text-style-body">조건에 맞는 학교가 없습니다</p>
								</div>
							)}
						</div>

						{/* Infinite scroll sentinel */}
						<div className="h-1" ref={sentinelRef} />

						{/* Loading spinner for next page */}
						{isFetchingNextPage && (
							<div className="flex justify-center py-8">
								<Loader2 className="size-6 animate-spin text-base-500" />
							</div>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	return <RouteErrorFallback error={error} />;
}
