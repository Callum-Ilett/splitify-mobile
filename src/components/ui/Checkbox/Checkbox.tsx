import type { RootProps, RootRef } from "@rn-primitives/checkbox";
import type { ReactNode } from "react";

import Check from "./check.svg";
import { cn } from "@/theme/utils";
import { Indicator, Root } from "@rn-primitives/checkbox";
import { forwardRef } from "react";

type CheckboxProps = {
	children?: ReactNode;

	error?: string;
} & RootProps;

const Checkbox = forwardRef<RootRef, CheckboxProps>(
	({ className, checked, onCheckedChange, children, error, ...props }, ref) => {
		return (
			<Root
				className={cn("h-6 w-6 rounded-md border-[3px] border-primary-900", {
					"bg-primary-900": checked,
					"border-error": error && !checked
				})}
				ref={ref}
				checked={checked}
				onCheckedChange={onCheckedChange}
				{...props}
			>
				<Indicator className={cn("h-full w-full items-center justify-center")}>
					<Check width={20} height={20} />
				</Indicator>
			</Root>
		);
	}
);
Checkbox.displayName = Root.displayName;

export { Checkbox };
