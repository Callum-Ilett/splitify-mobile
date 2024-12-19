import { Button } from "@/components/ui/Button";
import { useRouter } from "expo-router";

export default function NewGroupScreen() {
	const router = useRouter();

	return (
		<Button onPress={() => router.navigate("/groups/select-participants")}>
			Select participants
		</Button>
	);
}
