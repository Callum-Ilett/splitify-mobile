import SplitifyLogo from "./splitify-logo.svg";
import { Button } from "@/components/ui/Button";
import { H3 } from "@/components/ui/Heading";
import { SocialButton } from "@/components/ui/SocialButton";
import { Text } from "@/components/ui/Text";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
	const router = useRouter();

	const handleSignUpPress = () => {
		router.push("/sign-up");
	};

	const handleLoginPress = () => {
		router.push("/sign-in");
	};

	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1 items-center justify-between p-6 pb-9">
				<View className="h-20 w-20 items-center justify-center">
					<SplitifyLogo />
				</View>

				<View>
					<H3 className="text-center">Let's Get Started!</H3>

					<Text className="text-center text-xl text-grey-700">
						With Splitify, expenses split bills is easier than ever before.
					</Text>
				</View>

				<View className="gap-5">
					<SocialButton size="xs" oauth="google">
						Continue with Google
					</SocialButton>

					<SocialButton size="xs" oauth="facebook">
						Continue with Facebook
					</SocialButton>

					<SocialButton size="xs" oauth="twitter">
						Continue with Twitter
					</SocialButton>
				</View>

				<View className="gap-5">
					<Button variant="primary" type="solid" onPress={handleSignUpPress}>
						Sign up
					</Button>

					<Button variant="primary" type="outline" onPress={handleLoginPress}>
						Log in
					</Button>
				</View>

				<View>
					<View className="flex-row items-center gap-3">
						<Text className="text-md text-grey-700">Privacy Policy</Text>
						<View className="h-1 w-1 rounded-full bg-grey-700" />
						<Text className="text-md text-grey-700">Terms of Service</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};
WelcomeScreen.displayName = "WelcomeScreen";

export { WelcomeScreen };
