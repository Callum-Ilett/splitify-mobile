import { Stack } from "expo-router";
import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react-native";
import { Pressable } from "react-native";

export default function HomeLayout() {
	return (
		<Stack screenOptions={{ headerBackButtonDisplayMode: "minimal" }}>
			<Stack.Screen
				name="index"
				options={({ navigation }) => ({
					title: "Home",
					headerRight: ({ tintColor }) => (
						<Pressable onPress={() => navigation.navigate("notifications")}>
							<BellIcon color={tintColor} />
						</Pressable>
					)
				})}
			/>

			<Stack.Screen
				name="notifications"
				options={({ navigation }) => ({
					title: "Notifications",
					headerRight: ({ tintColor }) => (
						<Pressable>
							<SettingsIcon color={tintColor} />
						</Pressable>
					)
				})}
			/>

			<Stack.Screen
				name="activity"
				options={({ navigation }) => ({
					title: "Activity",
					headerRight: ({ tintColor }) => (
						<Pressable onPress={() => navigation.navigate("pay")}>
							<SearchIcon color={tintColor} />
						</Pressable>
					)
				})}
			/>

			<Stack.Screen name="pay" options={{ title: "Pay" }} />
			<Stack.Screen name="request" options={{ title: "Request" }} />
			<Stack.Screen name="top-up" options={{ title: "Amount to Top Up" }} />
			<Stack.Screen name="withdraw" options={{ title: "Amount to Withdraw" }} />

			<Stack.Screen
				name="transaction-history"
				options={({ navigation }) => ({
					title: "Transaction History",
					headerRight: ({ tintColor }) => (
						<Pressable onPress={() => navigation.navigate("pay")}>
							<SearchIcon color={tintColor} />
						</Pressable>
					)
				})}
			/>
		</Stack>
	);
}
