import type { SignUpScreenProps } from "./SignUpScreen";
import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";

import { SignUpScreen } from "./SignUpScreen";
import { render, screen, userEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";

jest.mock("expo-router");

describe("SignUpScreen", () => {
	let props: SignUpScreenProps;
	let user: UserEventInstance;

	beforeEach(() => {
		user = userEvent.setup();

		(useRouter as jest.Mock).mockReturnValue({
			push: jest.fn()
		});

		props = {
			verificationMethod: undefined
		};

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.resetAllMocks();
	});

	it("Should render without any errors", () => {
		// Arrange
		render(<SignUpScreen {...props} />);

		// Act

		// Assert
	});

	it("Should render the heading 'Create account 👩‍💻'", () => {
		// Arrange
		render(<SignUpScreen {...props} />);

		// Act
		const heading = screen.getByText(/Create account 👩‍💻/i);

		// Assert
		expect(heading).toBeOnTheScreen();
	});

	it("Should render the text 'Please enter your details below.'", () => {
		// Arrange
		render(<SignUpScreen {...props} />);

		// Act
		const text = screen.getByText(/Please enter your details below./i);

		// Assert
		expect(text).toBeOnTheScreen();
	});

	it("Should navigate to the 'VerifyPhoneNumberScreen' when the form is submitted with valid data", async () => {
		// Arrange
		props.verificationMethod = "sms";

		const mockPush = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		render(<SignUpScreen {...props} />);

		// Act
		const firstNameInput = screen.getByLabelText(/First Name/i);
		const lastNameInput = screen.getByLabelText(/Last Name/i);
		const agreeToTermsCheckbox = screen.getByLabelText(
			/Agree to terms & policy/i
		);
		const signupButton = screen.getByText(/Sign up/i);

		await user.type(firstNameInput, "John");
		await user.type(lastNameInput, "Doe");
		await user.press(agreeToTermsCheckbox);
		await user.press(signupButton);

		// Assert
		expect(mockPush).toHaveBeenCalledWith("/verify-phone");
	});

	it("Should navigate to the 'VerifyEmailScreen' when the form is submitted with valid data", async () => {
		// Arrange
		props.verificationMethod = "email";

		const mockPush = jest.fn();
		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		render(<SignUpScreen {...props} />);

		// Act
		const firstNameInput = screen.getByLabelText(/First Name/i);
		const lastNameInput = screen.getByLabelText(/Last Name/i);
		const agreeToTermsCheckbox = screen.getByLabelText(
			/Agree to terms & policy/i
		);
		const signupButton = screen.getByText(/Sign up/i);

		await user.type(firstNameInput, "John");
		await user.type(lastNameInput, "Doe");
		await user.press(agreeToTermsCheckbox);
		await user.press(signupButton);

		// Assert
		expect(mockPush).toHaveBeenCalledWith("/verify-email");
	});
});
