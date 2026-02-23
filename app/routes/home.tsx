import { useNavigate } from "react-router";

import type { FilterFormData } from "~/frames/main-frame";
import { MainFrame } from "~/frames/main-frame";

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

	function handleSubmit(data: FilterFormData) {
		const params = new URLSearchParams();
		if (data.major) params.set("major", data.major);
		if (data.gpa) params.set("gpa", data.gpa);
		if (data.languageCert) params.set("languageCert", data.languageCert);
		if (data.score) params.set("score", data.score);
		if (data.country) params.set("country", data.country);
		if (data.requireReview) params.set("requireReview", "true");

		navigate(`/search?${params.toString()}`);
	}

	return <MainFrame onSubmit={handleSubmit} />;
}
