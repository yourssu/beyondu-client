import type { UniversityDetail } from "~/frames/detail-frame";
import { DetailFrame } from "~/frames/detail-frame";

import type { Route } from "./+types/detail";

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
	return <DetailFrame university={loaderData.university} />;
}
