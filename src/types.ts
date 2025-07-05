/**
 * Simplified auth object types for elysia-clerk
 * These types expose only the essential properties needed by users
 * while hiding internal implementation details
 */

/**
 * Represents an authenticated user session
 */
export interface SignedInAuthObject {
	/**
	 * Whether the user is authenticated
	 */
	isAuthenticated: true;

	/**
	 * The current user's ID
	 */
	userId: string;

	/**
	 * The current session ID
	 */
	sessionId: string;

	/**
	 * The current session claims containing user data and metadata
	 */
	sessionClaims: Record<string, any>;

	/**
	 * The current organization ID (if user is part of an organization)
	 */
	orgId: string | null;

	/**
	 * The current organization role (if user is part of an organization)
	 */
	orgRole: string | null;

	/**
	 * The current organization slug (if user is part of an organization)
	 */
	orgSlug: string | null;

	/**
	 * The current organization permissions (if user is part of an organization)
	 */
	orgPermissions: string[] | null;

	/**
	 * Gets a session token or custom JWT template
	 * @param options - Optional parameters for token generation
	 * @returns Promise resolving to the token string
	 */
	getToken: (options?: {
		template?: string;
		expirationTime?: number;
	}) => Promise<string | null>;

	/**
	 * Checks if the user has a specific role or permission
	 * @param params - Authorization check parameters
	 * @returns Whether the user has the specified authorization
	 */
	has: (params: { role?: string; permission?: string }) => boolean;
}

/**
 * Represents an unauthenticated or signed-out state
 */
export interface SignedOutAuthObject {
	/**
	 * Whether the user is authenticated
	 */
	isAuthenticated: false;

	/**
	 * Always null when signed out
	 */
	userId: null;

	/**
	 * Always null when signed out
	 */
	sessionId: null;

	/**
	 * Always null when signed out
	 */
	sessionClaims: null;

	/**
	 * Always null when signed out
	 */
	orgId: null;

	/**
	 * Always null when signed out
	 */
	orgRole: null;

	/**
	 * Always null when signed out
	 */
	orgSlug: null;

	/**
	 * Always null when signed out
	 */
	orgPermissions: null;

	/**
	 * Returns null when signed out
	 */
	getToken: () => Promise<null>;

	/**
	 * Always returns false when signed out
	 */
	has: () => false;
}

/**
 * Union type representing either authenticated or unauthenticated state
 */
export type AuthObject = SignedInAuthObject | SignedOutAuthObject;

/**
 * Type guard to check if auth object represents a signed-in user
 */
export function isSignedIn(auth: AuthObject): auth is SignedInAuthObject {
	return auth.isAuthenticated === true;
}

/**
 * Type guard to check if auth object represents a signed-out user
 */
export function isSignedOut(auth: AuthObject): auth is SignedOutAuthObject {
	return auth.isAuthenticated === false;
}
