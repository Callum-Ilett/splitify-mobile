import type { VerifyEmailScreenProps } from "./VerifyEmailScreen";
import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";

import { VerifyEmailScreen } from "./VerifyEmailScreen";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
	render,
	screen,
	userEvent,
	waitFor
} from "@testing-library/react-native";
import { useRouter } from "expo-router";

jest.mock("expo-router");
jest.mock("@/features/auth/hooks/useAuth");

describe("VerifyEmailScreen", () => {
	let props: VerifyEmailScreenProps;
	let user: UserEventInstance;

	beforeEach(() => {
		user = userEvent.setup();

		(useRouter as jest.Mock).mockReturnValue({
			push: jest.fn()
		});

		(useAuth as jest.Mock).mockReturnValue({
			sendEmailCode: jest.fn()
		});

		props = {
			heading: ""
		};

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should render without any errors", () => {
		// Arrange
		render(<VerifyEmailScreen {...props} />);

		// Act

		// Assert
	});

	it("Should render the heading 'Secure your account 🔒'", () => {
		// Arrange
		props.heading = "Secure your account 🔒";
		render(<VerifyEmailScreen {...props} />);

		// Act
		const heading = screen.getByText(/Secure your account 🔒/i);

		// Assert
		expect(heading).toBeOnTheScreen();
	});

	it("Should render the text 'Enter your email below. A verification code will be sent to that email.'", () => {
		// Arrange
		render(<VerifyEmailScreen {...props} />);

		// Act
		const text = screen.getByText(
			/Enter your email below. A verification code will be sent to that email./i
		);

		// Assert
		expect(text).toBeOnTheScreen();
	});

	it("Should successfully send an email code and navigate to the 'VerifyCodeScreen' when the form is submitted with valid data", async () => {
		// Arrange
		const mockPush = jest.fn();
		const mockSendEmailCode = jest.fn().mockResolvedValue(undefined);

		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		(useAuth as jest.Mock).mockReturnValue({
			sendEmailCode: mockSendEmailCode
		});

		render(<VerifyEmailScreen {...props} />);

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

		expect(mockPush).toHaveBeenCalledWith({
			pathname: "/verify-code",
			params: { email: "test@example.com" }
		});
	});

	it("Should handle when it fails to send an email code", async () => {
		// Arrange
		const mockSendEmailCode = jest.fn().mockRejectedValue(new Error("Failed"));
		const mockPush = jest.fn();

		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		(useAuth as jest.Mock).mockReturnValue({
			sendEmailCode: mockSendEmailCode
		});

		render(<VerifyEmailScreen {...props} />);

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

		expect(mockPush).not.toHaveBeenCalled();
	});
});
