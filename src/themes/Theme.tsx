import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#AB98C7",
		primary_glow: "#79609F",
		accent: "#101041",
		background: "#E8E5E3",
		surface: "#C7C0BB",
		selected: "#AEA49E",
		text: "#283332",
		text_light: "#F1F4F3",

		notifications: "#f13a59",
	},
};

const styles = StyleSheet.create({
	home: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	discover: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	homeScreen: {
		backgroundColor: theme.colors.background,
		justifyContent: "flex-start",
		alignItems: "center",
	},
	searchBar: {
		top: 0,
		marginTop: 15,
	},
});

export default styles;
