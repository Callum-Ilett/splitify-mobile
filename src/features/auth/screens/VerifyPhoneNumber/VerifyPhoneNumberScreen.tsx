import type { Schema as VerifyPhoneNumberFormSchema } from "@/features/auth/components/VerifyPhoneNumberForm";

import { H3 } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { VerifyPhoneNumberForm } from "@/features/auth/components/VerifyPhoneNumberForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { formatPhoneNumber } from "@/features/auth/utils";
import { useRouter } from "expo-router";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type VerifyPhoneNumberScreenProps = {
	heading: string;
};

const VerifyPhoneNumberScreen = ({ heading }: VerifyPhoneNumberScreenProps) => {
	const router = useRouter();
	const { sendSMSCode } = useAuth();

	const onSubmit = async (data: VerifyPhoneNumberFormSchema) => {
		const { callingCode, phoneNumber } = data;

		const formattedPhoneNumber = formatPhoneNumber({
			callingCode,
			phoneNumber
		});

		try {
			console.log("Sending SMS code to phone number:", formattedPhoneNumber);
			await sendSMSCode({
				phoneNumber: formattedPhoneNumber,
				send: "code"
			});

			router.push({
				pathname: "/verify-code",
				params: { phoneNumber: formattedPhoneNumber }
			});
		} catch (error) {
			console.error("Error sending SMS code", error);
		}
	};

	return (
		<SafeAreaView className="flex-1 px-6 py-3" edges={["bottom"]}>
			<View className="gap-4">
				<H3>{heading}</H3>

				<Text className="text-xl">
					Enter your phone number below. A SMS will be sent to that number with
					a OTP code.
				</Text>
			</View>

			<VerifyPhoneNumberForm className="mt-8 flex-1" onSubmit={onSubmit} />
		</SafeAreaView>
	);
};
VerifyPhoneNumberScreen.displayName = "VerifyPhoneNumberScreen";

export type { VerifyPhoneNumberScreenProps };
export { VerifyPhoneNumberScreen };
