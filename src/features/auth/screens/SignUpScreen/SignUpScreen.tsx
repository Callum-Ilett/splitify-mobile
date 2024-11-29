import type { Schema as SignUpFormSchema } from "@/features/auth/components/SignUpForm";

import { H3 } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { SignUpForm } from "@/features/auth/components/SignUpForm";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SignUpScreenProps = {
	verificationMethod?: "email" | "sms";
};

const SignUpScreen = ({ verificationMethod }: SignUpScreenProps) => {
	const router = useRouter();

	const onSubmit = (_data: SignUpFormSchema) => {
		if (verificationMethod === "sms") {
			router.push("/verify-phone");
			return;
		}

		router.push("/verify-email");
	};

	return (
		<SafeAreaView className="flex-1 px-6 py-3" edges={["bottom"]}>
			<View className="gap-4">
				<H3>Create account 👩‍💻</H3>

				<Text className="text-xl">Please enter your details below.</Text>
			</View>

			<SignUpForm className="mt-8 flex-1" onSubmit={onSubmit} />
		</SafeAreaView>
	);
};
SignUpScreen.displayName = "SignupScreen";

export type { SignUpScreenProps };
export { SignUpScreen };
