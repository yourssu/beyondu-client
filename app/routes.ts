import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("search", "routes/search.tsx"),
	route("detail/:id", "routes/detail.tsx"),
	route("api/meta/nations", "routes/api.meta.nations.ts"),
	route("api/meta/nations-by-region", "routes/api.meta.nations-by-region.ts"),
	route("api/meta/regions", "routes/api.meta.regions.ts"),
	route("api/meta/majors", "routes/api.meta.majors.ts"),
	route("api/meta/language-groups", "routes/api.meta.language-groups.ts"),
	route("api/meta/exam-types", "routes/api.meta.exam-types.ts"),
] satisfies RouteConfig;
