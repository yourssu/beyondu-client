import ky from "ky";

export function createApiClient(baseUrl: string) {
	return ky.create({
		prefixUrl: baseUrl,
		timeout: 10_000,
		retry: 0,
	});
}
