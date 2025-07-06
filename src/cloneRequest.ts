export function cloneRequest(request: Request): Request {
	const headers = new Headers();
	request.headers.forEach((value, key) => headers.set(key, value));

	return new Request(request.url, {
		method: request.method,
		headers,
		credentials: 'include',
		mode: request.mode,
		redirect: request.redirect,
	});
}
