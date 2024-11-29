export const env = {
	get AUTH0_DOMAIN() {
		return process.env.EXPO_PUBLIC_AUTH0_DOMAIN;
	},
	get AUTH0_CLIENT_ID() {
		return process.env.EXPO_PUBLIC_AUTH0_CLIENT_ID;
	},
	get CLERK_PUBLISHABLE_KEY() {
		return process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
	},
	get TWO_FACTOR_AUTH_FLOW() {
		return process.env.EXPO_PUBLIC_2FACTOR_AUTH_FLOW;
	}
};
