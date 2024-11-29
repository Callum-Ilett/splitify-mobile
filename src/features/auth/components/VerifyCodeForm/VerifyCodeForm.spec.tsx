import type { VerifyCodeFormProps } from "./VerifyCodeForm";
import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";

import { VerifyCodeForm } from "./VerifyCodeForm";
import { render, screen, userEvent } from "@testing-library/react-native";

describe("VerifyCodeForm", () => {
	let user: UserEventInstance;
	let props: VerifyCodeFormProps;

	beforeEach(() => {
		user = userEvent.setup();

		props = {
			onSubmit: jest.fn(),
			onResendCodePress: jest.fn()
		};

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should render without any errors", () => {
		// Arrange
		render(<VerifyCodeForm {...props} />);

		// Act

		// Assert
	});

	it("Should render 4 OTP input fields", () => {
		// Arrange
		render(<VerifyCodeForm {...props} />);

		// Act
		const inputs = screen.getAllByTestId("otp-input");
		const input1 = inputs[0];
		const input2 = inputs[1];
		const input3 = inputs[2];
		const input4 = inputs[3];

		// Assert
		expect(inputs).toHaveLength(4);
		expect(input1).toBeOnTheScreen();
		expect(input2).toBeOnTheScreen();
		expect(input3).toBeOnTheScreen();
		expect(input4).toBeOnTheScreen();
	});

	it("Should render the text 'Didn't receive the code?'", () => {
		// Arrange
		render(<VerifyCodeForm {...props} />);

		// Act
		const text = screen.getByText(/Didn't receive the code?/i);

		// Assert
		expect(text).toBeOnTheScreen();
	});

	it("Should render a button with the text 'Resend'", () => {
		// Arrange
		render(<VerifyCodeForm {...props} />);

		// Act
		const resendCodeButton = screen.getByText(/Resend/i);

		// Assert
		expect(resendCodeButton).toBeOnTheScreen();
	});

	it("Should disable the 'Resend' button once pressed and start the timer", async () => {
		// Arrange
		const mockOnResendCodePress = jest.fn();

		props.onResendCodePress = mockOnResendCodePress;
		render(<VerifyCodeForm {...props} />);

		// Act
		const resendCodeButton = screen.getByText(/Resend/i);
		await user.press(resendCodeButton);

		// Assert
		expect(mockOnResendCodePress).toHaveBeenCalled();
		expect(resendCodeButton).toBeDisabled();
		expect(await screen.findByText(/Resend \(60s\)/i)).toBeOnTheScreen();
	});

	it("Should render a button with the text 'Continue'", () => {
		// Arrange
		render(<VerifyCodeForm {...props} />);

		// Act
		const continueButton = screen.getByText(/Continue/i);

		// Assert
		expect(continueButton).toBeOnTheScreen();
	});

	it("Should disable the 'Continue' button if the OTP code is not filled", () => {
		// Arrange
		render(<VerifyCodeForm {...props} />);

		// Act
		const continueButton = screen.getByText(/Continue/i);

		// Assert
		expect(continueButton).toBeDisabled();
	});

	it("Should enable the 'Continue' button if the OTP code is filled", async () => {
		// Arrange
		render(<VerifyCodeForm {...props} />);

		// Act
		const otpCodeInputHidden = screen.getByTestId("otp-input-hidden");
		await user.type(otpCodeInputHidden, "1234");

		const continueButton = screen.getByText(/Continue/i);

		// Assert
		expect(continueButton).toBeEnabled();
	});

	it("Should call the onSubmit function with the OTP code when the 'Continue' button is pressed", async () => {
		// Arrange
		const mockOnSubmit = jest.fn();

		props.onSubmit = mockOnSubmit;
		render(<VerifyCodeForm {...props} />);

		// Act
		const otpCodeInputHidden = screen.getByTestId("otp-input-hidden");
		await user.type(otpCodeInputHidden, "1234");

		const continueButton = screen.getByText(/Continue/i);
		await user.press(continueButton);

		// Assert
		expect(mockOnSubmit).toHaveBeenCalledWith({ code: "1234" });
	});
});
