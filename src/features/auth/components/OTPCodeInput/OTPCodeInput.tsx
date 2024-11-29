import type { ElementRef } from "react";

import colors from "@/theme/colors";
import { forwardRef } from "react";
import { useColorScheme } from "react-native";
import { OtpInput, OtpInputProps } from "react-native-otp-entry";

type OTPCodeInputProps = {
	error?: boolean;
} & OtpInputProps;

const OTPCodeInput = forwardRef<ElementRef<typeof OtpInput>, OTPCodeInputProps>(
	(
		{
			numberOfDigits = 4,
			type = "numeric",
			focusColor = colors.primary["900"],
			hideStick = false,
			disabled = false,
			error = false,
			autoFocus = true,
			blurOnFilled = true,
			secureTextEntry = false,
			focusStickBlinkingDuration = undefined,
			textInputProps,
			onFocus,
			onBlur,
			onTextChange,
			onFilled,
			...props
		},
		ref
	) => {
		const theme = useColorScheme();

		// Styles should not be tested, only functionality
		// Ignore in code coverage using istanbul ignore next
		/* istanbul ignore next */
		const borderColor =
			theme === "light" ? colors.grey["50"] : colors.dark["300"];

		/* istanbul ignore next */
		const backgroundColor =
			theme === "light" ? colors.grey["50"] : colors.dark["300"];

		/* istanbul ignore next */
		const pinCodeTextColor = theme === "light" ? colors.black : colors.white;

		return (
			<OtpInput
				ref={ref}
				type={type}
				numberOfDigits={numberOfDigits}
				focusColor={focusColor}
				hideStick={hideStick}
				autoFocus={autoFocus}
				blurOnFilled={blurOnFilled}
				disabled={disabled}
				focusStickBlinkingDuration={focusStickBlinkingDuration}
				secureTextEntry={secureTextEntry}
				textInputProps={textInputProps}
				onBlur={onBlur}
				onFocus={onFocus}
				onTextChange={onTextChange}
				onFilled={onFilled}
				theme={{
					containerStyle: {},
					disabledPinCodeContainerStyle: {},
					filledPinCodeContainerStyle: {
						borderWidth: 1,
						borderColor: "transparent"
					},
					focusedPinCodeContainerStyle: {
						backgroundColor: "rgba(254, 187, 27, 0.08)"
					},
					focusStickStyle: {},
					pinCodeContainerStyle: {
						width: 78,
						height: 70,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						borderRadius: 12,
						borderWidth: 1,
						borderColor,
						backgroundColor
					},
					pinCodeTextStyle: {
						fontFamily: "Urbanist",
						color: pinCodeTextColor,
						fontSize: 24,
						fontWeight: "700"
					}
				}}
				{...props}
			/>
		);
	}
);

OTPCodeInput.displayName = "OTPCodeInput";

export type { OTPCodeInputProps };
export { OTPCodeInput };
