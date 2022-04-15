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
        secondary: "#e5952e",
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

const styles = StyleSheet.create({
	home: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    discover: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeScreen: {
        backgroundColor: theme.colors.background,
        justifyContent: 'flex-start', 
        alignItems: 'center'   
    },
    searchBar: {
        top: 0,
        marginTop: 10,
    },
    card: {
        display: "flex",
        flexDirection: "column",
        borderRadius: 20,
        backgroundColor: theme.colors.surface,
        marginTop: 15,
        elevation: 3,
    }
});

export default styles;
