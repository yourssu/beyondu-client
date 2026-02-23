import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("search", "routes/search.tsx"),
	route("detail/:id", "routes/detail.tsx"),
] satisfies RouteConfig;
