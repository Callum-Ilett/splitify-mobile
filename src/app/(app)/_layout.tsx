import { useAuth } from "@/features/auth/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import { GroupIcon, HomeIcon, UserIcon, UsersIcon } from "lucide-react-native";
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
		<Tabs
			screenOptions={{
				headerShown: false
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, size }) => (
						<HomeIcon color={color} size={size} />
					)
				}}
			/>

			<Tabs.Screen
				name="groups"
				options={{
					tabBarLabel: "Groups",
					tabBarIcon: ({ color, size }) => (
						<GroupIcon color={color} size={size} />
					)
				}}
			/>

			<Tabs.Screen
				name="contacts"
				options={{
					tabBarLabel: "Contacts",
					tabBarIcon: ({ color, size }) => (
						<UsersIcon color={color} size={size} />
					)
				}}
			/>

			<Tabs.Screen
				name="account"
				options={{
					tabBarLabel: "Account",
					tabBarIcon: ({ color, size }) => (
						<UserIcon color={color} size={size} />
					)
				}}
			/>
		</Tabs>
	);
}
