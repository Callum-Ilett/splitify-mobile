import type { Schema as VerifyEmailFormSchema } from "@/features/auth/components/VerifyEmailForm";

import { H3 } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { VerifyEmailForm } from "@/features/auth/components/VerifyEmailForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type VerifyEmailScreenProps = {
	heading: string;
};

const VerifyEmailScreen = ({ heading }: VerifyEmailScreenProps) => {
	const router = useRouter();
	const { sendEmailCode } = useAuth();

	const onSubmit = async (data: VerifyEmailFormSchema) => {
		const { email } = data;

		try {
			console.log("Sending email code to email:", email);
			await sendEmailCode({ email, send: "code" });

			router.push({ pathname: "/verify-code", params: { email } });
		} catch {
			console.error("Error sending Email code");
		}
	};

	return (
		<SafeAreaView className="flex-1 px-6 py-3" edges={["bottom"]}>
			<View className="gap-4">
				<H3>{heading}</H3>

				<Text className="text-xl">
					Enter your email below. A verification code will be sent to that
					email.
				</Text>
			</View>

			<VerifyEmailForm className="mt-8 flex-1" onSubmit={onSubmit} />
		</SafeAreaView>
	);
};
VerifyEmailScreen.displayName = "VerifyEmailScreen";

export type { VerifyEmailScreenProps };
export { VerifyEmailScreen };
