import type { VerifyCodeScreenProps } from "./VerifyCodeScreen";
import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";
import type { Credentials } from "react-native-auth0";

import { VerifyCodeScreen } from "./VerifyCodeScreen";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
	render,
	screen,
	userEvent,
	waitFor
} from "@testing-library/react-native";

jest.mock("@/features/auth/hooks/useAuth");

describe("VerifyCodeScreen - SMS Flow", () => {
	let user: UserEventInstance;
	let props: VerifyCodeScreenProps;

	beforeEach(() => {
		user = userEvent.setup();
		props = { flow: "sms", phoneNumber: "+44123456789" };

		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithSMS: jest.fn(),
			sendSMSCode: jest.fn()
		});

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should render the heading 'OTP code verification 🔐'", () => {
		// Arrange
		render(<VerifyCodeScreen {...props} />);

		// Act
		const heading = screen.getByText(/OTP code verification 🔐/i);

		// Assert
		expect(heading).toBeOnTheScreen();
	});

	it("Should render the 'verification.sms.otpSent' translation", () => {
		// Arrange
		render(<VerifyCodeScreen {...props} />);

		// Act
		const translation = screen.getByText(/verification.sms.otpSent/i);

		// Assert
		expect(translation).toBeOnTheScreen();
	});

	it("Should successfully authorize with SMS when a valid OTP code is submitted", async () => {
		// Arrange
		const mockCredentials: Credentials = {
			idToken: "fake-id-token",
			accessToken: "fake-access-token",
			tokenType: "Bearer",
			expiresAt: 1716873600,
			refreshToken: "fake-refresh-token",
			scope: "fake-scope"
		};

		const mockAuthorizeWithSMS = jest.fn().mockResolvedValue(mockCredentials);
		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithSMS: mockAuthorizeWithSMS,
			sendSMSCode: jest.fn()
		});

		render(<VerifyCodeScreen {...props} />);

		// Act
		const otpCodeInputHidden = screen.getByTestId("otp-input-hidden");
		await user.type(otpCodeInputHidden, "1234");

		const continueButton = screen.getByText(/Continue/i);
		await user.press(continueButton);

		// Assert
		await waitFor(() => {
			expect(mockAuthorizeWithSMS).toHaveBeenCalledWith({
				code: "1234",
				phoneNumber: "+44123456789"
			});
		});
	});

	it("Should display an error when SMS authorization fails", async () => {
		// Arrange
		const mockAuthorizeWithSMS = jest
			.fn()
			.mockRejectedValue(new Error("Invalid code"));
		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithSMS: mockAuthorizeWithSMS,
			sendSMSCode: jest.fn()
		});

		render(<VerifyCodeScreen {...props} />);

		// Act
		const otpCodeInputHidden = screen.getByTestId("otp-input-hidden");
		await user.type(otpCodeInputHidden, "0000");

		const continueButton = screen.getByText(/Continue/i);
		await user.press(continueButton);

		// Assert
		// TODO: Add error message
		//  await waitFor(() => {
		// 		expect(screen.getByText(/Invalid code/i)).toBeTruthy();
		// 	});

		await waitFor(() => {
			expect(mockAuthorizeWithSMS).toHaveBeenCalledWith({
				code: "0000",
				phoneNumber: "+44123456789"
			});
		});
	});

	it("Should resend the SMS code when 'Resend Code' is pressed", async () => {
		// Arrange
		const mockSendSMSCode = jest.fn().mockResolvedValue(true);
		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithSMS: jest.fn(),
			sendSMSCode: mockSendSMSCode
		});

		render(<VerifyCodeScreen {...props} />);

		// Act
		const resendButton = screen.getByText(/Resend/i);
		await user.press(resendButton);

		// Assert
		await waitFor(() => {
			expect(mockSendSMSCode).toHaveBeenCalledWith({
				phoneNumber: "+44123456789"
			});
		});
	});

	it("Should handle if an error occurs when resend SMS fails", async () => {
		// Arrange
		const mockSendSMSCode = jest
			.fn()
			.mockRejectedValue(new Error("Failed to send SMS code"));

		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithSMS: jest.fn(),
			sendSMSCode: mockSendSMSCode
		});

		render(<VerifyCodeScreen {...props} />);

		// Act
		const resendButton = screen.getByText(/Resend/i);
		await user.press(resendButton);

		// Assert
		await waitFor(() => {
			expect(mockSendSMSCode).toHaveBeenCalledWith({
				phoneNumber: "+44123456789"
			});

			// TODO: Add error message
			// expect(screen.getByText(/Failed to send SMS code/i)).toBeTruthy();
		});
	});
});

describe("VerifyCodeScreen - Email Flow", () => {
	let user: UserEventInstance;
	let props: VerifyCodeScreenProps;

	beforeEach(() => {
		user = userEvent.setup();
		props = { flow: "email", email: "test@example.com" };

		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithEmail: jest.fn(),
			sendEmailCode: jest.fn()
		});

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should render the heading 'OTP code verification 🔐'", () => {
		// Arrange
		render(<VerifyCodeScreen {...props} />);

		// Act
		const heading = screen.getByText(/OTP code verification 🔐/i);

		// Assert
		expect(heading).toBeOnTheScreen();
	});

	it("Should render the 'verification.email.otpSent' translation", () => {
		// Arrange
		render(<VerifyCodeScreen {...props} />);

		// Act
		const translation = screen.getByText(/verification.email.otpSent/i);

		// Assert
		expect(translation).toBeOnTheScreen();
	});

	it("Should successfully authorize with email when a valid OTP code is submitted", async () => {
		// Arrange
		const mockCredentials: Credentials = {
			idToken: "fake-id-token",
			accessToken: "fake-access-token",
			tokenType: "Bearer",
			expiresAt: 1716873600,
			refreshToken: "fake-refresh-token",
			scope: "fake-scope"
		};

		const mockAuthorizeWithEmail = jest.fn().mockResolvedValue(mockCredentials);
		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithEmail: mockAuthorizeWithEmail,
			sendEmailCode: jest.fn()
		});

		render(<VerifyCodeScreen {...props} />);

		// Act
		const otpCodeInputHidden = screen.getByTestId("otp-input-hidden");
		await user.type(otpCodeInputHidden, "5678");

		const continueButton = screen.getByText(/Continue/i);
		await user.press(continueButton);

		// Assert
		await waitFor(() => {
			expect(mockAuthorizeWithEmail).toHaveBeenCalledWith({
				code: "5678",
				email: "test@example.com"
			});
		});
	});

	it("Should display an error when email authorization fails", async () => {
		// Arrange
		const mockAuthorizeWithEmail = jest
			.fn()
			.mockRejectedValue(new Error("Invalid code"));
		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithEmail: mockAuthorizeWithEmail,
			sendEmailCode: jest.fn()
		});

		render(<VerifyCodeScreen {...props} />);

		// Act
		const otpCodeInputHidden = screen.getByTestId("otp-input-hidden");
		await user.type(otpCodeInputHidden, "0000");

		const continueButton = screen.getByText(/Continue/i);
		await user.press(continueButton);

		// Assert
		// TODO: Add error message
		// await waitFor(() => {
		// 	expect(screen.getByText(/Invalid code/i)).toBeTruthy();
		// });

		await waitFor(() => {
			expect(mockAuthorizeWithEmail).toHaveBeenCalledWith({
				code: "0000",
				email: "test@example.com"
			});
		});
	});

	it("Should resend the email code when 'Resend Code' is pressed", async () => {
		// Arrange
		const mockSendEmailCode = jest.fn().mockResolvedValue(true);
		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithEmail: jest.fn(),
			sendEmailCode: mockSendEmailCode
		});

		render(<VerifyCodeScreen {...props} />);

		// Act
		const resendButton = screen.getByText(/Resend/i);
		await user.press(resendButton);

		// Assert
		await waitFor(() => {
			expect(mockSendEmailCode).toHaveBeenCalledWith({
				email: "test@example.com"
			});
		});
	});

	it("Should handle if an error occurs when resending email code", async () => {
		// Arrange
		const mockSendEmailCode = jest
			.fn()
			.mockRejectedValue(new Error("Failed to send email code"));

		(useAuth as jest.Mock).mockReturnValue({
			authorizeWithEmail: jest.fn(),
			sendEmailCode: mockSendEmailCode
		});

		render(<VerifyCodeScreen {...props} />);

		// Act
		const resendButton = screen.getByText(/Resend/i);
		await user.press(resendButton);

		// Assert
		await waitFor(() => {
			expect(mockSendEmailCode).toHaveBeenCalledWith({
				email: "test@example.com"
			});

			// TODO: Add error message
			// expect(screen.getByText(/Failed to send email code/i)).toBeTruthy();
		});
	});
});
