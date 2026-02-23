import { MapPin, Users } from "lucide-react";

import type { UniversityDetailResponse } from "~/shared/api/types";
import { BackButton } from "~/shared/components/back-button";
import { ContentSection } from "~/shared/components/content-section";
import { Header } from "~/shared/components/header";
import { InfoCard } from "~/shared/components/info-card";
import { Badge } from "~/shared/ui/primitives/badge";
import { Button } from "~/shared/ui/primitives/button";
import { Tooltip } from "~/shared/ui/primitives/tooltip";

import type { Route } from "./+types/detail";

const mockUniversities: Record<string, UniversityDetailResponse> = {
	"1": {
		availableMajors: [
			"Science",
			"Technology",
			"Engineering and Mathematics",
			"Humanities",
			"Arts and Social Sciences",
			"Business",
		],
		badge: "일반교환",
		courseListUrl: "https://www.ou.edu/academics",
		hasReview: true,
		id: 1,
		isExchange: true,
		isVisit: false,
		languageRequirements: [
			{ examType: "IELTS", languageGroup: "ENGLISH", minScore: 6.5 },
			{ examType: "TOEFL", languageGroup: "ENGLISH", minScore: 79 },
		],
		minGpa: 3.0,
		nameEng: "University of Oklahoma",
		nameKor: "오클라호마 대학교",
		nation: "미국",
		region: "Oklahoma",
		remark:
			"Oklahoma에 위치한 연구 중심 공립대학\n등록금 약 $27,200/년\n132 in national universities\n(2020 US News & World Report 랭킹)",
		significantNote: "TOEIC, TOEFL ITP 제외",
		studentCount: "약 28,600 명",
		websiteUrl: "https://www.ou.edu",
	},
	"2": {
		availableMajors: [
			"Science",
			"Technology",
			"Engineering and Mathematics",
			"Humanities",
			"Arts and Social Sciences",
			"Business",
			"Creativity and Practice",
			"Nursing",
			"Education",
			"Health Sciences and Human Movement",
		],
		badge: "일반교환",
		courseListUrl: null,
		hasReview: true,
		id: 2,
		isExchange: true,
		isVisit: false,
		languageRequirements: [
			{ examType: "IELTS", languageGroup: "ENGLISH", minScore: 6.5 },
			{ examType: "TOEFL", languageGroup: "ENGLISH", minScore: 85 },
		],
		minGpa: 3.8,
		nameEng: "University of Sydney",
		nameKor: "시드니 대학교",
		nation: "호주",
		region: "Sydney",
		remark: "호주 최초의 대학교 (1850년 설립)\n세계 대학 랭킹 상위 50위\n시드니 도심에 위치",
		significantNote: null,
		studentCount: "약 73,000 명",
		websiteUrl: "https://www.sydney.edu.au",
	},
};

export function meta({ data }: Route.MetaArgs) {
	return [{ title: `${data.university.nameEng} - Beyond U` }];
}

export function loader({ params }: Route.LoaderArgs) {
	const university = mockUniversities[params.id];
	if (!university) {
		throw new Response("Not Found", { status: 404 });
	}
	return { university };
}

export default function Detail({ loaderData }: Route.ComponentProps) {
	const { university } = loaderData;

	const languageText = university.languageRequirements
		.map((r) => `${r.examType} ${r.minScore}`)
		.join(" / ");

	return (
		<div className="min-h-screen">
			<Header>
				<div className="mx-auto max-w-5xl px-8">
					<BackButton href="/search" />
				</div>
			</Header>

			<main className="mx-auto max-w-5xl px-8 py-10">
				<div className="flex flex-col gap-10">
					{/* 상단 정보 */}
					<div className="flex flex-col gap-2">
						<Badge variant="green">{university.badge}</Badge>
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

						<Tooltip content="생활 비용이나 학교 생활과 같은 자세한 정보를 확인해볼 수 있어요!">
							<Button disabled={!university.hasReview}>후기 보고서 보러가기 &gt;</Button>
						</Tooltip>
					</div>

					{/* InfoCards */}
					<div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
						<InfoCard className="flex-1" title="어학 요구사항">
							<p className="text-primary-olive text-style-heading-lg">{languageText}</p>
							{university.significantNote && (
								<p className="text-base-700 text-style-body">{university.significantNote}</p>
							)}
						</InfoCard>
						<InfoCard className="flex-1" title="학점 요구사항">
							<p className="text-primary-olive text-style-heading-lg">{university.minGpa} / 4.5</p>
						</InfoCard>
					</div>

					{/* 수학 가능 학과 */}
					{university.availableMajors && (
						<ContentSection title="수학 가능 학과">
							<p className="text-base-900 text-style-body-bold">
								{university.availableMajors.join(", ")}
							</p>
							{university.courseListUrl && (
								<a
									className="mt-4 block text-base-700 text-style-body underline"
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
							<div className="flex flex-col text-base-900 text-style-body-bold">
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
