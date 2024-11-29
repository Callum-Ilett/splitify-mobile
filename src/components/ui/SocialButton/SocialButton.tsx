import type { VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";

import FacebookLogo from "./facebook.svg";
import GoogleLogo from "./google.svg";
import TwitterLogo from "./twitter.svg";
import { Text } from "@/components/ui/Text";
import { cn } from "@/theme/utils";
import { cva } from "class-variance-authority";
import { forwardRef } from "react";
import { Pressable, View } from "react-native";

const buttonVariants = cva(
	"flex-row justify-center items-center gap-5 rounded-full border border-grey-200 dark:border-dark-500 w-full self-stretch min-w-full",
	{
		variants: {
			size: {
				xs: "p-[12px]",
				sm: "p-[14px]",
				medium: "p-[16px]",
				lg: "p-[18px]"
			}
		},
		defaultVariants: {
			size: "medium"
		}
	}
);

type SocialButtonProps = {
	children?: ReactNode;

	oauth: "google" | "facebook" | "twitter";
} & ComponentPropsWithoutRef<typeof Pressable> &
	VariantProps<typeof buttonVariants>;

const SocialButton = forwardRef<
	ElementRef<typeof Pressable>,
	SocialButtonProps
>(({ className, children, disabled, size, oauth, ...props }, ref) => {
	const renderOauthLogo = () => {
		switch (oauth) {
			case "google":
				return <GoogleLogo />;

			case "facebook":
				return <FacebookLogo />;

			case "twitter":
				return <TwitterLogo />;

			default:
				return null;
		}
	};

	return (
		<Pressable
			className={cn(buttonVariants({ size, className }))}
			ref={ref}
			role="button"
			{...props}
		>
			<View className="h-6 w-6 items-center justify-center">
				{renderOauthLogo()}
			</View>

			<Text className="flex-1 text-center text-lg font-bold">{children}</Text>

			<View className="h-6 w-6" />
		</Pressable>
	);
});

SocialButton.displayName = "SocialButton";

export { SocialButton };
export type { SocialButtonProps };
