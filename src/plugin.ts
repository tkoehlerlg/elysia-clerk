import type {
	AuthenticateRequestOptions,
	SignedInAuthObject,
	SignedOutAuthObject,
} from '@clerk/backend/internal';
import { TokenType } from '@clerk/backend/internal';
import type { PendingSessionOptions } from '@clerk/types';
import { Elysia } from 'elysia';
import { clerkClient } from './clerkClient';
import * as constants from './constants';

export type StringOrFunction = string | (() => string);

function resolveStringOrFunction(value: StringOrFunction): string {
	if (typeof value === 'function') return value();
	return value;
}

export type ElysiaClerkOptions = Omit<
	AuthenticateRequestOptions,
	'acceptsToken' | 'secretKey' | 'publishableKey'
> & {
	secretKey?: StringOrFunction;
	publishableKey?: StringOrFunction;
	verbose?: boolean;
};

const HandshakeStatus = 'handshake';
const LocationHeader = 'location';

type SessionAuthObject = SignedInAuthObject | SignedOutAuthObject;

export function clerkPlugin(options?: ElysiaClerkOptions) {
	return new Elysia({
		name: 'elysia-clerk',
		seed: options,
	})
		.resolve(async ({ request, set }) => {
			const verboseLog = (...message: unknown[]) => {
				if (options?.verbose) console.log('[elysia-clerk]', ...message);
			};
			verboseLog('options:', options);
			const secretKey = resolveStringOrFunction(
				options?.secretKey ?? constants.SECRET_KEY,
			);
			const publishableKey = resolveStringOrFunction(
				options?.publishableKey ?? constants.PUBLISHABLE_KEY,
			);
			verboseLog(`secretKey: ${secretKey}, publishableKey: ${publishableKey}`);

			const requestState = await clerkClient.authenticateRequest(request, {
				...options,
				secretKey,
				publishableKey,
				acceptsToken: TokenType.SessionToken,
			});

			const auth = (options?: PendingSessionOptions) =>
				requestState.toAuth(options) as SessionAuthObject;

			requestState.headers.forEach((value, key) => {
				set.headers[key] = value;
			});

			const locationHeader = requestState.headers.get(LocationHeader);
			if (locationHeader) {
				// Trigger a handshake redirect
				set.status = 307;
				return {
					auth,
				};
			}

			if (requestState.status === HandshakeStatus) {
				throw new Error('Clerk: handshake status without redirect');
			}

			verboseLog(`requestState: ${requestState}`);

			return {
				auth,
			};
		})
		.as('plugin');
}
