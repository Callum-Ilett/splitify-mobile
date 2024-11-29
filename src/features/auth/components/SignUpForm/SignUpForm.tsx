import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { Divider } from "@/components/ui/Divider";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/Form";
import { Text } from "@/components/ui/Text";
import { TextInput } from "@/components/ui/TextInput";
import { cn } from "@/theme/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { useForm, useFormState } from "react-hook-form";
import { Pressable, View } from "react-native";
import { z } from "zod";

const schema = z.object({
	firstName: z
		.string({ required_error: "First name is required" })
		.min(1, { message: "First name is required" }),

	lastName: z
		.string({ required_error: "Last name is required" })
		.min(1, { message: "Last name is required" }),

	agreeToTerms: z
		.boolean({
			required_error: "You must agree to the terms & policy"
		})
		.refine((value) => value === true, {
			message: "You must agree to the terms & policy"
		})
});

type Schema = z.infer<typeof schema>;

type SignUpFormProps = {
	className?: string;

	defaultValues?: Partial<Schema>;

	onSubmit: (data: Schema) => void;
};

const SignUpForm = ({
	className,
	defaultValues,
	onSubmit
}: SignUpFormProps) => {
	const form = useForm<Schema>({
		defaultValues: {
			firstName: "",
			lastName: "",
			agreeToTerms: false,
			...defaultValues
		},
		resolver: zodResolver(schema),
		mode: "onBlur",
		reValidateMode: "onChange"
	});

	const router = useRouter();

	const { control, handleSubmit } = form;
	const { submitCount, isValid } = useFormState({ control });

	const handleSignInPress = () => {
		router.push("/sign-in");
	};

	const handleFormSubmitPress = handleSubmit((data) => onSubmit(data));

	const isSignUpButtonDisabled = submitCount > 0 && !isValid;

	return (
		<Form className={cn(className)} {...form}>
			<View className="gap-5">
				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>

							<FormControl>
								<TextInput
									ref={field.ref}
									value={field.value}
									onBlur={field.onBlur}
									onChangeText={field.onChange}
									placeholder="First Name"
									accessibilityLabel="First Name"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>

							<FormControl>
								<TextInput
									ref={field.ref}
									value={field.value}
									onBlur={field.onBlur}
									onChangeText={field.onChange}
									placeholder="Last Name"
									accessibilityLabel="Last Name"
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
			</View>

			<FormField
				control={form.control}
				name="agreeToTerms"
				render={({ field }) => (
					<FormItem>
						<Pressable
							className="mt-7 flex flex-row items-center gap-4"
							onPress={() => field.onChange(!field.value)}
							testID="agree-to-terms-checkbox"
						>
							<FormControl className="border-none">
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
									accessibilityLabel="Agree to terms & policy"
								/>
							</FormControl>

							<FormLabel className="mb-0">
								<Text
									className="text-xl font-semibold"
									i18nKey="I agree to Splitify {0}"
								>
									I agree to Splitify{" "}
								</Text>

								<Text className="text-xl font-semibold text-primary-900 dark:text-primary-900">
									Terms & Policy.
								</Text>
							</FormLabel>
						</Pressable>

						<FormMessage />
					</FormItem>
				)}
			/>

			<Divider className="my-8" />

			<Text className="text-center text-xl font-medium">
				<Text i18nKey="Already have an account? {0}">
					Already have an account?{" "}
				</Text>

				<Text
					className="ml-[20px] text-xl font-bold text-primary-900 dark:text-primary-900"
					onPress={handleSignInPress}
				>
					Sign in
				</Text>
			</Text>

			<Button
				className="mt-auto"
				onPress={handleFormSubmitPress}
				isDisabled={isSignUpButtonDisabled}
			>
				Sign up
			</Button>
		</Form>
	);
};
SignUpForm.displayName = "SignUpForm";

export type { SignUpFormProps, Schema };
export { SignUpForm };
