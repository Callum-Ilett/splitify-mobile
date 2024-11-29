import type { VerifyEmailFormProps } from "./VerifyEmailForm";
import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";

import { VerifyEmailForm } from "./VerifyEmailForm";
import { render, screen, userEvent } from "@testing-library/react-native";

describe("VerifyEmailForm", () => {
	let props: VerifyEmailFormProps;
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
		render(<VerifyEmailForm {...props} />);

		// Act

		// Assert
	});

	it("Should render a text input for 'Email'", () => {
		// Arrange
		render(<VerifyEmailForm {...props} />);

		// Act
		const emailInput = screen.getByLabelText(/Email/i);

		// Assert
		expect(emailInput).toBeOnTheScreen();
	});

	it("Should render a button with the text 'Continue'", () => {
		// Arrange
		render(<VerifyEmailForm {...props} />);

		// Act
		const continueButton = screen.getByText(/Continue/i);

		// Assert
		expect(continueButton).toBeOnTheScreen();
	});

	it("Should disable the 'Continue' button initially", () => {
		// Arrange
		render(<VerifyEmailForm {...props} />);

		// Act
		const continueButton = screen.getByText(/Continue/);

		// Assert
		expect(continueButton).toBeDisabled();
	});

	it("Should handle when the 'Continue' button is pressed and the form is valid", async () => {
		// Arrange
		const mockOnSubmit = jest.fn();
		props.onSubmit = mockOnSubmit;

		render(<VerifyEmailForm {...props} />);

		// Act
		const emailInput = screen.getByLabelText(/Email/);
		await user.type(emailInput, "test@example.com");

		const continueButton = screen.getByText(/Continue/);
		await userEvent.press(continueButton);

		// Assert
		expect(mockOnSubmit).toHaveBeenCalledWith({
			email: "test@example.com"
		});
	});

	it("Should handle when the 'Continue' button is pressed and the form is invalid", async () => {
		// Arrange
		const mockOnSubmit = jest.fn();
		props.onSubmit = mockOnSubmit;

		render(<VerifyEmailForm {...props} />);

		// Act
		const continueButton = screen.getByText(/Continue/);
		await userEvent.press(continueButton);

		// Assert
		expect(mockOnSubmit).not.toHaveBeenCalled();
	});
});
