declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production" | "test";
			EXPO_PUBLIC_AUTH0_DOMAIN: string;
			EXPO_PUBLIC_AUTH0_CLIENT_ID: string;
			EXPO_PUBLIC_2FACTOR_AUTH_FLOW: "email" | "sms";
		}
	}
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
