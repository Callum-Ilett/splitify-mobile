import type { ReactNode } from "react";

import { FontProvider } from "@/providers/FontProvider";

type ProvidersProps = {
	children: ReactNode;
};

const Providers = ({ children }: ProvidersProps) => {
	return <FontProvider>{children}</FontProvider>;
};
Providers.displayName = "Providers";

export type { ProvidersProps };
export { Providers };
