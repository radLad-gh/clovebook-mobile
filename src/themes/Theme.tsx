import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

export const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: "#aa9c8c",
<<<<<<< HEAD
		primary_glow: "#FACF50",
		primary_dark: "#73825D",
		primary_darker: "#435643",
		secondary: "#E5932A",
		// Use text on light backgrounds. Otherwise, text_light.
		text: "#303020",
		text_light: "#FAF4EB",
		accent: "#4f3c2f",
		background: "#E2DFD4",
		surface: "#FAF4EB",
		selected: "#80431A",
		notifications: "#f13a59",
=======
		primary_dark: "#82916B",
		primary_darker: "#7f6c57",
		secondary: "#db742f",
		selected: "#db742f",
		// Use text on light backgrounds. Otherwise, text_light.
		text: "#493520",
		text_light: "#F8F3EC",
		accent: "#4f3c2f",
		background: "#DBD2C7",
		surface: "#F8F3EC",
>>>>>>> cbb4e071c51d07f8a143e5b8b74f84f52217b4ed
	},
};

const recipePadding = 18;

const cardBorderConstant = 10;
const cardDimensionConstant = 110;

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

	/// RECIPE STUB CARDS ///
	card: {
		display: "flex",
		flexDirection: "row",
		height: cardDimensionConstant,
		borderRadius: cardBorderConstant,
		backgroundColor: theme.colors.surface,
		marginTop: 16,
		elevation: 3,
		shadowRadius: 2,
		shadowOpacity: 0.2,
		shadowColor: theme.colors.accent,
	},
	// Image
	cardCover: {
		resizeMode: "cover",
		borderRadius: cardBorderConstant,
		height: 165,
		///// Comment this back to make it horizontal
		//height: "auto",
		//width: cardDimensionConstant,
		// borderTopRightRadius: 0,
		// borderTopLeftRadius: cardBorderConstant,
		// borderBottomLeftRadius: cardBorderConstant,
		// borderBottomRightRadius: 0,
	},
	cardTitle: {
		fontSize: 24,
		// height: "auto",
		// marginBottom: 4,
		width: "auto",
		paddingLeft: 10,
		marginTop: 14,
		marginRight: 12,
		overflow: "hidden",
		color: theme.colors.text,
	},
	// Text and heart
	cardInfo: {
		flexDirection: "column",
		width: "auto",
		alignItems: "flex-start",
		paddingLeft: cardDimensionConstant, // Position absolute, add 125 padding to "fit" correctly.
	},

	// Recipe Modal
	infoBlock: {
		flexDirection: "column",
		display: "flex",
		height: "auto",
		backgroundColor: theme.colors.primary,
		padding: recipePadding,
		margin: recipePadding / 2,
		marginLeft: recipePadding,
		marginRight: recipePadding,
		// backgroundColor: theme.colors.surface,
		borderRadius: cardBorderConstant,
		borderBottomRightRadius: 3,
		borderTopLeftRadius: 3,
		// fontFamily: "Helvetica Neue",
	},

	recipeTitle: {
		margin: recipePadding,
		fontSize: 48,
		// fontFamily: "Helvetica Neue",
		color: theme.colors.text_light,
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
