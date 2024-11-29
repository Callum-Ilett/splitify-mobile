import type { ReactNode } from "react";

import { AuthProvider } from "@/providers/AuthProvider";
import { FontProvider } from "@/providers/FontProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

type ProvidersProps = {
	children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
	return (
		<FontProvider>
			<ThemeProvider>
				<AuthProvider>{children}</AuthProvider>
			</ThemeProvider>
		</FontProvider>
	);
};
Providers.displayName = "Providers";

export type { ProvidersProps };
export { Providers };
