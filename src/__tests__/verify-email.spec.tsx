import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";
import type {
	MockContextConfig,
	RenderRouterOptions
} from "expo-router/testing-library";

import VerifyCode from "@/app/verify-code";
import VerifyEmail from "@/app/verify-email";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
	renderRouter,
	screen,
	userEvent,
	waitFor
} from "expo-router/testing-library";

jest.mock("@/features/auth/hooks/useAuth");

describe("verify-email", () => {
	let mockRouter: MockContextConfig | undefined;
	let user: UserEventInstance;

	const options: RenderRouterOptions = {
		initialUrl: "verify-email"
	};

	beforeEach(() => {
		mockRouter = undefined;
		user = userEvent.setup();

		(useAuth as jest.Mock).mockReturnValue({
			sendEmailCode: jest.fn()
		});

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.resetAllMocks();
	});

	it("Should render without any issues", () => {
		// Arrange
		mockRouter = {
			"verify-email": VerifyEmail
		};

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/verify-email");
	});

	it("Should be able to navigate to verify-code route when email OTP code is sent", async () => {
		// Arrange
		mockRouter = {
			"verify-email": VerifyEmail,
			"verify-code": VerifyCode
		};

		const mockSendEmailCode = jest.fn().mockResolvedValue(undefined);

		(useAuth as jest.Mock).mockReturnValue({
			sendEmailCode: mockSendEmailCode
		});

		renderRouter(mockRouter, options);

		// Act
		const emailInput = screen.getByLabelText(/Email/i);
		await user.type(emailInput, "test@example.com");

		const continueButton = screen.getByText(/Continue/i);
		await userEvent.press(continueButton);

		// Assert
		await waitFor(() => {
			expect(mockSendEmailCode).toHaveBeenCalledWith({
				email: "test@example.com",
				send: "code"
			});
		});

		expect(screen).toHavePathname("/verify-code");
	});
});
