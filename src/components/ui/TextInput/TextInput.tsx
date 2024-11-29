import type {
	NativeSyntheticEvent,
	TextInputProps as RNTextInputProps,
	TextInputFocusEventData
} from "react-native";

import { useTranslation } from "@/i18n/utils";
import colors from "@/theme/colors";
import { cn } from "@/theme/utils";
import { forwardRef, useState } from "react";
import { TextInput as RNTextInput, View } from "react-native";

type TextInputProps = RNTextInputProps & {};

const TextInput = forwardRef<RNTextInput, TextInputProps>(
	({ placeholder, ...props }, ref) => {
		const { translate } = useTranslation();

		const [isFocused, setIsFocused] = useState(props.autoFocus ?? false);

		const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setIsFocused(false);
			props.onBlur?.(e);
		};

		const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setIsFocused(true);
			props.onFocus?.(e);
		};

		return (
			<View
				className={cn(
					"rounded-xl border border-grey-50 bg-grey-50 px-5 py-[18px] dark:border-dark-300 dark:bg-dark-300",
					{
						"border-2 border-primary-900 bg-primary-900/[0.08]": isFocused
					}
				)}
			>
				<RNTextInput
					className="text-lg leading-[1.25] dark:text-white"
					ref={ref}
					placeholder={
						typeof placeholder === "string"
							? translate(placeholder)
							: placeholder
					}
					placeholderTextColor={colors.grey["500"]}
					{...props}
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</View>
		);
	}
);
TextInput.displayName = "TextInput";

export { TextInput };
