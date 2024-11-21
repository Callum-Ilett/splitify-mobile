import type { ElementRef } from "react";
import type { PressableProps } from "react-native";

import { forwardRef } from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
	label: string;
} & PressableProps;

const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
	({ label }, ref) => {
		return (
			<Pressable ref={ref}>
				<Text>{label}</Text>
			</Pressable>
		);
	}
);

Button.displayName = "Button";

export type { ButtonProps };
export { Button };
