import { resources } from "@/i18n/resources";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const initI18n = () => {
	// TODO: Dynamically get the users prefered language
	// 1. Get the language from the device
	// 2. Persits the language in async storage
	// 3. Use the language from async storage
	// 4. Change the language of the app
	// 5. Update the language in async storage
	const lng = "en";

	// Fallback language if the above fails
	const fallbackLng = "en";

	const interpolation = {
		escapeValue: false
	};

	const compatibilityJSON = "v3";

	i18n.use(initReactI18next).init({
		resources,
		lng,
		fallbackLng,
		interpolation,
		compatibilityJSON
	});
};

initI18n();

export { i18n };
