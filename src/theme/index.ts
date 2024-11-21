import type { Theme } from "@react-navigation/native";
import type { TextStyle } from "react-native";

import colors from "./colors";
import typography from "./typography";

export const DarkTheme: Theme = {
	dark: true,
	fonts: {
		regular: {
			fontFamily: "Urbanist",
			fontWeight: "400"
		},
		medium: {
			fontFamily: "Urbanist",
			fontWeight: "500"
		},
		bold: {
			fontFamily: "Urbanist",
			fontWeight: "600"
		},
		heavy: {
			fontFamily: "Urbanist",
			fontWeight: "700"
		}
	},
	colors: {
		primary: colors.dark[100],
		background: colors.dark[100],
		card: colors.dark[100],
		text: colors.white,
		border: colors.dark[500],
		notification: colors.red
	}
};

export const LightTheme: Theme = {
	dark: false,
	fonts: {
		regular: {
			fontFamily: "Urbanist",
			fontWeight: "400"
		},
		medium: {
			fontFamily: "Urbanist",
			fontWeight: "500"
		},
		bold: {
			fontFamily: "Urbanist",
			fontWeight: "600"
		},
		heavy: {
			fontFamily: "Urbanist",
			fontWeight: "700"
		}
	},
	colors: {
		primary: colors.grey[900],
		background: colors.white,
		card: colors.white,
		text: colors.grey[900],
		border: colors.grey[200],
		notification: colors.red
	}
};

type FontVariant = [
	string,
	{
		lineHeight?: string;
		letterSpacing?: string;
		fontWeight?: string;
	}
];

/**
 * Converts a rem value (e.g., "1.25rem") to a number in pixels (e.g., 20).
 * @param {string} rem - The rem value as a string.
 * @returns {number} - The equivalent pixel value.
 */
const remToPx = (rem: string): number => {
	const baseRemSizePx = 16; // 1rem = 16px

	return parseFloat(rem) * baseRemSizePx;
};

/**
 * Calculates the line height based on the font size.
 * For font sizes larger than 20px, uses a multiplier of 1.5, otherwise uses 1.
 * @param {number} fontSize - The font size in pixels
 * @returns {number} The calculated line height in pixels
 */
const lineHeight = (fontSize: number): number => {
	const multiplier = fontSize > 20 ? 1.5 : 1;
	return fontSize + fontSize * multiplier;
};

/**
 * Converts the typography key into a React Native compatible TextStyle object from tailwind config.
 * @param {keyof typeof typography} key - The tailwind key of the typography style.
 * @returns {TextStyle} - The style object for React Native.
 */
export const getFontStyle = (key: keyof typeof typography): TextStyle => {
	const fontVariant = typography[key] as FontVariant;

	const fontSize = fontVariant[0];
	const styleProps = fontVariant[1];

	const fontStyle: TextStyle = {
		fontSize: remToPx(fontSize as string),
		fontWeight: styleProps.fontWeight
			? (styleProps.fontWeight as TextStyle["fontWeight"])
			: undefined,
		lineHeight: lineHeight(remToPx(fontSize as string)),
		letterSpacing: styleProps.letterSpacing
			? parseFloat(styleProps.letterSpacing.replace("px", ""))
			: undefined
	};

	return fontStyle;
};
