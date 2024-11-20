import { Stack } from "expo-router";

import "../global.css";
import "@/i18n";

import { Providers } from "@/providers";

export default function RootLayout() {
	return (
		<Providers>
			<Stack />
		</Providers>
	);
}
