export async function cloneRequest(request: Request): Promise<Request> {
	const standardHeaders = new Headers();
	request.headers.forEach((value, key) => {
		standardHeaders.append(key, value);
	});

	return new Request(request.url, {
		method: request.method,
		headers: standardHeaders,
		body: request.body ? request.clone().body : undefined,
		duplex: request.body ? 'half' : undefined,
	});
}
