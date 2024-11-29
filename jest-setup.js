/* global jest */
import "@testing-library/react-native/extend-expect";

jest.mock("@/components/ui/Text", () => {
	const { Text } = jest.requireActual("react-native");
	return {
		Text: (props) => <Text {...props} />
	};
});

jest.mock("@/components/ui/Heading", () => {
	const { Text } = jest.requireActual("react-native");
	return {
		H1: (props) => <Text {...props} />,
		H2: (props) => <Text {...props} />,
		H3: (props) => <Text {...props} />,
		H4: (props) => <Text {...props} />,
		H5: (props) => <Text {...props} />,
		H6: (props) => <Text {...props} />
	};
});
