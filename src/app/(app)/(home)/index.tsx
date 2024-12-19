import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function HomeScreen() {
	const router = useRouter();

	return (
		<View className="flex-1 gap-4 p-4">
			<Button onPress={() => router.navigate("/notifications")}>
				Notifications
			</Button>

			<Button onPress={() => router.navigate("/activity")}>Activity</Button>

			<Button onPress={() => router.navigate("/pay")}>Pay</Button>

			<Button onPress={() => router.navigate("/request")}>Request</Button>

			<Button onPress={() => router.navigate("/top-up")}>Top Up</Button>

			<Button onPress={() => router.navigate("/withdraw")}>Withdraw</Button>

			<Button onPress={() => router.navigate("/transaction-history")}>
				Transaction History
			</Button>
		</View>
	);
}
