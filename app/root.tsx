import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
	{ href: "https://fonts.googleapis.com", rel: "preconnect" },
	{
		crossOrigin: "anonymous",
		href: "https://fonts.gstatic.com",
		rel: "preconnect",
	},
	{
		href: "https://cdn.jsdelivr.net",
		rel: "preconnect",
	},
	{
		href: "https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css",
		rel: "stylesheet",
	},
	{
		href: "https://fonts.googleapis.com/css2?family=Chilanka&display=swap",
		rel: "stylesheet",
	},
];

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ko">
			<head>
				<meta charSet="utf-8" />
				<meta content="width=device-width, initial-scale=1" name="viewport" />
				<Meta />
				<Links />
			</head>
			<body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						staleTime: 60 * 1000,
					},
				},
			}),
	);

	return (
		<QueryClientProvider client={queryClient}>
			<Outlet />
		</QueryClientProvider>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	let message = "오류 발생!";
	let details = "예기치 않은 오류가 발생했습니다.";
	let stack: string | undefined;

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "오류";
		details =
			error.status === 404 ? "요청하신 페이지를 찾을 수 없습니다." : error.statusText || details;
	} else if (import.meta.env.DEV && error && error instanceof Error) {
		details = error.message;
		stack = error.stack;
	}

	return (
		<main className="container mx-auto p-4 pt-16">
			<h1>{message}</h1>
			<p>{details}</p>
			{stack && (
				<pre className="w-full overflow-x-auto p-4">
					<code>{stack}</code>
				</pre>
			)}
		</main>
	);
}
