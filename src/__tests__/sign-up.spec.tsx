import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";
import type {
	MockContextConfig,
	RenderRouterOptions
} from "expo-router/testing-library";

import SignUp from "@/app/sign-up";
import VerifyEmail from "@/app/verify-email";
import VerifyPhone from "@/app/verify-phone";
import { env } from "@/env";
import {
	renderRouter,
	screen,
	userEvent,
	waitFor
} from "expo-router/testing-library";

describe("sign-up", () => {
	let mockRouter: MockContextConfig | undefined;
	let user: UserEventInstance;

	const options: RenderRouterOptions = {
		initialUrl: "sign-up"
	};

	beforeEach(() => {
		mockRouter = undefined;
		user = userEvent.setup();

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.resetAllMocks();
	});

	it("Should render without any errors", () => {
		// Arrange
		mockRouter = {
			"sign-up": SignUp
		};

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/sign-up");
	});

	it("Should be able to navigate to the verify-email screen after submitting the sign-up form", async () => {
		// Arrange
		jest.spyOn(env, "TWO_FACTOR_AUTH_FLOW", "get").mockReturnValue("email");

		mockRouter = {
			"sign-up": SignUp,
			"verify-email": VerifyEmail,
			"verify-phone": VerifyPhone
		};

		renderRouter(mockRouter, options);

		// Act
		const firstNameInput = screen.getByLabelText(/First Name/i);
		const lastNameInput = screen.getByLabelText(/Last Name/i);
		const agreeToTermsCheckbox = screen.getByLabelText(
			/Agree to terms & policy/i
		);
		const signupButton = screen.getByText(/Sign up/i);

		await user.type(firstNameInput, "John");
		await user.type(lastNameInput, "Doe");
		await user.press(agreeToTermsCheckbox);
		await user.press(signupButton);

		// Assert
		await waitFor(() => {
			expect(screen).toHavePathname("/verify-email");
		});
	});

	it("Should be able to navigate to the verify-phone screen after submitting the sign-up form", async () => {
		// Arrange
		jest.spyOn(env, "TWO_FACTOR_AUTH_FLOW", "get").mockReturnValue("sms");

		mockRouter = {
			"sign-up": SignUp,
			"verify-phone": VerifyPhone,
			"verify-email": VerifyEmail
		};

		renderRouter(mockRouter, options);

		// Act
		const firstNameInput = screen.getByLabelText(/First Name/i);
		const lastNameInput = screen.getByLabelText(/Last Name/i);
		const agreeToTermsCheckbox = screen.getByLabelText(
			/Agree to terms & policy/i
		);
		const signupButton = screen.getByText(/Sign up/i);

		await user.type(firstNameInput, "John");
		await user.type(lastNameInput, "Doe");
		await user.press(agreeToTermsCheckbox);
		await user.press(signupButton);

		// Assert
		await waitFor(() => {
			expect(screen).toHavePathname("/verify-phone");
		});
	});
});
