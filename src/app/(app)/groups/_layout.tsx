import { Stack } from "expo-router";

export default function GroupsLayout() {
	return (
		<Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
			<Stack.Screen name="index" options={{ title: "Groups" }} />

			<Stack.Screen name="new-group" options={{ title: "New Group" }} />

			<Stack.Screen name="[id]" options={{ title: "" }} />

			<Stack.Screen
				name="select-participants"
				options={{ title: "Select Participants" }}
			/>

			<Stack.Screen name="add-expense" options={{ title: "Add New Expense" }} />
		</Stack>
	);
}
