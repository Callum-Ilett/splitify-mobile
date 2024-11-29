import type { SignUpFormProps } from "./SignUpForm";
import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";

import { SignUpForm } from "./SignUpForm";
import { render, screen, userEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";

jest.mock("expo-router");

describe("SignUpForm", () => {
	let user: UserEventInstance;
	let props: SignUpFormProps;

	beforeEach(() => {
		user = userEvent.setup();

		props = {
			onSubmit: jest.fn()
		};

		(useRouter as jest.Mock).mockReturnValue({
			push: jest.fn()
		});

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should render without any errors", () => {
		// Arrange
		render(<SignUpForm {...props} />);

		// Act

		// Assert
	});

	it("Should render a text input for 'First Name'", () => {
		// Arrange
		render(<SignUpForm {...props} />);

		// Act
		const firstNameInput = screen.getByLabelText(/First Name/i);

		// Assert
		expect(firstNameInput).toBeOnTheScreen();
	});

	it("Should render a text input for 'Last Name'", () => {
		// Arrange
		render(<SignUpForm {...props} />);

		// Act
		const lastNameInput = screen.getByLabelText(/Last Name/i);

		// Assert
		expect(lastNameInput).toBeOnTheScreen();
	});

	it("Should render a checkbox for 'Agree to terms & policy'", () => {
		// Arrange
		render(<SignUpForm {...props} />);

		// Act
		const agreeToTermsCheckbox = screen.getByLabelText(
			/Agree to terms & policy/i
		);

		// Assert
		expect(agreeToTermsCheckbox).toBeOnTheScreen();
	});

	it("Should render a button around the label which triggers the checkbox", async () => {
		// Arrange
		render(<SignUpForm {...props} />);

		// Act
		const checkboxButton = screen.getByTestId("agree-to-terms-checkbox");
		await user.press(checkboxButton);

		// Assert
		expect(checkboxButton).toBeOnTheScreen();
	});

	it("Should render a button with the text `Sign in` and handle when pressed", async () => {
		// Arrange
		const mockPush = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		render(<SignUpForm {...props} />);

		// Act
		const signInButton = screen.getByText(/Sign in/i);
		await user.press(signInButton);

		// Assert
		expect(signInButton).toBeOnTheScreen();
		expect(mockPush).toHaveBeenCalledWith("/sign-in");
	});

	it("Should render a button with the text 'Sign up' and not be disabled", () => {
		// Arrange
		render(<SignUpForm {...props} />);

		// Act
		const signUpButton = screen.getByText(/Sign up/i);

		// Assert
		expect(signUpButton).toBeOnTheScreen();
		expect(signUpButton).not.toBeDisabled();
	});

	it("Should display validation errors when the form is submitted with invalid data", async () => {
		// Arrange
		render(<SignUpForm {...props} />);

		// Act
		const signUpButton = screen.getByText(/Sign up/i);
		await user.press(signUpButton);

		const firstNameError = screen.getByText(/First name is required/i);
		const lastNameError = screen.getByText(/Last name is required/i);
		const agreeToTermsError = screen.getByText(
			/You must agree to the terms & policy/i
		);

		// Assert
		expect(firstNameError).toBeOnTheScreen();
		expect(lastNameError).toBeOnTheScreen();
		expect(agreeToTermsError).toBeOnTheScreen();
	});

	it("Should disable the 'Sign up' button when validation errors are present", async () => {
		// Arrange
		render(<SignUpForm {...props} />);

		// Act
		const signUpButton = screen.getByText(/Sign up/i);
		await user.press(signUpButton);

		// Assert
		expect(signUpButton).toBeDisabled();
	});

	it("Should handle when the form is submitted with valid data", async () => {
		// Arrange
		const mockOnSubmit = jest.fn();

		props.onSubmit = mockOnSubmit;
		render(<SignUpForm {...props} />);

		// Act
		const signupButton = screen.getByText(/Sign up/i);
		const firstNameInput = screen.getByLabelText(/First Name/i);
		const lastNameInput = screen.getByLabelText(/Last Name/i);
		const agreeToTermsCheckbox = screen.getByLabelText(
			/Agree to terms & policy/i
		);

		await user.type(firstNameInput, "John");
		await user.type(lastNameInput, "Doe");
		await user.press(agreeToTermsCheckbox);
		await user.press(signupButton);

		// Assert
		expect(mockOnSubmit).toHaveBeenCalledWith({
			firstName: "John",
			lastName: "Doe",
			agreeToTerms: true
		});
	});
});
