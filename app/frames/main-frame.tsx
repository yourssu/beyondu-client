import { ArrowRight } from "lucide-react";
import { useState } from "react";

import { Header } from "~/shared/components/header";
import { Button } from "~/shared/ui/primitives/button";
import { Checkbox } from "~/shared/ui/primitives/checkbox";
import { Combobox } from "~/shared/ui/primitives/combobox";
import { FormField } from "~/shared/ui/primitives/form-field";
import { NumberInput } from "~/shared/ui/primitives/number-input";
import { Select } from "~/shared/ui/primitives/select";

export interface FilterFormData {
	major: string;
	gpa: string;
	languageCert: string;
	score: string;
	country: string;
	requireReview: boolean;
}

interface MainFrameProps {
	onSubmit: (data: FilterFormData) => void;
}

const languageCertOptions = [
	{ label: "없음", value: "없음" },
	{ label: "TOEFL", value: "TOEFL" },
	{ label: "IELTS", value: "IELTS" },
	{ label: "TOEIC", value: "TOEIC" },
	{ label: "기타", value: "기타" },
];

export function MainFrame({ onSubmit }: MainFrameProps) {
	const [major, setMajor] = useState("");
	const [gpa, setGpa] = useState("");
	const [languageCert, setLanguageCert] = useState("");
	const [score, setScore] = useState("");
	const [country, setCountry] = useState("");
	const [requireReview, setRequireReview] = useState(false);

	function handleSubmit() {
		onSubmit({ country, gpa, languageCert, major, requireReview, score });
	}

	return (
		<div className="relative min-h-screen">
			{/* Gradient placeholder for blurred campus background */}
			<div className="absolute inset-0 bg-gradient-to-br from-green-100 via-amber-50 to-emerald-100" />

			<div className="relative z-10">
				<Header />

				<main className="mx-auto flex max-w-5xl justify-center px-4 py-9">
					<div className="flex w-full max-w-[702px] flex-col items-center gap-10 border border-primary-brown bg-surface-glass px-6 py-10 sm:px-[73px]">
						{/* Title */}
						<div className="flex flex-col gap-2">
							<h1 className="text-base-900 text-style-heading-lg">내 정보 입력하기</h1>
							<p className="text-base-900 text-style-body">
								입력하신 정보를 바탕으로 지원 가능 여부를 분석합니다
							</p>
						</div>

						{/* Form fields */}
						<div className="flex w-full flex-col gap-9">
							{/* Row 1: Major + GPA */}
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<FormField label="전공">
									<Combobox
										onChange={setMajor}
										placeholder="예: 경영학과, 컴퓨터학부"
										suggestions={[]}
										value={major}
									/>
								</FormField>
								<FormField label="학점 (4.5 만점)">
									<NumberInput
										onChange={(e) => setGpa(e.target.value)}
										placeholder="예: 3.8"
										value={gpa}
									/>
								</FormField>
							</div>

							{/* Row 2: Language cert + Score */}
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<FormField label="보유한 언어 자격증">
									<Select
										onChange={setLanguageCert}
										options={languageCertOptions}
										placeholder="선택"
										value={languageCert}
									/>
								</FormField>
								<FormField label="점수">
									<NumberInput
										onChange={(e) => setScore(e.target.value)}
										placeholder="예: 800"
										value={score}
									/>
								</FormField>
							</div>

							{/* Row 3: Country */}
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<FormField label="희망 나라">
									<Combobox
										onChange={setCountry}
										placeholder="예: 미국"
										suggestions={[]}
										value={country}
									/>
								</FormField>
							</div>
						</div>

						{/* Checkbox */}
						<div className="flex w-full items-center">
							<Checkbox
								checked={requireReview}
								label="후기 보고서 필수 여부"
								onChange={setRequireReview}
							/>
						</div>

						{/* CTA Button */}
						<Button
							fullWidth
							onClick={handleSubmit}
							rightIcon={<ArrowRight className="size-5" />}
							size="lg"
						>
							맞춤 학교 찾아보기
						</Button>
					</div>
				</main>
			</div>
		</div>
	);
}
