import type { FormatPhoneNumberParams } from "@/features/auth/utils";

import { formatPhoneNumber } from "@/features/auth/utils";

describe("formatPhoneNumber", () => {
	let params: FormatPhoneNumberParams;

	beforeEach(() => {
		params = {
			callingCode: "",
			phoneNumber: ""
		};
	});

	it("Should format phone number by combining calling code and phone number", () => {
		// Arrange
		params.callingCode = "+44";
		params.phoneNumber = "123456789";

		// Act
		const result = formatPhoneNumber(params);

		// Assert
		expect(result).toBe("+44123456789");
	});

	it("Should remove spaces from phone number", () => {
		// Arrange
		params.callingCode = "+44";
		params.phoneNumber = "123 456 789";

		// Act
		const result = formatPhoneNumber(params);

		// Assert
		expect(result).toBe("+44123456789");
	});

	it("Should handle empty phone number", () => {
		// Arrange
		params.callingCode = "+44";
		params.phoneNumber = "";

		// Act
		const result = formatPhoneNumber(params);

		// Assert
		expect(result).toBe("+44");
	});

	it("Should handle empty calling code", () => {
		// Arrange
		params.callingCode = "";
		params.phoneNumber = "123456789";

		// Act
		const result = formatPhoneNumber(params);

		// Assert
		expect(result).toBe("123456789");
	});
});
