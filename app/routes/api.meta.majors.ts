import { createApiClient, getMajors } from "~/shared/api";

import type { Route } from "./+types/api.meta.majors";

export async function loader({ context }: Route.LoaderArgs) {
	const client = createApiClient(context.cloudflare.env.API_BASE_URL);
	const response = await getMajors(client);

	return Response.json(response);
}
