import { Button } from "@/components/ui/Button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/Form";
import { Text } from "@/components/ui/Text";
import { OTPCodeInput } from "@/features/auth/components/OTPCodeInput";
import { useResendCodeTimer } from "@/features/auth/hooks/useResendCodeTimer";
import { cn } from "@/theme/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { Pressable, View } from "react-native";
import { z } from "zod";

const schema = z.object({
	code: z.string().min(4)
});

type Schema = z.infer<typeof schema>;

type VerifyCodeFormProps = {
	className?: string;

	defaultValues?: Partial<Schema>;

	onSubmit: (data: Schema) => void;

	onResendCodePress: () => Promise<void>;
};

const VerifyCodeForm = ({
	className,
	defaultValues,
	onSubmit,
	onResendCodePress
}: VerifyCodeFormProps) => {
	const [timer, setTimer] = useResendCodeTimer();

	const form = useForm<Schema>({
		defaultValues: {
			code: "",
			...defaultValues
		},
		resolver: zodResolver(schema)
	});

	const { control, handleSubmit } = form;

	const { isValid } = useFormState({ control });

	const handleResendCodePress = () => {
		setTimer(60);
		onResendCodePress();
	};

	const handleFormSubmitPress = handleSubmit((data) => onSubmit(data));

	const isContinueButtonDisabled = !isValid;
	const isResendButtonDisabled = timer > 0;

	return (
		<View className={cn(className)}>
			<Form {...form}>
				<FormField
					control={control}
					name="code"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<OTPCodeInput onFilled={field.onChange} />
							</FormControl>
						</FormItem>
					)}
				/>
			</Form>

			<View className="mt-4 flex-row items-center justify-center gap-2">
				<Text className="text-lg">Didn&apos;t receive the code?</Text>

				<Pressable
					onPress={handleResendCodePress}
					disabled={isResendButtonDisabled}
				>
					<Text
						className={cn("text-lg text-primary-900 dark:text-primary-900", {
							"text-grey-500 dark:text-grey-500": isResendButtonDisabled
						})}
					>
						{isResendButtonDisabled ? `Resend (${timer}s)` : "Resend"}
					</Text>
				</Pressable>
			</View>

			<Button
				className="mt-auto"
				onPress={handleFormSubmitPress}
				disabled={isContinueButtonDisabled}
			>
				Continue
			</Button>
		</View>
	);
};
VerifyCodeForm.displayName = "VerifyCodeForm";

export type { VerifyCodeFormProps, Schema };
export { VerifyCodeForm };
