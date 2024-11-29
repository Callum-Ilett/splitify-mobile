import type { ReactNode } from "react";

import { env } from "@/env";
import { Auth0Provider } from "react-native-auth0";

type AuthProviderProps = {
	children: ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
	const domain = env.AUTH0_DOMAIN;
	const clientId = env.AUTH0_CLIENT_ID;

	return (
		<Auth0Provider domain={domain} clientId={clientId}>
			{children}
		</Auth0Provider>
	);
};
AuthProvider.displayName = "AuthProvider";

export type { AuthProviderProps };
export { AuthProvider };
