import { Stack } from "expo-router";

import "../global.css";

import { Providers } from "@/providers";

export default function RootLayout() {
	return (
		<Providers>
			<Stack />
		</Providers>
	);
}
