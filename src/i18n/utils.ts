import type { Language } from "@/i18n/types";

import { useState } from "react";
import { i18n } from "@/i18n";
import { resources } from "@/i18n/resources";
import { useTranslation as useTranslationI18n } from "react-i18next";

export const changeLanguage = async (lang: Language) => {
	try {
		await i18n.changeLanguage(lang);
	} catch (error) {
		console.error("Error changing language", error);
	}
};

export const useSelectedLanguage = () => {
	const [lng, setLng] = useState<Language>("en");

	const setLanguage = (lang: Language) => {
		setLng(lang);
		changeLanguage(lang as Language);
	};

	return [lng, setLanguage];
};

export const useTranslation = () => {
	const { t: translate, ...otherI18nProps } = useTranslationI18n();

	return {
		translate,
		translations: Object.values(resources.en.translation),
		...otherI18nProps
	} as const;
};
