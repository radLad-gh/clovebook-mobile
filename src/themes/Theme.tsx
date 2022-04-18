import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#a7bfc2",
		primary_glow: "#e1eaeb",
		primary_dark: "#809799",
		primary_darker: "#4f3c2f",
		secondary: "#e77f38",
		// Use text on light backgrounds. Otherwise, text_light.
		text: "#493520",
		text_light: "#f2f0e4",
		accent: "#4f3c2f",
		background: "#e1eaeb",
		surface: "#d0d8d9",
		selected: "#809799",

		notifications: "#f13a59",
	},
};
const recipePadding = 18;

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
		marginTop: 5,
	},
	card: {
		display: "flex",
		flexDirection: "column",
		borderRadius: 20,
		backgroundColor: theme.colors.surface,
		marginTop: 15,
		elevation: 3,
	},
	infoBlock: {
		flexDirection: "column",
		display: "flex",
		backgroundColor: theme.colors.surface,
		padding: recipePadding,
		margin: recipePadding / 2,
		marginLeft: recipePadding,
		marginRight: recipePadding,
		borderRadius: 16,
		borderBottomRightRadius: 3,
		borderTopLeftRadius: 3,
		height: "auto",

		fontFamily: "Helvetica Neue",
	},
	cardTitle: {
		fontSize: 24,
		padding: 12,
		paddingTop: 16,
		height: 78,

		paddingBottom: 4,
		marginRight: 12,
		overflow: "hidden",
	},
	recipeTitle: {
		margin: recipePadding,
		// marginBottom: 4,
		fontSize: 48,
		fontFamily: "Helvetica Neue",
		marginBottom: 6,
		height: "auto",
	},
	authorName: {
		fontSize: 32,
		color: theme.colors.primary_darker,
		marginLeft: recipePadding,
	},
	blockLabels: {
		fontSize: 28,
		height: "auto",
		paddingTop: 3,
	},
	body: {
		fontSize: 20,
		lineHeight: 28,
		marginBottom: 8,
	},
	link: {
		color: theme.colors.secondary,
		fontSize: 20,
		textDecorationLine: "underline",
	},
});

export default styles;
