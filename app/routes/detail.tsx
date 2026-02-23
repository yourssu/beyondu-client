import { MapPin, Users } from "lucide-react";

import { BackButton } from "~/shared/components/back-button";
import { ContentSection } from "~/shared/components/content-section";
import { Header } from "~/shared/components/header";
import { InfoCard } from "~/shared/components/info-card";
import { Badge } from "~/shared/ui/primitives/badge";
import { Button } from "~/shared/ui/primitives/button";
import { Tooltip } from "~/shared/ui/primitives/tooltip";

import type { Route } from "./+types/detail";

export interface UniversityDetail {
	id: string;
	exchangeType: string;
	nameEn: string;
	nameKr: string;
	homepageUrl: string;
	location: string;
	studentCount: string;
	languageRequirements: { label: string; value: string }[];
	languageNote?: string;
	gpaRequirement: string;
	gpaDenominator: string;
	departments: string;
	departmentLink?: string;
	notes: string[];
	reviewReportUrl?: string;
}

const mockUniversities: Record<string, UniversityDetail> = {
	"1": {
		departmentLink: "https://www.ou.edu/academics",
		departments:
			"Science, Technology, Engineering and Mathematics, Humanities, Arts and Social Sciences, Business",
		exchangeType: "일반교환",
		gpaDenominator: "4.5",
		gpaRequirement: "3.0",
		homepageUrl: "https://www.ou.edu",
		id: "1",
		languageNote: "TOEIC, TOEFL ITP 제외",
		languageRequirements: [
			{ label: "IELTS", value: "6.5" },
			{ label: "TOEFL", value: "79" },
		],
		location: "미국, Oklahoma",
		nameEn: "University of Oklahoma",
		nameKr: "오클라호마 대학교",
		notes: [
			"Oklahoma에 위치한 연구 중심 공립대학",
			"등록금 약 $27,200/년",
			"132 in national universities",
			"(2020 US News & World Report 랭킹)",
		],
		reviewReportUrl: "https://example.com/review/1",
		studentCount: "약 28,600 명",
	},
	"2": {
		departments:
			"Science, Technology, Engineering and Mathematics, Humanities, Arts and Social Sciences, Business, Creativity and Practice, Nursing, Education, Health Sciences and Human Movement",
		exchangeType: "일반교환",
		gpaDenominator: "4.5",
		gpaRequirement: "3.8",
		homepageUrl: "https://www.sydney.edu.au",
		id: "2",
		languageRequirements: [
			{ label: "IELTS", value: "6.5" },
			{ label: "TOEFL", value: "85" },
		],
		location: "호주, Sydney",
		nameEn: "University of Sydney",
		nameKr: "시드니 대학교",
		notes: ["호주 최초의 대학교 (1850년 설립)", "세계 대학 랭킹 상위 50위", "시드니 도심에 위치"],
		reviewReportUrl: "https://example.com/review/2",
		studentCount: "약 73,000 명",
	},
};

export function meta({ data }: Route.MetaArgs) {
	return [{ title: `${data.university.nameEn} - Beyond U` }];
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
		.map((r) => `${r.label} ${r.value}`)
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
						<Badge variant="green">{university.exchangeType}</Badge>
						<h1 className="text-base-900 text-style-heading-lg">{university.nameEn}</h1>
						<p className="text-base-900 text-style-body-bold">{university.nameKr}</p>
						<a
							className="text-base-700 text-style-body underline"
							href={university.homepageUrl}
							rel="noopener noreferrer"
							target="_blank"
						>
							{university.nameKr} 홈페이지 가기→
						</a>
					</div>

					{/* 메타 정보 + 후기 버튼 */}
					<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
						<div className="flex flex-col gap-1.5">
							<div className="flex items-center gap-2">
								<MapPin className="size-5 text-base-700" />
								<span className="text-base-700 text-style-body">{university.location}</span>
							</div>
							<div className="flex items-center gap-2">
								<Users className="size-5 text-base-700" />
								<span className="text-base-700 text-style-body">{university.studentCount}</span>
							</div>
						</div>

						<Tooltip content="생활 비용이나 학교 생활과 같은 자세한 정보를 확인해볼 수 있어요!">
							{university.reviewReportUrl ? (
								<a href={university.reviewReportUrl} rel="noopener noreferrer" target="_blank">
									<Button>후기 보고서 보러가기 &gt;</Button>
								</a>
							) : (
								<Button disabled>후기 보고서 보러가기 &gt;</Button>
							)}
						</Tooltip>
					</div>

					{/* InfoCards */}
					<div className="flex flex-col gap-3 sm:flex-row sm:gap-3">
						<InfoCard className="flex-1" title="어학 요구사항">
							<p className="text-primary-olive text-style-heading-lg">{languageText}</p>
							{university.languageNote && (
								<p className="text-base-700 text-style-body">{university.languageNote}</p>
							)}
						</InfoCard>
						<InfoCard className="flex-1" title="학점 요구사항">
							<p className="text-primary-olive text-style-heading-lg">
								{university.gpaRequirement} / {university.gpaDenominator}
							</p>
						</InfoCard>
					</div>

					{/* 수학 가능 학과 */}
					<ContentSection title="수학 가능 학과">
						<p className="text-base-900 text-style-body-bold">{university.departments}</p>
						{university.departmentLink && (
							<a
								className="mt-4 block text-base-700 text-style-body underline"
								href={university.departmentLink}
								rel="noopener noreferrer"
								target="_blank"
							>
								수학가능과목 보러가기 →
							</a>
						)}
					</ContentSection>

					{/* 참고사항 */}
					<ContentSection title="참고사항">
						<div className="flex flex-col text-base-900 text-style-body-bold">
							{university.notes.map((note) => (
								<p key={note}>{note}</p>
							))}
						</div>
					</ContentSection>
				</div>
			</main>
		</div>
	);
}
