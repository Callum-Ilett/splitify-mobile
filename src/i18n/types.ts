import type { resources } from "@/i18n/resources";

type DefaultLocale = typeof resources.en.translation;
type TranslationKey = RecursiveKeyOf<DefaultLocale>;
type Language = keyof typeof resources;

type RecursiveKeyOf<TObj extends object> = {
	[TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
		TObj[TKey],
		`${TKey}`
	>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfInner<TObj extends object> = {
	[TKey in keyof TObj & (string | number)]: RecursiveKeyOfHandleValue<
		TObj[TKey],
		`['${TKey}']` | `.${TKey}`
	>;
}[keyof TObj & (string | number)];

type RecursiveKeyOfHandleValue<
	TValue,
	Text extends string
> = TValue extends any[]
	? Text
	: TValue extends object
		? Text | `${Text}${RecursiveKeyOfInner<TValue>}`
		: Text;

export type { TranslationKey, DefaultLocale, Language };
