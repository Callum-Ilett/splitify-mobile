import { env } from "@/env";
import { SignUpScreen } from "@/features/auth/screens/SignUpScreen";

export default function SignUp() {
	return <SignUpScreen verificationMethod={env.TWO_FACTOR_AUTH_FLOW} />;
}
