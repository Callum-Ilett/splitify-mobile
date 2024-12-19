import { Text } from "@/components/ui/Text";
import { useLocalSearchParams } from "expo-router";

export default function ContactDetailScreen() {
	const { id } = useLocalSearchParams();

	return <Text>Contact Detail: {id}</Text>;
}
