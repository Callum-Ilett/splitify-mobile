import { Stack } from "expo-router";

export default function AccountLayout() {
	return (
		<Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
			<Stack.Screen name="index" options={{ title: "Account" }} />
		</Stack>
	);
}
