import React from "react";
import { AppRegistry } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import App from "./src";
import { theme } from "./src/themes/Theme";
import expo from "./app.json";

export default function Main() {
	return (
		<PaperProvider theme={theme}>
			<App />
		</PaperProvider>
	);
}
// TODO: This is arbitrary is it not?
AppRegistry.registerComponent(expo.expo.name, () => Main);
