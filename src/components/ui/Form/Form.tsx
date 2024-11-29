import type { TextProps } from "@/components/ui/Text";
import type { ElementRef } from "react";
import type {
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProviderProps
} from "react-hook-form";

import { Text } from "@/components/ui/Text";
import { cn } from "@/theme/utils";
import { createContext, forwardRef, useContext } from "react";
import { Controller, FormProvider, useFormContext } from "react-hook-form";
import { View, ViewProps } from "react-native";

type FormProps<
	TFieldValues extends FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues | undefined = undefined
> = {
	className?: string;
} & FormProviderProps<TFieldValues, TContext, TTransformedValues>;

const Form = <
	TFieldValues extends FieldValues,
	TContext = any,
	TTransformedValues extends FieldValues | undefined = undefined
>({
	children,
	className,
	...props
}: FormProps<TFieldValues, TContext, TTransformedValues>): JSX.Element => {
	return (
		<View className={cn("", className)}>
			<FormProvider {...props}>{children}</FormProvider>
		</View>
	);
};

type FormFieldContextValue<
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
	name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>(
	{} as FormFieldContextValue
);

const FormField = <
	TFieldValues extends FieldValues = FieldValues,
	TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
	...props
}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = useContext(FormFieldContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error("useFormField should be used within <FormField>");
	}

	return {
		name: fieldContext.name,
		...fieldState
	};
};

const FormItem = forwardRef<View, ViewProps>(({ className, ...props }, ref) => {
	return <View ref={ref} className={cn("", className)} {...props} />;
});
FormItem.displayName = "FormItem";

const FormLabel = forwardRef<ElementRef<typeof Text>, TextProps>(
	({ className, ...props }, ref) => {
		return (
			<Text
				ref={ref}
				className={cn("mb-2 text-lg font-semibold dark:text-white", className)}
				{...props}
			/>
		);
	}
);
FormLabel.displayName = "FormLabel";

const FormControl = forwardRef<View, ViewProps>(({ ...props }, ref) => {
	const { error } = useFormField();

	return (
		<View
			ref={ref}
			className={cn("", {
				"rounded-xl border border-error": Boolean(error)
			})}
			aria-invalid={Boolean(error)}
			{...props}
		/>
	);
});
FormControl.displayName = "FormControl";

const FormDescription = forwardRef<ElementRef<typeof Text>, TextProps>(
	({ className, ...props }, ref) => {
		return <Text className={cn("", className)} ref={ref} {...props} />;
	}
);
FormDescription.displayName = "FormDescription";

const FormMessage = forwardRef<ElementRef<typeof Text>, TextProps>(
	({ className, children, ...props }, ref) => {
		const { error } = useFormField();
		const body = error ? String(error?.message) : children;

		if (!body) {
			return null;
		}

		return (
			<Text
				className={cn("mt-2 text-md font-semibold text-error", className)}
				ref={ref}
				{...props}
			>
				{body}
			</Text>
		);
	}
);
FormMessage.displayName = "FormMessage";

export type { FormProps, FormFieldContextValue };

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField
};
