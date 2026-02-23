import type { FilterFormData } from "~/frames/main-frame";
import { BackButton } from "~/shared/components/back-button";
import { Header } from "~/shared/components/header";
import { SearchFilterBar } from "~/shared/components/search-filter-bar";
import { UniversityCard } from "~/shared/components/university-card";

export interface UniversityResult {
	id: string;
	country: string;
	exchangeType: string;
	program?: string;
	nameEn: string;
	nameKr: string;
	languageRequirements: { name: string; score: string }[];
	hasReview: boolean;
	reviewYears?: string;
}

interface SearchFrameProps {
	filters: FilterFormData;
	onFiltersChange: (filters: FilterFormData) => void;
	onSearch: () => void;
	results: UniversityResult[];
	resultCount: number;
}

const languageCertOptions = [
	{ label: "없음", value: "없음" },
	{ label: "TOEFL", value: "TOEFL" },
	{ label: "IELTS", value: "IELTS" },
	{ label: "TOEIC", value: "TOEIC" },
	{ label: "기타", value: "기타" },
];

export function SearchFrame({
	filters,
	onFiltersChange,
	onSearch,
	results,
	resultCount,
}: SearchFrameProps) {
	return (
		<div className="relative min-h-screen">
			{/* Gradient placeholder for blurred campus background */}
			<div className="absolute inset-0 bg-gradient-to-br from-green-100 via-amber-50 to-emerald-100" />

			<div className="relative z-10">
				<Header />

				<div className="border-base-700 border-b bg-surface-glass">
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
								country={filters.country}
								gpa={filters.gpa}
								languageCert={filters.languageCert}
								languageCertOptions={languageCertOptions}
								major={filters.major}
								onCountryChange={(v) => onFiltersChange({ ...filters, country: v })}
								onGpaChange={(v) => onFiltersChange({ ...filters, gpa: v })}
								onLanguageCertChange={(v) => onFiltersChange({ ...filters, languageCert: v })}
								onMajorChange={(v) => onFiltersChange({ ...filters, major: v })}
								onRequireReviewChange={(v) => onFiltersChange({ ...filters, requireReview: v })}
								onScoreChange={(v) => onFiltersChange({ ...filters, score: v })}
								onSubmit={onSearch}
								requireReview={filters.requireReview}
								score={filters.score}
							/>
						</div>

						{/* Result summary */}
						<p className="mt-8 text-base-700 text-style-body">
							총 <span className="text-style-body-bold">{resultCount}개</span>의 학교가
							검색되었습니다.
						</p>

						{/* University cards grid */}
						<div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{results.map((university) => (
								<UniversityCard key={university.id} {...university} />
							))}
						</div>
					</div>
				</main>
			</div>
		</div>
	);
}
