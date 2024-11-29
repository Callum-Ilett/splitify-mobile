import { VerifyCodeScreen } from "@/features/auth/screens/VerifyCodeScreen";
import { useLocalSearchParams } from "expo-router";

type VerifyCodeRouteParams = {
	email?: string;

	phoneNumber?: string;
};

export default function VerifyCode() {
	const { email, phoneNumber } = useLocalSearchParams<VerifyCodeRouteParams>();

	if (email) {
		return <VerifyCodeScreen flow="email" email={email} />;
	}

	if (phoneNumber) {
		return <VerifyCodeScreen flow="sms" phoneNumber={phoneNumber} />;
	}

	return null;
}
