import type { Schema as VerifyCodeFormSchema } from "@/features/auth/components/VerifyCodeForm";

import { H3 } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import { VerifyCodeForm } from "@/features/auth/components/VerifyCodeForm/VerifyCodeForm";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { redactPhoneNumber } from "@/features/auth/utils";
import { Trans } from "react-i18next";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type EmailCodeVerificationFlow = {
	flow: "email";
	email: string;
};

type SMSCodeVerificationFlow = {
	flow: "sms";
	phoneNumber: string;
};

type VerifyCodeScreenProps =
	| EmailCodeVerificationFlow
	| SMSCodeVerificationFlow;

const VerifyCodeScreen = (props: VerifyCodeScreenProps) => {
	const { authorizeWithSMS, authorizeWithEmail, sendSMSCode, sendEmailCode } =
		useAuth();

	const { flow } = props;

	const handleResendCode = async () => {
		if (flow === "email") {
			const { email } = props;

			try {
				console.log("Sending email code to:", email);
				await sendEmailCode({ email });
			} catch (error) {
				console.error("Error sending email code", error);
			}
		}

		if (flow === "sms") {
			const { phoneNumber } = props;

			try {
				console.log("Sending SMS code to:", phoneNumber);
				await sendSMSCode({ phoneNumber });
			} catch (error) {
				console.error("Error sending SMS code", error);
			}
		}
	};

	const onSubmit = async (data: VerifyCodeFormSchema) => {
		const { code } = data;

		if (flow === "email") {
			const { email } = props;

			try {
				console.log("Authorizing with email code:", code, "for email:", email);
				await authorizeWithEmail({ code, email });
			} catch (error) {
				console.error("Error authorizing with email", error);
			}
		}

		if (flow === "sms") {
			const { phoneNumber } = props;

			try {
				console.log(
					"Authorizing with SMS code:",
					code,
					"for phone number:",
					phoneNumber
				);
				await authorizeWithSMS({ code, phoneNumber });
			} catch (error) {
				console.error("Error authorizing with SMS", error);
			}
		}
	};

	return (
		<SafeAreaView className="flex-1 px-6 py-3" edges={["bottom"]}>
			<View className="gap-4">
				<H3>OTP code verification 🔐</H3>

				{flow === "email" && (
					<Text className="text-xl" skipTranslation>
						<Trans
							i18nKey="verification.email.otpSent"
							values={{ email: props.email }}
							components={[
								<Text className="text-xl font-bold text-primary-900 dark:text-primary-900" />
							]}
						/>
					</Text>
				)}

				{flow === "sms" && (
					<Text className="text-xl" skipTranslation>
						<Trans
							i18nKey="verification.sms.otpSent"
							values={{ phoneNumber: redactPhoneNumber(props.phoneNumber) }}
							components={[
								<Text className="text-xl font-bold text-primary-900 dark:text-primary-900" />
							]}
						/>
					</Text>
				)}
			</View>

			<VerifyCodeForm
				className="mt-8 flex-1"
				onSubmit={onSubmit}
				onResendCodePress={handleResendCode}
			/>
		</SafeAreaView>
	);
};
VerifyCodeScreen.displayName = "VerifyCodeScreen";

export type { VerifyCodeScreenProps };
export { VerifyCodeScreen };
