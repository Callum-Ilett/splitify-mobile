import type {
	MockContextConfig,
	RenderRouterOptions
} from "expo-router/testing-library";

import SignIn from "@/app/sign-in";
import VerifyPhone from "@/app/verify-phone";
import { env } from "@/env";
import { renderRouter, screen } from "expo-router/testing-library";

describe("sign-in", () => {
	let mockRouter: MockContextConfig | undefined;

	const options: RenderRouterOptions = {
		initialUrl: "sign-in"
	};

	beforeEach(() => {
		mockRouter = undefined;

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.resetAllMocks();
	});

	it("Should render without any errors", () => {
		// Arrange
		mockRouter = {
			"sign-in": SignIn
		};

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/sign-in");
	});

	it("Should render the verify-email screen when the TWO_FACTOR_AUTH_FLOW is set to email", () => {
		// Arrange
		jest.spyOn(env, "TWO_FACTOR_AUTH_FLOW", "get").mockReturnValue("email");

		mockRouter = {
			"sign-in": SignIn
		};

		renderRouter(mockRouter, options);

		// Act
		const heading = screen.getByText(/Sign in/i);
		const description = screen.getByText(
			/Enter your email below. A verification code will be sent to that email./i
		);

		// Assert
		expect(screen).toHavePathname("/sign-in");
		expect(heading).toBeOnTheScreen();
		expect(description).toBeOnTheScreen();
	});

	it("Should render the verify-phone screen when the TWO_FACTOR_AUTH_FLOW is set to sms", () => {
		// Arrange
		jest.spyOn(env, "TWO_FACTOR_AUTH_FLOW", "get").mockReturnValue("sms");

		mockRouter = {
			"sign-in": SignIn,
			"verify-phone": VerifyPhone
		};

		renderRouter(mockRouter, options);

		// Act
		const heading = screen.getByText(/Sign in/i);
		const description = screen.getByText(
			/Enter your phone number below. A SMS will be sent to that number with a OTP code./i
		);

		// Assert
		expect(screen).toHavePathname("/sign-in");
		expect(heading).toBeOnTheScreen();
		expect(description).toBeOnTheScreen();
	});
});
