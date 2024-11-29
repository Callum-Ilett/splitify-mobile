import type {
	ICountry,
	PhoneInputProps as IPhoneInputProps
} from "react-native-international-phone-number";

import { useTranslation } from "@/i18n/utils";
import colors from "@/theme/colors";
import { cn } from "@/theme/utils";
import { useState } from "react";
import { useColorScheme, View } from "react-native";
import InternationalPhoneNumber from "react-native-international-phone-number";

type PhoneInputProps = {
	value: string;

	onChangePhoneNumber: (phoneNumber: string) => void;

	ref?: never;
} & Omit<IPhoneInputProps, "selectedCountry">;

const PhoneInput = ({
	value,
	className,
	defaultValue,
	onChangePhoneNumber,
	onChangeSelectedCountry
}: PhoneInputProps) => {
	const [selectedCountry, setSelectedCountry] = useState<null | ICountry>(null);

	const theme = useColorScheme();

	const { translate } = useTranslation();

	const handleSelectedCountryChange = (country: ICountry) => {
		setSelectedCountry(country);
		onChangeSelectedCountry?.(country);
	};

	return (
		<View className={cn("gap-2", className)}>
			<InternationalPhoneNumber
				value={value}
				defaultValue={defaultValue}
				onChangePhoneNumber={onChangePhoneNumber}
				placeholder={translate("Insert your phone number")}
				selectedCountry={selectedCountry}
				onChangeSelectedCountry={handleSelectedCountryChange}
				defaultCountry="GB"
				placeholderTextColor={colors.grey["500"]}
				modalSearchInputPlaceholderTextColor={colors.grey["500"]}
				accessibilityLabel="Phone Number"
				phoneInputStyles={{
					callingCode: {
						color: colors.grey["500"]
					},
					caret: {
						fontSize: 24
					},
					container: {
						backgroundColor:
							theme === "light" ? colors.grey["50"] : colors.dark["300"],
						borderWidth: 0,
						borderRadius: 12,
						height: 58,
						overflow: "hidden"
					},
					divider: {
						display: "none"
					},
					flag: {
						fontSize: 24
					},
					flagContainer: {
						backgroundColor: "transparent",
						paddingHorizontal: 10,
						borderRadius: 0
					},
					input: {
						backgroundColor:
							theme === "light" ? colors.grey["50"] : colors.dark["300"],
						color: theme === "light" ? colors.black : colors.white
					}
				}}
				modalStyles={{
					backdrop: {},
					callingCode: {
						color: theme === "light" ? colors.black : colors.white
					},
					countriesList: {},
					countryButton: {
						backgroundColor:
							theme === "light" ? colors.grey["50"] : colors.dark["300"],
						borderColor: theme === "light" ? colors.grey["300"] : "transparent"
					},
					countryName: {
						color: theme === "light" ? colors.black : colors.white
					},
					divider: {
						backgroundColor:
							theme === "light" ? colors.grey["200"] : colors.dark["500"],
						marginVertical: 16
					},
					flag: {
						fontSize: 24
					},
					modal: {
						backgroundColor:
							theme === "light" ? colors.white : colors.dark["100"]
					},
					noCountryContainer: {},
					noCountryText: {},
					searchInput: {
						backgroundColor:
							theme === "light" ? colors.grey["50"] : colors.dark["300"],
						borderColor: theme === "light" ? colors.grey["300"] : "transparent",
						color: theme === "light" ? colors.black : colors.white
					}
				}}
				returnKeyType="done"
			/>
		</View>
	);
};
PhoneInput.displayName = "PhoneInput";

export type { PhoneInputProps };
export { PhoneInput };
