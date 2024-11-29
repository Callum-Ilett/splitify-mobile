import { Text } from "@/components/ui/Text";
import { cn } from "@/theme/utils";
import { Text as SlotText } from "@rn-primitives/slot";
import { SlottableTextProps, TextRef } from "@rn-primitives/types";
import * as React from "react";

const H1 = React.forwardRef<TextRef, SlottableTextProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Component = asChild ? SlotText : Text;

		return (
			<Component
				className={cn("font-urbanist text-h1 font-bold", className)}
				role="heading"
				aria-level="1"
				ref={ref}
				{...props}
			/>
		);
	}
);

H1.displayName = "H1";

const H2 = React.forwardRef<TextRef, SlottableTextProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Component = asChild ? SlotText : Text;
		return (
			<Component
				className={cn("font-urbanist text-h2 font-bold", className)}
				role="heading"
				aria-level="2"
				ref={ref}
				{...props}
			/>
		);
	}
);

H2.displayName = "H2";

const H3 = React.forwardRef<TextRef, SlottableTextProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Component = asChild ? SlotText : Text;
		return (
			<Component
				className={cn("font-urbanist text-h3 font-bold", className)}
				role="heading"
				aria-level="3"
				ref={ref}
				{...props}
			/>
		);
	}
);

H3.displayName = "H3";

const H4 = React.forwardRef<TextRef, SlottableTextProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Component = asChild ? SlotText : Text;
		return (
			<Component
				className={cn("font-urbanist text-h4 font-bold", className)}
				role="heading"
				aria-level="4"
				ref={ref}
				{...props}
			/>
		);
	}
);

H4.displayName = "H4";

const H5 = React.forwardRef<TextRef, SlottableTextProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Component = asChild ? SlotText : Text;
		return (
			<Component
				className={cn("font-urbanist text-h5 font-bold", className)}
				role="heading"
				aria-level="4"
				ref={ref}
				{...props}
			/>
		);
	}
);

H5.displayName = "H5";

const H6 = React.forwardRef<TextRef, SlottableTextProps>(
	({ className, asChild = false, ...props }, ref) => {
		const Component = asChild ? SlotText : Text;
		return (
			<Component
				className={cn("font-urbanist text-h6 font-bold", className)}
				role="heading"
				aria-level="4"
				ref={ref}
				{...props}
			/>
		);
	}
);

H6.displayName = "H6";

export { H1, H2, H3, H4, H5, H6 };
