import type { ReactNode } from "react";

import { DarkTheme, LightTheme } from "@/theme";
import { ThemeProvider as NavigationThemeProvider } from "@react-navigation/native";
import { useColorScheme } from "react-native";

type ThemeProviderProps = {
	children: ReactNode;
};

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const colorScheme = useColorScheme();

	return (
		<NavigationThemeProvider
			value={colorScheme === "dark" ? DarkTheme : LightTheme}
		>
			{children}
		</NavigationThemeProvider>
	);
};

ThemeProvider.displayName = "ThemeProvider";

export type { ThemeProviderProps };
export { ThemeProvider };
