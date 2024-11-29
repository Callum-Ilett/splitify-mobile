import { env } from "@/env";
import { VerifyEmailScreen } from "@/features/auth/screens/VerifyEmailScreen";
import { VerifyPhoneNumberScreen } from "@/features/auth/screens/VerifyPhoneNumber";

export default function SignIn() {
	if (env.TWO_FACTOR_AUTH_FLOW === "sms") {
		return <VerifyPhoneNumberScreen heading="Sign in" />;
	}

	return <VerifyEmailScreen heading="Sign in" />;
}
