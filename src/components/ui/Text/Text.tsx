import type { TextProps as RNTextProps } from "react-native";

import { forwardRef } from "react";
import { useTranslation } from "@/i18n/utils";
import { cn } from "@/theme/utils";
import { Text as RNText } from "react-native";

type TextProps = {} & RNTextProps;

const Text = forwardRef<RNText, TextProps>(
	({ className, children, ...props }, ref) => {
		const { translate, translations } = useTranslation();

		if (typeof children === "string" && !translations.includes(children)) {
			console.warn(
				"Text component received a i18n key that is not in the translation resources",
				JSON.stringify(children)
			);
		}

		return (
			<RNText
				className={cn("font-urbanist text-grey-900 dark:text-white", className)}
				ref={ref}
				{...props}
			>
				{typeof children === "string" ? translate(children) : children}
			</RNText>
		);
	}
);

Text.displayName = "Text";

export type { TextProps };
export { Text };
