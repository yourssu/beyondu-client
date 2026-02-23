// Figma Design Context - 메인 필터 뷰 (/)
// Node ID: 83:84, File Key: Jr6rZtdgE5nUcjdtgDX6nq
// Figma URL: https://www.figma.com/design/Jr6rZtdgE5nUcjdtgDX6nq/?node-id=83-84&m=dev
//
// Design Styles:
// pretendard/bold/30: Font(family: "Pretendard Variable", style: Bold, size: 30, weight: 700, lineHeight: 36, letterSpacing: 0.3955)
// pretendard/reg/16: Font(family: "Pretendard Variable", style: Regular, size: 16, weight: 400, lineHeight: 24, letterSpacing: 0)
// pretendard/bold/16: Font(family: "Pretendard Variable", style: Bold, size: 16, weight: 700, lineHeight: 24, letterSpacing: 0)
//
// Key Design Tokens:
// --p-01: #838c00 (olive accent)
// --p-02: #4f3109 (brown primary button)
// --p-03: #cde79a (green badge/border)
// --b-01: #0a0a0a (base text)
// --b-02: #443f3b (secondary text)
// --b-03: #b4bc9f (border/input)
// --white: #ffffff
// --logo: #062c05

const imgChatGptImageFeb42026063806Pm1 =
	"https://www.figma.com/api/mcp/asset/0f52df74-d7d7-47c1-bb3d-4f4be5407cab";

export default function MainViewReference() {
	return (
		<div className="relative size-full bg-white" data-name="필터 화면" data-node-id="83:84">
			{/* 배경 이미지: 블러 처리된 캠퍼스 이미지 */}
			<div
				className="absolute top-0 left-[calc(54.17%-33.5px)] h-[1064px] w-[1597px] -translate-x-1/2 blur-[25.2px]"
				data-node-id="117:981"
			>
				<img alt="" src={imgChatGptImageFeb42026063806Pm1} />
			</div>

			{/* 메인 폼 컨테이너 */}
			<div
				className="absolute top-[82px] left-1/2 flex h-[942px] w-[1440px] -translate-x-1/2 flex-col content-stretch items-center py-[36px]"
				data-node-id="90:173"
			>
				{/* 반투명 폼 카드 */}
				<div
					className="flex flex-col items-center gap-[40px] border border-[#4f3109] border-solid bg-[rgba(255,255,255,0.8)] px-[73px] py-[40px]"
					data-node-id="90:90"
				>
					{/* 타이틀 섹션 */}
					<div className="flex flex-col gap-[8px]" data-node-id="94:283">
						<p
							className="font-bold text-[#0a0a0a] text-[30px] leading-[36px] tracking-[0.4px]"
							data-node-id="90:97"
						>
							내 정보 입력하기
						</p>
						<p className="text-[#0a0a0a] text-[16px] leading-[24px]" data-node-id="90:99">
							입력하신 정보를 바탕으로 지원 가능 여부를 분석합니다
						</p>
					</div>

					{/* 폼 필드들 */}
					<div className="flex flex-col gap-[36px]" data-node-id="94:285">
						{/* Row 1: 전공 + 학점 */}
						<div className="flex gap-[16px]" data-node-id="100:142">
							{/* 전공 (TextInput/Combobox) */}
							<div className="flex flex-col gap-[8px]" data-node-id="90:101">
								<p
									className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]"
									data-node-id="90:103"
								>
									전공
								</p>
								<div
									className="h-[50px] w-[343px] rounded-[10px] border border-[#b4bc9f] bg-white px-[16px] py-[12px]"
									data-node-id="90:104"
								>
									<p className="text-[#b4bc9f] text-[16px] leading-[24px]">
										예: 경영학과, 컴퓨터학부
									</p>
								</div>
							</div>

							{/* 학점 (NumberInput) */}
							<div className="flex flex-col gap-[8px]" data-node-id="90:106">
								<p
									className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]"
									data-node-id="90:108"
								>
									학점 (4.5 만점)
								</p>
								<div
									className="h-[50px] w-[343px] rounded-[10px] border border-[#b4bc9f] bg-white px-[16px] py-[12px]"
									data-node-id="90:109"
								>
									<p className="text-[#b4bc9f] text-[16px] leading-[24px]">예: 3.8</p>
								</div>
							</div>
						</div>

						{/* Row 2: 보유한 언어 자격증 + 점수 */}
						<div className="grid grid-cols-2 gap-[16px]" data-node-id="90:111">
							{/* 보유한 언어 자격증 (Select/Dropdown) */}
							<div className="flex flex-col gap-[8px]" data-node-id="90:112">
								<p
									className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]"
									data-node-id="90:114"
								>
									보유한 언어 자격증
								</p>
								<div
									className="relative h-[50px] rounded-[10px] border border-[#b4bc9f] bg-white"
									data-node-id="90:115"
								>
									<span className="text-[#0a0a0a] text-[16px]">없음</span>
									{/* ChevronDown icon at right */}
								</div>
							</div>

							{/* 점수 (NumberInput) */}
							<div className="flex flex-col gap-[8px]" data-node-id="90:130">
								<p
									className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]"
									data-node-id="90:132"
								>
									점수
								</p>
								<div
									className="h-[50px] rounded-[10px] border border-[#b4bc9f] bg-white px-[16px] py-[12px]"
									data-node-id="90:133"
								>
									<p className="text-[#b4bc9f] text-[16px] leading-[24px]">예: 800</p>
								</div>
							</div>
						</div>

						{/* Row 3: 희망 나라 */}
						<div className="flex flex-col gap-[8px]" data-node-id="90:135">
							<p
								className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]"
								data-node-id="90:137"
							>
								희망 나라
							</p>
							<div
								className="h-[50px] w-[343px] rounded-[10px] border border-[#b4bc9f] bg-white px-[16px] py-[12px]"
								data-node-id="105:108"
							>
								<p className="text-[#b4bc9f] text-[16px] leading-[24px]">예: 미국</p>
							</div>
						</div>
					</div>

					{/* 후기 보고서 필수 여부 체크박스 */}
					<div className="flex w-full items-center" data-node-id="236:3075">
						<p
							className="font-bold text-[#0a0a0a] text-[16px] leading-[24px]"
							data-node-id="236:3077"
						>
							후기 보고서 필수 여부
						</p>
						{/* Checkbox component - node 236:2600 */}
					</div>

					{/* CTA 버튼 */}
					<div
						className="flex items-center justify-center rounded-[5px] border border-[#0a0a0a] bg-[#4f3109] px-[278px] py-[16px]"
						data-node-id="94:305"
					>
						<span className="text-center font-bold text-[16px] text-white leading-[24px]">
							맞춤 학교 찾아보기
						</span>
						{/* ArrowRight icon */}
					</div>
				</div>
			</div>

			{/* 헤더 */}
			<div
				className="absolute top-0 left-0 h-[82px] w-[1440px] overflow-clip bg-[rgba(255,255,255,0.6)]"
				data-node-id="110:153"
			>
				<p className="font-['Chilanka'] text-[#062c05] text-[32px]" data-node-id="141:105">
					Beyond U
				</p>
			</div>
		</div>
	);
}
