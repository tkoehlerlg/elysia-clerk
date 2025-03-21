import { apiUrlFromPublishableKey } from '@clerk/shared/apiUrlFromPublishableKey';
import { isTruthy } from '@clerk/shared/underscore';

export const API_VERSION = process.env.CLERK_API_VERSION || 'v1';
export const SECRET_KEY = process.env.CLERK_SECRET_KEY || '';
export const PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY || '';
export const API_URL =
	process.env.CLERK_API_URL || apiUrlFromPublishableKey(PUBLISHABLE_KEY);
export const JWT_KEY = process.env.CLERK_JWT_KEY || '';
export const SDK_METADATA = {
	name: PACKAGE_NAME,
	version: PACKAGE_VERSION,
	environment: process.env.NODE_ENV,
};
export const TELEMETRY_DISABLED = isTruthy(
	process.env.CLERK_TELEMETRY_DISABLED,
);
export const TELEMETRY_DEBUG = isTruthy(process.env.CLERK_TELEMETRY_DEBUG);

// Define constants directly to avoid internal imports
export const Headers = {
	Location: 'location',
	Authorization: 'authorization',
	ForwardedProto: 'x-forwarded-proto',
	ForwardedHost: 'x-forwarded-host',
	ForwardedPort: 'x-forwarded-port',
	Forwarded: 'forwarded',
	Host: 'host',
	Origin: 'origin',
	Referer: 'referer',
	SecFetchSite: 'sec-fetch-site',
	SecFetchMode: 'sec-fetch-mode',
	SecFetchDest: 'sec-fetch-dest',
	UserAgent: 'user-agent',
	XForwardedHost: 'x-forwarded-host',
};

export const Cookies = {
	Session: '__session',
	ClientUat: '__client_uat',
	ProxySession: '__proxy_session',
};
