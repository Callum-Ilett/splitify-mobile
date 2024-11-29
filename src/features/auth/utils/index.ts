export type FormatPhoneNumberParams = {
	callingCode: string;

	phoneNumber: string;
};

export const formatPhoneNumber = ({
	callingCode,
	phoneNumber
}: FormatPhoneNumberParams) => {
	return `${callingCode}${phoneNumber.replaceAll(" ", "")}`;
};

export const redactPhoneNumber = (phoneNumber: string) => {
	const cleanedPhoneNumber = phoneNumber.replace("+", "");
	const redactedPhoneNumber = cleanedPhoneNumber.replace(/\d(?=\d{4})/g, "*");

	return redactedPhoneNumber;
};
