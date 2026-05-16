import { HTTPError } from "ky";
import { ArrowRight, MapPin, Users } from "lucide-react";

import { createApiClient, getUniversityDetail } from "~/shared/api";
import { BackButton } from "~/shared/components/back-button";
import { ContentSection } from "~/shared/components/content-section";
import { Header } from "~/shared/components/header";
import { InfoCard } from "~/shared/components/info-card";
import { RouteErrorFallback } from "~/shared/components/route-error-fallback";
import { Badge } from "~/shared/ui/primitives/badge";
import { Button } from "~/shared/ui/primitives/button";
import { Tooltip } from "~/shared/ui/primitives/tooltip";

import type { Route } from "./+types/detail";

export function meta({ loaderData }: Route.MetaArgs) {
	return [{ title: `${loaderData?.university?.nameEng ?? "Error"} - Beyond U` }];
}

export async function loader({ params, context }: Route.LoaderArgs) {
	const id = Number(params.id);
	if (Number.isNaN(id)) throw new Response("Not Found", { status: 404 });

	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	try {
		const response = await getUniversityDetail(client, id);
		return { university: response.result };
	} catch (error) {
		if (error instanceof HTTPError && error.response.status === 404) {
			throw new Response("Not Found", { status: 404 });
		}
		throw error;
	}
}

export default function Detail({ loaderData }: Route.ComponentProps) {
	const { university } = loaderData;

	const languageText =
		university.languageRequirements.length > 0
			? university.languageRequirements.map((r) => `${r.examType} ${r.minScore}`).join(" / ")
			: "별도 요구사항 없음";
	const availableMajors = university.availableMajors ?? [];
	const reviewReportUrl = university.reviewReportUrl?.trim();
	const hasReviewReport = university.hasReview && Boolean(reviewReportUrl);

	return (
		<div className="min-h-screen">
			<Header>
				<div className="mx-auto max-w-5xl -mt-2 px-8 pb-3">
					<BackButton href="/search" />
				</div>
			</Header>

			<main
				className="mx-auto max-w-5xl px-8 py-10 pb-detail-bottom"
				style={{ viewTransitionName: "university-hero" }}
			>
				<div className="flex flex-col gap-10">
					{/* 상단 정보 */}
					<div className="flex flex-col gap-2">
						<div className="flex flex-wrap items-center gap-2 self-start">
							<Badge variant="green">
								{university.programType
									? `${university.badge} | ${university.programType}`
									: university.badge}
							</Badge>
						</div>
						<h1 className="text-base-900 text-style-heading-lg">{university.nameEng}</h1>
						<p className="text-base-900 text-style-body-bold">{university.nameKor}</p>
						{university.websiteUrl && (
							<a
								className="text-base-700 text-style-body underline"
								href={university.websiteUrl}
								rel="noopener noreferrer"
								target="_blank"
							>
								{university.nameKor} 홈페이지 가기→
							</a>
						)}
					</div>

					{/* 메타 정보 + 후기 버튼 */}
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<div className="flex flex-col gap-1.5">
							<div className="flex items-center gap-2">
								<MapPin className="size-5 text-base-700" />
								<span className="text-base-700 text-style-body">
									{university.nation}, {university.region}
								</span>
							</div>
							{university.studentCount && (
								<div className="flex items-center gap-2">
									<Users className="size-5 text-base-700" />
									<span className="text-base-700 text-style-body">{university.studentCount}</span>
								</div>
							)}
						</div>

						<Tooltip
							content={
								hasReviewReport
									? "생활 비용이나 학교 생활과 같은 자세한 정보를 확인해볼 수 있어요!"
									: "아직 연결된 후기 보고서가 없어요."
							}
							defaultOpen={hasReviewReport}
						>
							{hasReviewReport ? (
								<a
									className="spring-bounce-20 spring-duration-200 inline-flex items-center justify-center gap-2 rounded-button border border-base-900 bg-primary-brown px-6 py-3 text-style-body-bold text-white transition hover:bg-primary-brown/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-brown/50 focus-visible:ring-offset-2 active:scale-97"
									href={reviewReportUrl}
									rel="noopener noreferrer"
									target="_blank"
								>
									후기 보고서 보러가기 <ArrowRight />
								</a>
							) : (
								<span className="inline-flex cursor-not-allowed">
									<Button disabled>
										후기 보고서 보러가기 <ArrowRight />
									</Button>
								</span>
							)}
						</Tooltip>
					</div>

					{/* InfoCards */}
					<div className="flex flex-col gap-3 sm:flex-row">
						<InfoCard className="flex-[2]" title="어학 요구사항">
							<p className="text-primary-olive text-style-heading-lg">{languageText}</p>
							{university.significantNote && (
								<p className="text-grey-01 text-style-body">{university.significantNote}</p>
							)}
						</InfoCard>
						<InfoCard className="flex-1" title="학점 요구사항">
							<p className="text-primary-olive text-style-heading-lg">{university.minGpa} / 4.5</p>
						</InfoCard>
					</div>

					{/* 수학 가능 학과 */}
					{availableMajors.length > 0 && (
						<ContentSection title="수학 가능 학과">
							<p className="text-base-900 text-style-body-bold">{availableMajors.join(", ")}</p>
							{university.courseListUrl && (
								<a
									className="mt-4 block text-grey-01 text-style-body underline"
									href={university.courseListUrl}
									rel="noopener noreferrer"
									target="_blank"
								>
									수학가능과목 보러가기 →
								</a>
							)}
						</ContentSection>
					)}

					{/* 참고사항 */}
					{university.remark && (
						<ContentSection title="참고사항">
							<div className="text-grey-01 text-style-body-bold">
								{university.remark.split("\n").map((line) => (
									<p key={line}>{line}</p>
								))}
							</div>
						</ContentSection>
					)}
				</div>
			</main>
		</div>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	return (
		<RouteErrorFallback error={error} notFoundMessage="요청하신 학교 정보를 찾을 수 없습니다." />
	);
}
