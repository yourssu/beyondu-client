import ky from "ky";

export function createApiClient(baseUrl: string) {
	return ky.create({
		prefixUrl: baseUrl,
	});
}
