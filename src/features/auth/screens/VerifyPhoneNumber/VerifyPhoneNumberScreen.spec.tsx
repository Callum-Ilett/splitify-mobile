import type { VerifyPhoneNumberScreenProps } from ".";
import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";

import { VerifyPhoneNumberScreen } from ".";
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

describe("VerifyPhoneNumberScreen", () => {
	let props: VerifyPhoneNumberScreenProps;
	let user: UserEventInstance;

	beforeEach(() => {
		user = userEvent.setup();

		(useRouter as jest.Mock).mockReturnValue({
			push: jest.fn()
		});

		(useAuth as jest.Mock).mockReturnValue({
			sendSMSCode: jest.fn()
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
		render(<VerifyPhoneNumberScreen {...props} />);

		// Act

		// Assert
	});

	it("Should render the heading 'Secure your account 🔒'", () => {
		// Arrange
		props.heading = "Secure your account 🔒";
		render(<VerifyPhoneNumberScreen {...props} />);

		// Act
		const heading = screen.getByText(/Secure your account 🔒/i);

		// Assert
		expect(heading).toBeOnTheScreen();
	});

	it("Should render the text `Enter your phone number below. A SMS will be sent to that number with a OTP code.`", () => {
		// Arrange
		render(<VerifyPhoneNumberScreen {...props} />);

		// Act
		const text = screen.getByText(
			/Enter your phone number below. A SMS will be sent to that number with a OTP code./i
		);

		// Assert
		expect(text).toBeOnTheScreen();
	});

	it("Should successfully send an SMS code and navigate to the 'VerifyCodeScreen' when the form is submitted with valid data", async () => {
		// Arrange
		const mockPush = jest.fn();
		const mockSendSMSCode = jest.fn().mockResolvedValue(undefined);

		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		(useAuth as jest.Mock).mockReturnValue({
			sendSMSCode: mockSendSMSCode
		});

		render(<VerifyPhoneNumberScreen {...props} />);

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

		expect(mockPush).toHaveBeenCalledWith({
			params: { phoneNumber: "+44123456789" },
			pathname: "/verify-code"
		});
	});

	it("Should handle when it fails to send an SMS code", async () => {
		// Arrange
		const mockSendSMSCode = jest.fn().mockRejectedValue(new Error("Failed"));
		const mockPush = jest.fn();

		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		(useAuth as jest.Mock).mockReturnValue({
			sendSMSCode: mockSendSMSCode
		});

		render(<VerifyPhoneNumberScreen {...props} />);

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

		expect(mockPush).not.toHaveBeenCalled();
	});
});
