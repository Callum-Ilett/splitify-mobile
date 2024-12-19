import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function GroupsScreen() {
	const router = useRouter();

	return (
		<View className="flex-1 gap-4 p-4">
			<Button onPress={() => router.push("/groups/new-group")}>
				Create new group
			</Button>

			<Button onPress={() => router.push("/groups/select-participants")}>
				Select participants
			</Button>

			<Button onPress={() => router.push("/groups/7")}>Group Detail</Button>
		</View>
	);
}
