import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";
import { Link, isRouteErrorResponse, useNavigation, useSearchParams } from "react-router";

import { deserializeFilterParams, serializeFilterParams, toSearchApiParams } from "~/lib/filter-params";
import { createApiClient, getUniversities } from "~/shared/api";
import { BackButton } from "~/shared/components/back-button";
import { CampusBackground } from "~/shared/components/campus-background";
import { Header } from "~/shared/components/header";
import { SearchFilterBar } from "~/shared/components/search-filter-bar";
import { UniversityCard } from "~/shared/components/university-card";
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

export async function loader({ request, context }: Route.LoaderArgs) {
	const url = new URL(request.url);
	const filters = deserializeFilterParams(url.searchParams);
	const apiParams = toSearchApiParams(filters);

	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getUniversities(client, apiParams);

	return {
		universities: response.result.universities,
		pageInfo: response.result.pageInfo,
		filters,
	};
}

export default function Search({ loaderData }: Route.ComponentProps) {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigation = useNavigation();
	const isLoading = navigation.state === "loading";

	const [filters, setFilters] = useState<FilterFormData>(loaderData.filters);

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
								disabled={isLoading}
								filters={filters}
								onFiltersChange={setFilters}
								onSubmit={handleSearch}
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
							<span className="text-style-body-bold">
								{loaderData.pageInfo.totalElements}개
							</span>
							의 학교입니다.
						</p>

						{/* University cards grid */}
						<div
							className={`mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 transition-opacity spring-duration-200 ${isLoading ? "pointer-events-none opacity-50" : ""}`}
						>
							{loaderData.universities.length > 0 ? (
								loaderData.universities.map((university) => (
									<UniversityCard key={university.id} {...university} />
								))
							) : (
								<div className="col-span-full flex flex-col items-center justify-center gap-4 py-20">
									<SearchIcon className="size-12 text-base-400" />
									<p className="text-base-700 text-style-body">
										조건에 맞는 학교가 없습니다
									</p>
								</div>
							)}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const is404 = isRouteErrorResponse(error) && error.status === 404;

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6">
			<h1 className="text-base-900 text-style-heading-lg">
				{is404 ? "페이지를 찾을 수 없습니다" : "오류가 발생했습니다"}
			</h1>
			<p className="text-base-700 text-style-body">
				{is404
					? "요청하신 페이지가 존재하지 않습니다."
					: "잠시 후 다시 시도해주세요."}
			</p>
			<Link className="text-primary-brown text-style-body-bold underline" to="/">
				홈으로 돌아가기
			</Link>
		</div>
	);
}
