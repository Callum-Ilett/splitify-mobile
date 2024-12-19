import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

export default function GroupDetailScreen() {
	const { id } = useLocalSearchParams();

	const router = useRouter();

	return (
		<View>
			<Text>Group Detail: {id}</Text>

			<Button onPress={() => router.push("/groups/add-expense")}>
				Add Expense
			</Button>
		</View>
	);
}
