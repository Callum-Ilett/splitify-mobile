import React, { useState } from "react";
import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput
} from "react-native";

export default function App() {
	const [taps, setTaps] = useState(0);
	const [text, setText] = useState("");
	return (
		<SafeAreaView style={styles.container}>
			<Button title="Add one" onPress={() => setTaps(taps + 1)} />
			<Button
				title="Add ten"
				testID="add_ten"
				onPress={() => setTaps(taps + 10)}
			/>
			<Text>Number of taps: {taps}</Text>
			<TextInput
				testID="text_input"
				placeholder="Change me!"
				onChangeText={setText}
			/>
			<Text>You typed: {text}</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
