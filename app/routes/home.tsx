import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { serializeFilterParams } from "~/lib/filter-params";
import { CampusBackground } from "~/shared/components/campus-background";
import { Header } from "~/shared/components/header";
import { SearchFilterBar } from "~/shared/components/search-filter-bar";
import type { FilterFormData } from "~/shared/types/filter";
import { Button } from "~/shared/ui/primitives/button";

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

  const [filters, setFilters] = useState<FilterFormData>({
    country: "",
    gpa: "",
    languageCert: "NONE",
    major: "",
    requireReview: false,
    score: "",
  });

  const isFormComplete =
    filters.major &&
    filters.gpa &&
    filters.languageCert &&
    (filters.languageCert === "NONE" || filters.score) &&
    filters.country;

  function handleSubmit() {
    const params = serializeFilterParams(filters);
    navigate(`/search?${params.toString()}`, { viewTransition: true });
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Blurred campus background */}
      <CampusBackground />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto flex max-w-5xl justify-center px-4 py-9">
          <div className="flex w-full max-w-form flex-col gap-10 border border-primary-brown bg-surface-glass px-6 py-10 sm:px-18">
            {/* Title */}
            <div className="flex flex-col gap-2">
              <h1 className="text-base-900 text-style-heading-lg">
                내 정보 입력하기
              </h1>
              <p className="text-base-900 text-style-body">
                입력하신 정보를 바탕으로 지원 가능 여부를 분석합니다
              </p>
            </div>

            {/* Form fields */}
            <SearchFilterBar
              filters={filters}
              onFiltersChange={setFilters}
              onSubmit={handleSubmit}
              variant="full"
            />

            <div className="flex flex-col gap-2">
              {/* CTA Button */}
              {!isFormComplete && (
                <p className="w-full text-center text-red-500 text-style-caption">
                  빈칸에 정보를 입력해주세요
                </p>
              )}
              <Button
                disabled={!isFormComplete}
                fullWidth
                onClick={handleSubmit}
                rightIcon={<ArrowRight className="size-5" />}
                size="lg"
              >
                맞춤 학교 찾아보기
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
