import { i18n } from "@/i18n";
import { resources } from "@/i18n/resources";
import { useTranslation as useTranslationI18n } from "react-i18next";

export const useTranslation = () => {
	const { t, ...otherI18nProps } = useTranslationI18n(undefined, {
		i18n
	});

	const translate = t;
	const translations = Object.values(resources.en.translation);

	return { translate, translations, ...otherI18nProps } as const;
};
