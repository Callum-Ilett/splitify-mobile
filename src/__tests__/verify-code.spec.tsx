import type {
	MockContextConfig,
	RenderRouterOptions
} from "expo-router/testing-library";

import VerifyCode from "@/app/verify-code";
import { renderRouter, screen } from "expo-router/testing-library";

describe("verify-code", () => {
	let mockRouter: MockContextConfig | undefined;

	const options: RenderRouterOptions = {
		initialUrl: "verify-code"
	};

	beforeEach(() => {
		mockRouter = undefined;

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.resetAllMocks();
	});

	it("Should render verify code route without query params", () => {
		// Arrange
		mockRouter = {
			"verify-code": VerifyCode
		};

		options.initialUrl = "verify-code";

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/verify-code");
	});

	it("Should handle email verification flow with email query param", () => {
		// Arrange
		mockRouter = {
			"verify-code": VerifyCode
		};

		options.initialUrl = "verify-code/?email=johndoe@gmail.com";

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/verify-code");
		expect(screen).toHaveSearchParams({ email: "johndoe@gmail.com" });
	});

	it("Should handle SMS verification flow with phoneNumber query param", () => {
		// Arrange
		mockRouter = {
			"verify-code": VerifyCode
		};

		options.initialUrl = "verify-code/?phoneNumber=123456789";

		renderRouter(mockRouter, options);

		// Act

		// Assert
		expect(screen).toHavePathname("/verify-code");
		expect(screen).toHaveSearchParams({ phoneNumber: "123456789" });
	});
});
