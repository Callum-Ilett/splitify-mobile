import { cn } from "@/theme/utils";
import { View } from "react-native";

type DividerProps = {
	className?: string;
};

const Divider = ({ className }: DividerProps) => {
	return (
		<View className={cn("h-[1px] bg-grey-200 dark:bg-dark-500", className)} />
	);
};
Divider.displayName = "Divider";

export type { DividerProps };
export { Divider };
