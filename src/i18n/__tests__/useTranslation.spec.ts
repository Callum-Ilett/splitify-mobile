import { useTranslation } from "@/i18n/utils";
import { renderHook } from "@testing-library/react-native";

describe("useTranslation", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("Should return translate function and translations array", () => {
		// Arrange

		// Act
		const { result } = renderHook(() => useTranslation());

		// Assert
		expect(result.current.translate).toBeDefined();
		expect(result.current.translations).toBeDefined();
	});
});
