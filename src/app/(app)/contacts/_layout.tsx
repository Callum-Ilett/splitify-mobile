import { Stack } from "expo-router";

export default function ContactsLayout() {
	return (
		<Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
			<Stack.Screen name="index" options={{ title: "Contacts" }} />
			<Stack.Screen name="[id]" options={{ title: "Contact Detail" }} />
		</Stack>
	);
}
