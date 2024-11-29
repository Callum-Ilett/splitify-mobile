import type { UserEventInstance } from "@testing-library/react-native/build/user-event/setup";
import type {
	MockContextConfig,
	RenderRouterOptions
} from "expo-router/testing-library";

import SignIn from "@/app/sign-in";
import SignUp from "@/app/sign-up";
import Welcome from "@/app/welcome";
import { renderRouter, screen, userEvent } from "expo-router/testing-library";

describe("Welcome", () => {
	let user: UserEventInstance;
	let mockRouter: MockContextConfig | undefined;

	const options: RenderRouterOptions = {
		initialUrl: "welcome"
	};

	beforeEach(() => {
		user = userEvent.setup();
		mockRouter = undefined;
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it("Should render without any errors", () => {
		// Arrange
		mockRouter = {
			welcome: Welcome
		};

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/welcome");
	});

	it("Should be able to navigate to the sign-up screen from the welcome screen", async () => {
		// Arrange
		mockRouter = {
			welcome: Welcome,
			"sign-up": SignUp
		};

		renderRouter(mockRouter, options);

		// Act
		const signUpButton = screen.getByText(/Sign up/i);
		await user.press(signUpButton);

		// Assert
		expect(screen).toHavePathname("/sign-up");
	});

	it("Should be able to navigate to the sign-in screen from the welcome screen", async () => {
		// Arrange
		mockRouter = {
			welcome: Welcome,
			"sign-in": SignIn
		};

		renderRouter(mockRouter, options);

		// Act
		const loginButton = screen.getByText(/Log in/i);
		await user.press(loginButton);

		// Assert
		expect(screen).toHavePathname("/sign-in");
	});
});
