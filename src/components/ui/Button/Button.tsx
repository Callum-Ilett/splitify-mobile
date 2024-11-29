import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";

import { Text } from "@/components/ui/Text";
import { cn } from "@/theme/utils";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Pressable } from "react-native";

const buttonVariants = cva("justify-center items-center min-w-full", {
	variants: {
		variant: {
			primary: "bg-primary-900"
		},
		type: {
			solid: "bg-primary-900",
			ghost: "",
			outline: "border-2 border-primary-900 bg-transparent"
		},
		shape: {
			pill: "rounded-full"
		},
		size: {
			xs: "p-[12px]",
			sm: "p-[14px]",
			md: "p-[16px]",
			lg: "p-[18px]"
		}
	},
	defaultVariants: {
		variant: "primary",
		type: "solid",
		shape: "pill",
		size: "md"
	}
});

type ButtonProps = {
	children?: ReactNode;

	isDisabled?: boolean;
} & ComponentPropsWithoutRef<typeof Pressable> &
	VariantProps<typeof buttonVariants>;

const Button = forwardRef<ElementRef<typeof Pressable>, ButtonProps>(
	(
		{ className, variant, type, shape, size, children, isDisabled, ...props },
		ref
	) => {
		return (
			<Pressable
				className={cn(
					buttonVariants({ className, variant, type, shape, size }),
					{
						"bg-yellowOchre": isDisabled
					}
				)}
				ref={ref}
				role="button"
				disabled={isDisabled}
				{...props}
			>
				<Text
					className={cn("text-lg font-bold dark:text-grey-900", {
						"dark:text-white": type === "outline"
					})}
				>
					{children}
				</Text>
			</Pressable>
		);
	}
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
