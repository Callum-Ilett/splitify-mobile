import type {
	MockContextConfig,
	RenderRouterOptions
} from "expo-router/testing-library";

import AppLayout from "@/app/(app)/_layout";
import HomeScreen from "@/app/(app)/home";
import IndexScreen from "@/app/(app)/index";
import Welcome from "@/app/welcome";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { renderRouter, screen } from "expo-router/testing-library";

jest.mock("@/features/auth/hooks/useAuth");

describe("AppLayout", () => {
	let mockRouter: MockContextConfig | undefined;

	const options: RenderRouterOptions = {
		initialUrl: "/(app)/"
	};

	beforeEach(() => {
		mockRouter = undefined;

		(useAuth as jest.Mock).mockReturnValue({
			user: null,
			isLoading: false
		});

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.resetAllMocks();
	});

	it("Should render the loading screen while the user is being fetched", () => {
		// Arrange
		(useAuth as jest.Mock).mockReturnValue({
			user: null,
			isLoading: true
		});

		mockRouter = {
			"/(app)/_layout": AppLayout,
			"/(app)/": IndexScreen,
			"/(app)/home": HomeScreen,
			"/welcome": Welcome
		};

		renderRouter(mockRouter, options);

		// Act
		const loadingElement = screen.getByLabelText("Loading...");

		// Assert
		expect(loadingElement).toBeOnTheScreen();
	});

	it("Should redirect to the welcome screen if the user is not authenticated", () => {
		// Arrange
		(useAuth as jest.Mock).mockReturnValue({
			user: null,
			isLoading: false
		});

		mockRouter = {
			"/(app)/_layout": AppLayout,
			"/(app)/": IndexScreen,
			"/(app)/home": HomeScreen,
			"/welcome": Welcome
		};

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/welcome");
	});

	it.todo("Should render the Stack component if the user is authenticated");

	// it("Should render the Stack component if the user is authenticated", () => {
	// 	// Arrange
	// 	(useAuth as jest.Mock).mockReturnValue({
	// 		user: {
	// 			email: "johhndoe@gmail.com",
	// 			sub: "email|6747..."
	// 		},
	// 		isLoading: false
	// 	});

	// 	mockRouter = {
	// 		"/(app)/_layout": AppLayout,
	// 		"/(app)/": IndexScreen,
	// 		"/(app)/home": HomeScreen,
	// 		"/welcome": Welcome
	// 	};

	// 	renderRouter(mockRouter, options);

	// 	// Act

	// 	// Assert
	// 	expect(screen).toHavePathname("/");
	// });

	it("Should redirect to the home screen when the user is authenticated", () => {
		// Arrange
		options.initialUrl = "/(app)/";

		mockRouter = {
			"/(app)/": IndexScreen,
			"/(app)/home": HomeScreen
		};

		renderRouter(mockRouter, options);

		// Assert
		expect(screen).toHavePathname("/home");
	});
});
