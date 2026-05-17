import { BackButton } from "~/shared/components/back-button";
import { Header } from "~/shared/components/header";

export function meta() {
	return [{ title: "이용약관 - Beyond U" }];
}

export default function Terms() {
	return (
		<div className="min-h-screen bg-surface-page">
			<Header>
				<div className="mx-auto -mt-2 max-w-5xl px-8 pb-3">
					<BackButton href="/" />
				</div>
			</Header>

			<main className="mx-auto max-w-3xl px-8 py-10">
				<h1 className="mb-8 text-base-900 text-style-heading-lg">이용약관</h1>

				<div className="flex flex-col gap-6 text-grey-01 text-style-body">
					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제1조 (약관의 목적과 동의)</h2>
						<p>
							① 본 약관은 유어슈(이하 "운영진"이라 합니다)가 제공하는 비욘드유 서비스(이하
							"서비스"라 합니다)의 이용과 관련하여 운영진과 이용자 간의 권리·의무 및 책임사항을
							규정함을 목적으로 합니다.
						</p>
						<p>
							② 이용자는 서비스를 이용함으로써 본 약관에 동의한 것으로 간주됩니다. 본 약관에
							명시되지 않은 사항은 관련 법령 및 상관례에 따릅니다.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제2조 (용어의 정의)</h2>
						<p>① 본 약관에서 사용하는 용어의 정의는 다음과 같습니다.</p>
						<ol className="flex list-decimal flex-col gap-1 pl-5">
							<li>"운영진"이란 비욘드유 서비스를 개발·운영하는 자를 의미합니다.</li>
							<li>"이용자"란 본 약관에 따라 서비스를 이용하는 자를 의미합니다.</li>
							<li>
								"서비스"란 웹사이트 및 모바일 환경 등에서 제공되는 교환학생 및 학교생활 관련 정보
								제공, 이용자 간 정보 열람 기능 등 제반 서비스를 의미합니다.
							</li>
							<li>
								"게시물"이란 이용자가 서비스 내에 게시한 문자, 사진, 영상, 링크 등 모든 형태의
								정보를 의미합니다.
							</li>
						</ol>
						<p>
							② 본 약관에서 사용하는 용어 중 본 조에서 정하지 아니한 것은 관계법령에서 정하는 바에
							따르며, 그 외에는 일반 상관례를 따릅니다.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제3조 (약관의 개정)</h2>
						<p>① 운영진은 관련 법령을 위반하지 않는 범위에서 본 약관을 개정할 수 있습니다.</p>
						<p>
							② 약관을 개정하는 경우 적용일자 및 개정 사유를 명시하여 적용일 7일 이전부터 서비스
							내에 공지합니다.
						</p>
						<p>
							③ 이용자가 개정 약관 시행일까지 명시적으로 거부 의사를 표시하지 않고 서비스를 계속
							이용하는 경우 개정 약관에 동의한 것으로 봅니다.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제4조 (서비스의 제공)</h2>
						<p>① 운영진은 이용자에게 다음과 같은 서비스를 제공합니다.</p>
						<ol className="flex list-decimal flex-col gap-1 pl-5">
							<li>교환학생 및 학교생활 관련 정보 제공</li>
							<li>이용자 간 정보 열람 기능</li>
						</ol>
						<p>
							② 운영진은 운영상 필요에 따라 서비스의 일부 또는 전부를 변경하거나 중단할 수 있습니다.
						</p>
						<p>
							③ 시스템 점검, 서버 장애 등 불가피한 사유가 발생한 경우 서비스 제공이 일시적으로
							중단될 수 있습니다.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제5조 (서비스의 중단)</h2>
						<p>
							① 운영진은 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신의 두절 등의 사유가
							발생한 경우에는 서비스의 제공을 일시적으로 중단할 수 있고, 새로운 서비스로의 교체 기타
							유어슈가 적절하다고 판단하는 사유에 의해 현재 제공되는 서비스를 완전히 중단할 수
							있습니다.
						</p>
						<p>
							② 본 조 제1항에 의한 서비스 중단의 경우에는 운영진은 제9조 제2항에서 정한 방법으로
							이용자에게 통지합니다. 다만, 운영진이 통제할 수 없는 사유로 인한 서비스의 중단으로
							인하여 사전 통지가 불가능한 경우에는 그러하지 아니합니다.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">
							제6조 (이용자의 의무 및 이용 제한)
						</h2>
						<p>① 이용자는 다음 행위를 하여서는 안 됩니다.</p>
						<ol className="flex list-decimal flex-col gap-1 pl-5">
							<li>타인의 권리 침해 또는 서비스 운영 방해 행위</li>
							<li>욕설, 비방, 혐오, 음란 등 부적절한 콘텐츠 게시</li>
							<li>허위 또는 부정확한 정보 게시</li>
							<li>기타 서비스의 정상적 운영을 저해하는 행위</li>
							<li>관련 법령에 위반되거나 선량한 풍속 기타 사회통념에 반하는 행위</li>
						</ol>
						<p>
							② 운영진은 이용자가 본 약관을 위반하는 경우 게시물 삭제, 접근 제한 등 필요한 조치를 할
							수 있습니다.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제7조 (게시물의 관리)</h2>
						<p>① 게시물에 대한 책임은 해당 게시물을 작성한 이용자에게 있습니다.</p>
						<p>
							② 운영진은 다음에 해당하는 게시물을 사전 통지 없이 삭제하거나 접근을 제한할 수
							있습니다.
						</p>
						<ol className="flex list-decimal flex-col gap-1 pl-5">
							<li>타인의 권리를 침해하는 경우</li>
							<li>혐오·음란 등 부적절한 내용을 게시한 경우</li>
							<li>서비스 목적에 현저히 부합하지 않는 경우</li>
							<li>기타 운영상 필요하다고 판단되는 경우</li>
							<li>관련 법령에 위반되거나 선량한 풍속 기타 사회통념에 반하는 경우</li>
						</ol>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제8조 (운영진의 의무)</h2>
						<p>
							① 운영진은 관련 법령 및 본 약관을 준수하며 안정적인 서비스 제공을 위해 노력합니다.
						</p>
						<p>
							② 운영진은 이용자를 직접 식별할 수 있는 개인정보를 수집하지 않는 것을 원칙으로 합니다.
						</p>
						<p>
							③ 다만 서비스 운영 과정에서 접속 기록 등 일부 정보가 자동으로 생성·저장될 수 있습니다.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제9조 (이용자에 대한 통지)</h2>
						<p>① 운영진은 서비스 내 공지사항 등을 통해 이용자에게 통지할 수 있습니다.</p>
						<p>
							② 불특정 다수에 대한 통지는 일정 기간 게시함으로써 개별 통지를 대신할 수 있습니다.
						</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제10조 (면책 조항)</h2>
						<p>① 운영진은 다음 각 호의 경우 책임을 지지 않습니다.</p>
						<ol className="flex list-decimal flex-col gap-1 pl-5">
							<li>천재지변, 시스템 장애 등 불가항력 사유</li>
							<li>이용자의 귀책사유로 인한 손해</li>
							<li>이용자가 게시한 정보의 정확성 및 신뢰성</li>
							<li>이용자 간 또는 이용자와 제3자 간 분쟁</li>
						</ol>
						<p>② 운영진은 서비스 이용을 통해 이용자가 기대하는 특정 결과를 보장하지 않습니다.</p>
					</section>

					<section className="flex flex-col gap-3">
						<h2 className="text-base-900 text-style-body-bold">제11조 (준거법 및 재판관할)</h2>
						<p>
							이 약관은 대한민국 법률에 따라 해석되며, 서비스 이용과 관련한 분쟁은 관련 법령에 따른
							관할 법원에 제기합니다.
						</p>
					</section>

					<section className="flex flex-col gap-2 border-base-300 border-t pt-6 text-style-body-sm">
						<p>이 약관은 서비스의 첫 운영일로부터 시행됩니다.</p>
						<p>갱신일: 2026년 05월 18일</p>
						<p>
							약관 관련 문의는{" "}
							<a className="underline" href="mailto:bonnie.urssu@gmail.com">
								bonnie.urssu@gmail.com
							</a>
							으로 보내주시길 바랍니다.
						</p>
					</section>
				</div>
			</main>
		</div>
	);
}
