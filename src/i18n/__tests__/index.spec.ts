import { i18n } from "../index";

describe("i18n configuration", () => {
	it("Should initialize with English as default language", () => {
		expect(i18n.language).toBe("en");
	});

	it("Should have correct fallback language", () => {
		expect(i18n.options.fallbackLng).toEqual(["en"]);
	});

	it("Should have escape value disabled", () => {
		expect(i18n.options.interpolation?.escapeValue).toBe(false);
	});

	it("Should use compatibility mode v3", () => {
		expect(i18n.options.compatibilityJSON).toBe("v3");
	});

	it("Should have resources configured", () => {
		expect(i18n.options.resources).toBeDefined();

		expect(i18n.options.resources?.en).toBeDefined();
		expect(i18n.options.resources?.fr).toBeDefined();
		expect(i18n.options.resources?.es).toBeDefined();
		expect(i18n.options.resources?.de).toBeDefined();
	});
});
