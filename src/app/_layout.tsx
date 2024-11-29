import { Stack } from "expo-router";

import "../global.css";
import "@/i18n";

import { Providers } from "@/providers";
import colors from "@/theme/colors";
import { ChevronLeft } from "lucide-react-native";
import { Pressable, useColorScheme } from "react-native";

export default function RootLayout() {
	const theme = useColorScheme();

	return (
		<Providers>
			<Stack
				screenOptions={({ navigation }) => ({
					headerBackButtonDisplayMode: "minimal",
					headerShadowVisible: false,
					headerLeft: () => (
						<Pressable className="ml-2" onPress={() => navigation.goBack()}>
							<ChevronLeft
								color={theme === "dark" ? colors.white : colors.grey[900]}
								size={24}
							/>
						</Pressable>
					)
				})}
			>
				<Stack.Screen name="welcome" options={{ headerShown: false }} />
				<Stack.Screen name="sign-up" options={{ title: "" }} />
				<Stack.Screen name="sign-in" options={{ title: "" }} />
				<Stack.Screen name="verify-email" options={{ title: "" }} />
				<Stack.Screen name="verify-phone" options={{ title: "" }} />
				<Stack.Screen name="verify-code" options={{ title: "" }} />
			</Stack>
		</Providers>
	);
}
