import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";
import type {
	MockContextConfig,
	RenderRouterOptions
} from "expo-router/testing-library";

import VerifyCode from "@/app/verify-code";
import VerifyPhone from "@/app/verify-phone";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
	renderRouter,
	screen,
	userEvent,
	waitFor
} from "expo-router/testing-library";

jest.mock("@/features/auth/hooks/useAuth");

describe("verify-phone", () => {
	let mockRouter: MockContextConfig | undefined;
	let user: UserEventInstance;

	const options: RenderRouterOptions = {
		initialUrl: "verify-phone"
	};

	beforeEach(() => {
		mockRouter = undefined;
		user = userEvent.setup();

		(useAuth as jest.Mock).mockReturnValue({
			sendSMSCode: jest.fn()
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
			"verify-phone": VerifyPhone
		};

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/verify-phone");
	});

	it("Should be able to navigate to verify-code route when SMS OTP code is sent", async () => {
		// Arrange
		mockRouter = {
			"verify-phone": VerifyPhone,
			"verify-code": VerifyCode
		};

		const mockSendSMSCode = jest.fn().mockResolvedValue(undefined);

		(useAuth as jest.Mock).mockReturnValue({
			sendSMSCode: mockSendSMSCode
		});

		renderRouter(mockRouter, options);

		// Act
		const phoneNumberInput = screen.getByLabelText(/Phone Number/i);
		await user.type(phoneNumberInput, "123456789");

		const continueButton = screen.getByText(/Continue/i);
		await userEvent.press(continueButton);

		// Assert
		await waitFor(() => {
			expect(mockSendSMSCode).toHaveBeenCalledWith({
				phoneNumber: "+44123456789",
				send: "code"
			});
		});

		expect(screen).toHavePathname("/verify-code");
	});
});
