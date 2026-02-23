// Figma Design Context - 상세 뷰 (/detail/:id)
// Node ID: 121:1054, File Key: Jr6rZtdgE5nUcjdtgDX6nq
// Figma URL: https://www.figma.com/design/Jr6rZtdgE5nUcjdtgDX6nq/?node-id=121-1054&m=dev
//
// Design Styles:
// pretendard/bold/30: Font(family: "Pretendard Variable", style: Bold, size: 30, weight: 700, lineHeight: 36, letterSpacing: 0.3955)
// pretendard/reg/16: Font(family: "Pretendard Variable", style: Regular, size: 16, weight: 400, lineHeight: 24, letterSpacing: 0)
// pretendard/bold/16: Font(family: "Pretendard Variable", style: Bold, size: 16, weight: 700, lineHeight: 24, letterSpacing: 0)
// heading-md: Font(family: "Inter/Noto Sans KR", style: Bold, size: 24, weight: 700, lineHeight: 32, letterSpacing: 0.07)
// badge-sm: Font(family: "Inter/Noto Sans KR", style: SemiBold, size: 10, weight: 600, lineHeight: 20, letterSpacing: -0.15)

export default function DetailViewReference() {
	return (
		<div
			className="relative size-full bg-white"
			data-name="학교 상세 페이지"
			data-node-id="121:1054"
		>
			{/* 헤더 + 뒤로가기 */}
			<div className="flex flex-col items-start" data-node-id="135:244">
				{/* 헤더 영역 */}
				<div className="h-[90px] w-[1440px] overflow-clip bg-white" data-node-id="143:310">
					<p className="font-['Chilanka'] text-[#062c05] text-[32px]" data-node-id="143:311">
						Beyond U
					</p>
				</div>

				{/* 뒤로가기 버튼 */}
				<div className="h-[37px] w-full" data-node-id="121:1127">
					<div className="flex items-center gap-[8px]" data-node-id="121:1128">
						{/* ArrowLeft icon */}
						<p className="text-center text-[#443f3b] text-[16px] leading-[24px]">뒤로가기</p>
					</div>
				</div>
			</div>

			{/* 메인 컨텐츠 */}
			<div
				className="flex w-[1440px] items-center justify-center pt-[42px] pb-[64px]"
				data-node-id="135:241"
			>
				<div className="flex flex-col gap-[40px]" data-node-id="135:231">
					{/* 상단: 뱃지 + 대학명 + 메타정보 */}
					<div className="flex flex-col gap-[8px]" data-node-id="135:228">
						{/* 뱃지: 일반교환 */}
						<div
							className="inline-flex rounded-full bg-[#cde79a] px-[11px] py-[4px]"
							data-node-id="121:1172"
						>
							<p className="font-semibold text-[#443f3b] text-[10px] leading-[20px] tracking-[-0.15px]">
								일반교환
							</p>
						</div>

						{/* 대학명 영문 + 한글 */}
						<div className="flex flex-col gap-[8px]" data-node-id="135:225">
							<p className="font-bold text-[#0a0a0a] text-[30px] leading-[36px] tracking-[0.4px]">
								Universit of Oklahoma
							</p>
							<p className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]">
								오클라호마 대학교
							</p>
						</div>

						{/* 홈페이지 링크 */}
						<p className="text-[#443f3b] text-[16px] leading-[24px] underline">
							오클라호마 대학교 홈페이지 가기→
						</p>
					</div>

					{/* 위치 + 인원 + 후기 버튼 */}
					<div className="flex w-[848px] items-center justify-between" data-node-id="188:950">
						<div className="flex flex-col gap-[5px]" data-node-id="135:227">
							{/* MapPin + 위치 */}
							<div className="flex items-center gap-[8px]">
								{/* MapPin icon 20x20 */}
								<p className="text-[#443f3b] text-[16px] leading-[24px]">Australia, Sydney</p>
							</div>
							{/* Users + 인원 */}
							<div className="flex items-center gap-[8px]">
								{/* Users icon 20x20 */}
								<p className="text-[#443f3b] text-[16px] leading-[24px]">약 28,600 명</p>
							</div>
						</div>

						{/* 후기 보고서 보러가기 버튼 */}
						<div
							className="flex items-center justify-center rounded-[5px] border border-[#0a0a0a] bg-[#4f3109] px-[278px] py-[16px]"
							data-node-id="188:943"
						>
							<span className="font-bold text-[16px] text-white leading-[24px]">
								맞춤 학교 찾아보기
							</span>
						</div>
					</div>

					{/* 툴팁 (후기 버튼 위에 표시) */}
					<div className="flex flex-col items-center" data-node-id="225:430">
						<div className="rounded-[4px] border border-[#c5c5c5] bg-[#fbfff3] px-[10px]">
							<p className="text-center text-[10px] text-black leading-[24px]">
								생활 비용이나 학교 생활과 같은 자세한 정보를 확인해볼 수 있어요!
							</p>
						</div>
						{/* 삼각형 꼬리 */}
					</div>

					{/* 어학/학점 요구사항 InfoCards */}
					<div className="flex gap-[12px]" data-name="Container" data-node-id="121:1193">
						{/* 어학 요구사항 InfoCard */}
						<div
							className="flex flex-col gap-[12px] rounded-[14px] border-2 border-[#cde79a] bg-white p-[30px]"
							data-node-id="121:1203"
						>
							<p className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]">어학 요구사항</p>
							<div className="flex items-center gap-[12px]">
								<p className="font-bold text-[#838c00] text-[30px] leading-[36px] tracking-[0.4px]">
									IELTS 6.5
								</p>
								<p className="font-bold text-[#838c00] text-[30px] leading-[36px] tracking-[0.4px]">
									/
								</p>
								<p className="font-bold text-[#838c00] text-[30px] leading-[36px] tracking-[0.4px]">
									TOEFL 90
								</p>
							</div>
							<p className="text-[#443f3b] text-[16px] leading-[24px]">TOEIC, TOEFL ITP 제외</p>
						</div>

						{/* 학점 요구사항 InfoCard */}
						<div
							className="flex w-[240px] flex-col gap-[12px] rounded-[14px] border-2 border-[#cde79a] bg-white p-[30px]"
							data-node-id="121:1194"
						>
							<p className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]">학점 요구사항</p>
							<div className="flex items-center gap-[12px]">
								<p className="font-bold text-[#838c00] text-[30px] leading-[36px] tracking-[0.4px]">
									3.8
								</p>
								<p className="font-bold text-[#838c00] text-[30px] leading-[36px] tracking-[0.4px]">
									/
								</p>
								<p className="font-bold text-[#838c00] text-[30px] leading-[36px] tracking-[0.4px]">
									4.5
								</p>
							</div>
						</div>
					</div>

					{/* 수학 가능 학과 ContentSection */}
					<div className="flex flex-col gap-[16px]" data-node-id="123:1247">
						<p className="font-bold text-[#0a0a0a] text-[24px] leading-[32px] tracking-[0.07px]">
							수학 가능 학과
						</p>
						<div
							className="flex w-[848px] flex-col gap-[16px] rounded-[14px] bg-[#fafafa] p-[24px]"
							data-node-id="123:1250"
						>
							<p className="w-[800px] font-bold text-[#0a0a0a] text-[16px] leading-[24px]">
								Science_Technology_Engineering and Mathematics, Humanities_Arts and Social Sciences,
								Business, Creativity and Practice, Nursing, Education, Health Sciences and Human
								Movement
							</p>
							<p className="text-[#443f3b] text-[16px] leading-[24px] underline">
								수학가능과목 보러가기 →
							</p>
						</div>
					</div>

					{/* 참고사항 ContentSection */}
					<div className="flex flex-col gap-[16px]" data-node-id="135:217">
						<p className="font-bold text-[#0a0a0a] text-[24px] leading-[32px] tracking-[0.07px]">
							참고사항
						</p>
						<div className="w-[848px] rounded-[14px] bg-[#fafafa] p-[24px]" data-node-id="135:220">
							<div className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]">
								<p>oklahoma에 위치한 연구 중심 공립대학</p>
								<p>등록금 약 $27,200/년</p>
								<p>132 in national universities</p>
								<p>(2020 us news&world report 랭킹)</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
