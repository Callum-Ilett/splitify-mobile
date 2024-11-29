import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";

import { WelcomeScreen } from "./WelcomeScreen";
import { render, screen, userEvent } from "@testing-library/react-native";
import { useRouter } from "expo-router";

jest.mock("expo-router");

describe("WelcomeScreen", () => {
	let user: UserEventInstance;

	beforeEach(() => {
		(useRouter as jest.Mock).mockReturnValue({
			push: jest.fn()
		});

		user = userEvent.setup();

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should render without any errors", () => {
		// Arrange
		render(<WelcomeScreen />);

		// Act

		// Assert
	});

	it("Should render the heading 'Let's Get Started!'", () => {
		// Arrange
		render(<WelcomeScreen />);

		// Act
		const heading = screen.getByText(/Let's Get Started!/i);

		// Assert
		expect(heading).toBeOnTheScreen();
	});

	it("Should render text 'With Splitify, expenses split bills is easier than ever before.'", () => {
		// Arrange
		render(<WelcomeScreen />);

		// Act
		const text = screen.getByText(
			/With Splitify, expenses split bills is easier than ever before./i
		);

		// Assert
		expect(text).toBeOnTheScreen();
	});

	it("Should render a button with text 'Continue with Google'", () => {
		// Arrange
		render(<WelcomeScreen />);

		// Act
		const button = screen.getByText(/Continue with Google/i);

		// Assert
		expect(button).toBeOnTheScreen();
	});

	it("Should render a button with text 'Continue with Facebook'", () => {
		// Arrange
		render(<WelcomeScreen />);

		// Act
		const button = screen.getByText(/Continue with Facebook/i);

		// Assert
		expect(button).toBeOnTheScreen();
	});

	it("Should render a button with text 'Continue with Twitter'", () => {
		// Arrange
		render(<WelcomeScreen />);

		// Act
		const button = screen.getByText(/Continue with Twitter/i);

		// Assert
		expect(button).toBeOnTheScreen();
	});

	it("Should render a button with text 'Sign up' and handle when pressed", async () => {
		// Arrange
		const mockPush = jest.fn();

		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		render(<WelcomeScreen />);

		// Act
		const signUpButton = screen.getByText(/Sign up/i);
		await user.press(signUpButton);

		// Assert
		expect(signUpButton).toBeOnTheScreen();
		expect(mockPush).toHaveBeenCalledWith("/sign-up");
	});

	it("Should render a button with text 'Log in' and handle when pressed", async () => {
		// Arrange
		const mockPush = jest.fn();

		(useRouter as jest.Mock).mockReturnValue({
			push: mockPush
		});

		render(<WelcomeScreen />);

		// Act
		const logInButton = screen.getByText(/Log in/i);
		await user.press(logInButton);

		// Assert
		expect(logInButton).toBeOnTheScreen();
		expect(mockPush).toHaveBeenCalledWith("/sign-in");
	});

	it("Should render the text 'Privacy Policy'", () => {
		// Arrange
		render(<WelcomeScreen />);

		// Act
		const text = screen.getByText(/Privacy Policy/i);

		// Assert
		expect(text).toBeOnTheScreen();
	});
});
