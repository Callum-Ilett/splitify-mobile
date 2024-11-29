// import type { Credentials } from "react-native-auth0";

import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";
import { useAuth } from "@/features/auth/hooks/useAuth";

// import { Button } from "@/components/ui/Button";
// import { Text } from "@/components/ui/Text";
// import { useAuth } from "@/features/auth/hooks/useAuth";
// import { useEffect, useState } from "react";
// import { ScrollView } from "react-native";

// export default function HomeScreen() {
// 	const [isCredentialsValid, setIsCredentialsValid] = useState(false);
// 	const [credentials, setCredentials] = useState<Credentials>();

// 	const { user, hasValidCredentials, getCredentials, clearCredentials } =
// 		useAuth();

// 	useEffect(() => {
// 		const checkCredentials = async () => {
// 			try {
// 				const isValid = await hasValidCredentials();
// 				setIsCredentialsValid(isValid);
// 			} catch (error) {
// 				console.error(error);
// 			}
// 		};

// 		checkCredentials();
// 	}, [hasValidCredentials]);

// 	useEffect(() => {
// 		const fetchCredentials = async () => {
// 			const credentials = await getCredentials();
// 			setCredentials(credentials);
// 		};

// 		fetchCredentials();
// 	}, [getCredentials]);

// 	const handleLogoutPress = async () => {
// 		try {
// 			await clearCredentials();
// 		} catch (error) {
// 			console.error("Log out cancelled", error);
// 		}
// 	};

// 	return (
// 		<ScrollView className="flex-1">
// 			<Text>Home Screen - Authenticated</Text>
// 			<Button onPress={handleLogoutPress}>Logout</Button>
// 			<Text>isCredentialsValid: {isCredentialsValid.toString()}</Text>
// 			<Text>user: {JSON.stringify(user, null, 2)}</Text>
// 			<Text>credentials: {JSON.stringify(credentials, null, 2)}</Text>
// 		</ScrollView>
// 	);
// }

export default function HomeScreen() {
	const { clearCredentials } = useAuth();

	return <Button onPress={clearCredentials}>Logout</Button>;
}
