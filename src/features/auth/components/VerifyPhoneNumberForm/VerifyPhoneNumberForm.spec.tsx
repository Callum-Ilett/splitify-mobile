import type { VerifyPhoneNumberFormProps } from "./VerifyPhoneNumberForm";
import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";

import { VerifyPhoneNumberForm } from "./VerifyPhoneNumberForm";
import { render, screen, userEvent } from "@testing-library/react-native";

describe("VerifyPhoneNumberForm", () => {
	let props: VerifyPhoneNumberFormProps;
	let user: UserEventInstance;

	beforeEach(() => {
		user = userEvent.setup();

		props = {
			onSubmit: jest.fn()
		};

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should render without any errors", () => {
		// Arrange
		render(<VerifyPhoneNumberForm {...props} />);

		// Act

		// Assert
	});

	it("Should render a text input for 'Phone Number'", () => {
		// Arrange
		render(<VerifyPhoneNumberForm {...props} />);

		// Act
		const phoneNumberInput = screen.getByLabelText(/Phone Number/i);

		// Assert
		expect(phoneNumberInput).toBeOnTheScreen();
	});

	it("Should render a button with the text 'Continue'", () => {
		// Arrange
		render(<VerifyPhoneNumberForm {...props} />);

		// Act
		const continueButton = screen.getByText(/Continue/i);

		// Assert
		expect(continueButton).toBeOnTheScreen();
	});

	it("Should disable the 'Continue' button initially", () => {
		// Arrange
		render(<VerifyPhoneNumberForm {...props} />);

		// Act
		const continueButton = screen.getByText(/Continue/);

		// Assert
		expect(continueButton).toBeDisabled();
	});

	it("Should handle when the 'Continue' button is pressed and the form is valid", async () => {
		// Arrange
		const mockOnSubmit = jest.fn();
		props.onSubmit = mockOnSubmit;

		render(<VerifyPhoneNumberForm {...props} />);

		// Act
		const phoneNumberInput = screen.getByLabelText(/Phone Number/);
		await user.type(phoneNumberInput, "123456789");

		const continueButton = screen.getByText(/Continue/);
		await userEvent.press(continueButton);

		// Assert
		expect(mockOnSubmit).toHaveBeenCalledWith({
			callingCode: "+44",
			phoneNumber: "12345 6789"
		});
	});

	it("Should handle when the 'Continue' button is pressed and the form is invalid", async () => {
		// Arrange
		const mockOnSubmit = jest.fn();
		props.onSubmit = mockOnSubmit;

		render(<VerifyPhoneNumberForm {...props} />);

		// Act
		const continueButton = screen.getByText(/Continue/);
		await userEvent.press(continueButton);

		// Assert
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});
});
