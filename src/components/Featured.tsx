import React from "react";
import { StyleSheet } from "react-native";
import { Card } from "react-native-paper";
import { theme } from "../themes/Theme";

const cardDimentionConstant = 133;

type Props = {
	title: string;
	imageSrc: string;
	loadScreen: any;
};

export function Featured({ imageSrc, title, loadScreen }: Props) {
	return (
		<Card onPress={loadScreen} onLongPress={loadScreen} style={styles.card}>
			<Card.Cover source={{ uri: imageSrc }} style={styles.cardCover} />
			<Card.Title title={title} titleStyle={styles.cardHeading} />
		</Card>
	);
}

const styles = StyleSheet.create({
	card: {
		display: "flex",
		flexDirection: "column",
		backgroundColor: theme.colors.surface,
		marginTop: 10,
		height: cardDimentionConstant,
		borderRadius: 7,
	},

	cardCover: {
		display: "flex",
		borderRadius: 7,
		position: "absolute",
		resizeMode: "contain",
		width: "100%",
		height: "100%",
	},

	cardHeading: {
		top: 88,
		color: theme.colors.text_light,
		shadowColor: theme.colors.text,
		textShadowOffset: { width: -1, height: 1 },
		textShadowRadius: 10,
		textTransform: "uppercase",
	},
});

export default Featured;
