import type { ReactNode } from "react";

import { useEffect } from "react";
import {
	Urbanist_100Thin,
	Urbanist_200ExtraLight,
	Urbanist_300Light,
	Urbanist_400Regular,
	Urbanist_500Medium,
	Urbanist_600SemiBold,
	Urbanist_700Bold,
	useFonts
} from "@expo-google-fonts/urbanist";
import * as SplashScreen from "expo-splash-screen";

type FontProviderProps = {
	children: ReactNode;
};

const FontProvider = ({ children }: FontProviderProps) => {
	const [fontsLoaded, fontError] = useFonts({
		Urbanist_100Thin,
		Urbanist_200ExtraLight,
		Urbanist_300Light,
		Urbanist_400Regular,
		Urbanist_500Medium,
		Urbanist_600SemiBold,
		Urbanist_700Bold
	});

	useEffect(() => {
		SplashScreen.preventAutoHideAsync();
	}, []);

	useEffect(() => {
		async function hideSplashScreen() {
			if (!fontsLoaded && !fontError) return;

			try {
				await SplashScreen.hideAsync();
			} catch (error) {
				console.error("Error hiding splash screen:", error);
			}
		}
		hideSplashScreen();
	}, [fontsLoaded, fontError]);

	if (!fontsLoaded && !fontError) {
		return null;
	}

	return <>{children}</>;
};
FontProvider.displayName = "FontProvider";

export type { FontProviderProps };
export { FontProvider };
