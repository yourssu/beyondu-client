import { isRouteErrorResponse, Link } from "react-router";

interface RouteErrorFallbackProps {
	error: unknown;
	notFoundMessage?: string;
}

export function RouteErrorFallback({
	error,
	notFoundMessage = "요청하신 페이지가 존재하지 않습니다.",
}: RouteErrorFallbackProps) {
	const is404 = isRouteErrorResponse(error) && error.status === 404;

	return (
		<div className="flex min-h-screen flex-col items-center justify-center gap-6">
			<h1 className="text-base-900 text-style-heading-lg">
				{is404 ? "페이지를 찾을 수 없습니다" : "오류가 발생했습니다"}
			</h1>
			<p className="text-base-700 text-style-body">
				{is404 ? notFoundMessage : "잠시 후 다시 시도해주세요."}
			</p>
			<Link className="text-primary-brown text-style-body-bold underline" to="/">
				홈으로 돌아가기
			</Link>
		</div>
	);
}
