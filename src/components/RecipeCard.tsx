import { SimpleRecipe } from "../api/models";
import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { IconButton, Card } from "react-native-paper";
import style, { theme } from "../themes/Theme";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { checkIfFav, updateFavorite } from "./FavoriteStuff";

// const loadCard = () => {

// }

const addFavorite = () => {};

const Time = ({ numericTime }: { numericTime: number }) => {
	let mag: string; // magnitude of time.
	if (numericTime < 60) mag = "m";
	else {
		numericTime = Math.floor(numericTime / 60);
		mag = "h";
	}

	return (
		<Text style={{ alignSelf: "flex-end", paddingRight: 15, top: 10 }}>
			{numericTime + mag}
		</Text>
	);
};

const cardDimentionConstant = 110;

type CardProps = {
	stub: SimpleRecipe;
	setHeaderStatus: Function;
	setCurRecipe: Function;
};

export function RecipeCard({ stub, setHeaderStatus, setCurRecipe }: CardProps) {
	const navigation = useNavigation();

	// Happens when you tap on a recipe card
	const openRecipe = () => {
		setHeaderStatus(false);
		setCurRecipe(stub);
		navigation.navigate("Recipe" as never);
	};

	const sID: number = stub.spoonacularID;
	const cID: string = stub.cookbookID;

	// Check whether this stub is from Spoonacular or our DB
	let id: string = cID === "100000000000000000000000" ? "" + sID : cID;

	// console.log("recipecard id: " + id);

	const [favorite, setFavorite] = React.useState(checkIfFav(id));
	const [color, setColor] = React.useState(
		favorite ? theme.colors.secondary : theme.colors.text_light
	);

	const toggleStar = () => {
		const newVal = !favorite;
		console.log("newVal in card: " + newVal);
		updateFavorite(id, newVal);
		setFavorite(newVal);
		// Perform these actions on toggle of favorite.
		favorite
			? setColor(theme.colors.text_light)
			: setColor(theme.colors.secondary);
	};

	return (
		<Card onPress={openRecipe} onLongPress={toggleStar} style={styles.card}>
			<Card.Cover
				source={{
					uri: stub.imageURL ? stub.imageURL : "https://picsum.photos/700",
				}}
				style={styles.cardCover}
			/>
			<View style={styles.cardInfo}>
				{/* <Card.Title title={stub.name} subtitle="Recipe" /> */}
				<Text numberOfLines={3} style={style.cardTitle}>
					{stub.name}
				</Text>
				<Time numericTime={stub.totalTime as number} />
				<IconButton
					icon="heart"
					color={color}
					onPress={toggleStar}
					style={{ top: -25 }}
				></IconButton>
			</View>
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
	},

	cardCover: {
		borderBottomRightRadius: 5,
		position: "absolute",
		resizeMode: "contain",
		height: "100%",
		width: cardDimentionConstant,
	},

	cardInfo: {
		marginTop: -3,
		flexDirection: "column",
		width: "100%",
		paddingLeft: cardDimentionConstant, // Position absolute, add 125 padding to "fit" correctly.
	},
});

export default RecipeCard;
