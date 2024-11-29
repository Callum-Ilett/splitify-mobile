import { useAuth } from "@/features/auth/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
	const { isLoading, user } = useAuth();

	if (isLoading) {
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="small" aria-label="Loading..." />
			</View>
		);
	}

	if (!user) {
		return <Redirect href="/welcome" />;
	}

	return (
		<Stack>
			<Stack.Screen name="index" />
			<Stack.Screen name="home" />
		</Stack>
	);
}
