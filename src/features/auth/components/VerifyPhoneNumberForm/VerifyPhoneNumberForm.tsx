import type { ICountry } from "@/components/ui/PhoneInput";

import { Button } from "@/components/ui/Button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/Form";
import { PhoneInput } from "@/components/ui/PhoneInput";
import { cn } from "@/theme/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useController, useForm, useFormState } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
	phoneNumber: z.string().min(1),

	callingCode: z.string().min(1)
});

type Schema = z.infer<typeof schema>;

type VerifyPhoneNumberFormProps = {
	className?: string;

	defaultValues?: Partial<Schema>;

	onSubmit: (data: Schema) => void;
};

const VerifyPhoneNumberForm = ({
	className,
	defaultValues,
	onSubmit
}: VerifyPhoneNumberFormProps) => {
	const form = useForm<Schema>({
		resolver: zodResolver(schema),
		reValidateMode: "onChange",
		defaultValues: {
			phoneNumber: "",
			callingCode: "",
			...defaultValues
		}
	});

	const { control, handleSubmit } = form;
	const { isValid } = useFormState({ control });

	const { field: callingCodeField } = useController({
		control,
		name: "callingCode"
	});

	const handleChangeSelectedContry = (country: ICountry) => {
		callingCodeField.onChange(country.callingCode);
	};

	const handleFormSubmitPress = handleSubmit((data) => onSubmit(data));

	const isSecureAccountButtonDisabled = !isValid;

	return (
		<Form className={cn(className)} {...form}>
			<FormField
				control={form.control}
				name="phoneNumber"
				render={({ field }) => (
					<FormItem>
						<FormLabel>Phone Number</FormLabel>

						<FormControl>
							<PhoneInput
								value={field.value}
								onChangePhoneNumber={field.onChange}
								onChangeSelectedCountry={handleChangeSelectedContry}
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
VerifyPhoneNumberForm.displayName = "VerifyPhoneNumberForm";

export type { VerifyPhoneNumberFormProps, Schema };
export { VerifyPhoneNumberForm };
