import { Button } from "@/components/ui/Button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/Form";
import { TextInput } from "@/components/ui/TextInput";
import { cn } from "@/theme/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	email: z.string().min(1)
});

type Schema = z.infer<typeof schema>;

type VerifyEmailFormProps = {
	className?: string;

	defaultValues?: Partial<Schema>;

	onSubmit: (data: Schema) => void;
};

const VerifyEmailForm = ({
	className,
	defaultValues,
	onSubmit
}: VerifyEmailFormProps) => {
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			...defaultValues
		}
	});

	const { control, handleSubmit } = form;
	const { isValid } = useFormState({ control });

	const handleFormSubmitPress = handleSubmit((data) => onSubmit(data));

	const isSecureAccountButtonDisabled = !isValid;

	return (
		<Form className={cn(className)} {...form}>
			<FormField
				control={form.control}
				name="email"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Email</FormLabel>

						<FormControl>
							<TextInput
								ref={field.ref}
								value={field.value}
								onBlur={field.onBlur}
								onChangeText={field.onChange}
								placeholder="Insert your email address"
								accessibilityLabel="Email"
								keyboardType="email-address"
								textContentType="emailAddress"
								autoComplete="email"
								autoCapitalize="none"
							/>
						</FormControl>

						<FormMessage />
					</FormItem>
				)}
			/>

			<Button
				className="mt-auto"
				onPress={handleFormSubmitPress}
				isDisabled={isSecureAccountButtonDisabled}
			>
				Continue
			</Button>
		</Form>
	);
};
VerifyEmailForm.displayName = "VerifyEmailForm";

export type { VerifyEmailFormProps, Schema };
export { VerifyEmailForm };
