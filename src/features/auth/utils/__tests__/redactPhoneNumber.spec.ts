import { redactPhoneNumber } from "@/features/auth/utils";

describe("redactPhoneNumber", () => {
	it("Should redact all digits except the last 4 digits", () => {
		// Arrange
		const phoneNumber = "1234567890";

		// Act
		const result = redactPhoneNumber(phoneNumber);

		// Assert
		expect(result).toBe("******7890");
	});

	it("Should remove the '+' prefix and redact digits", () => {
		// Arrange
		const phoneNumber = "+1234567890";

		// Act
		const result = redactPhoneNumber(phoneNumber);

		// Assert
		expect(result).toBe("******7890");
	});

	it("Should handle phone numbers with less than 4 digits", () => {
		// Arrange
		const phoneNumber = "123";

		// Act
		const result = redactPhoneNumber(phoneNumber);

		// Assert
		expect(result).toBe("123");
	});

	it("Should handle phone numbers with exactly 4 digits", () => {
		// Arrange
		const phoneNumber = "1234";

		// Act
		const result = redactPhoneNumber(phoneNumber);

		// Assert
		expect(result).toBe("1234");
	});

	it("Should handle international phone numbers", () => {
		// Arrange
		const phoneNumber = "+442071234567";

		// Act
		const result = redactPhoneNumber(phoneNumber);

		// Assert
		expect(result).toBe("********4567");
	});

	it("Should handle empty strings", () => {
		// Arrange
		const phoneNumber = "";

		// Act
		const result = redactPhoneNumber(phoneNumber);

		// Assert
		expect(result).toBe("");
	});
});
