import type { TextProps as RNTextProps } from "react-native";

import { useTranslation } from "@/i18n/utils";
import { cn } from "@/theme/utils";
import { forwardRef } from "react";
import { Text as RNText } from "react-native";

type TextProps = {
	i18nKey?: string;
	skipTranslation?: boolean;
} & RNTextProps;

const Text = forwardRef<RNText, TextProps>(
	({ className, children, i18nKey, skipTranslation, ...props }, ref) => {
		const { translate, translations } = useTranslation();

		const content =
			i18nKey || (typeof children === "string" ? children : undefined);

		if (
			!skipTranslation &&
			!i18nKey &&
			typeof children === "string" &&
			!translations.includes(children)
		) {
			console.warn(
				"Text component received string children that is not in the translation resources",
				JSON.stringify(children)
			);
		}

		return (
			<RNText
				className={cn(
					"font-urbanist font-normal text-grey-900 dark:text-white",
					className
				)}
				ref={ref}
				{...props}
			>
				{skipTranslation
					? content || children
					: content
						? translate(content)
						: children}
			</RNText>
		);
	}
);

Text.displayName = "Text";

export type { TextProps };
export { Text };
