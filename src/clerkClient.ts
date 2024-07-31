import { createClerkClient } from '@clerk/backend';

import {
	API_URL,
	API_VERSION,
	JWT_KEY,
	SDK_METADATA,
	SECRET_KEY,
	TELEMETRY_DISABLED,
	TELEMETRY_DEBUG,
} from './constants';

export const clerkClient = createClerkClient({
	secretKey: SECRET_KEY,
	apiUrl: API_URL,
	apiVersion: API_VERSION,
	jwtKey: JWT_KEY,
	userAgent: `${PACKAGE_NAME}@${PACKAGE_VERSION}`,
	sdkMetadata: SDK_METADATA,
	telemetry: {
    disabled: TELEMETRY_DISABLED,
    debug: TELEMETRY_DEBUG,
  },
});
