import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { SimpleRecipe } from "../api/models";
import styles, { theme } from "../themes/Theme";
import { FavUtils } from "../types";

const Time = ({ numericTime }: { numericTime: number }) => {
	let mag: string; // magnitude of time.
	if (numericTime < 60) mag = "m";
	else {
		numericTime = Math.floor(numericTime / 60);
		mag = "h";
	}
	return (
		<Text style={{ fontSize: 18, alignSelf: "flex-end", marginBottom: 16 }}>
			{numericTime + mag}
		</Text>
	);
};

const cardDimensionConstant = 120;

type CardProps = {
	stub: SimpleRecipe;
	setHeaderStatus: Function;
	setCurRecipe: Function;
	favoriteStuff: FavUtils;
	fromFavsTabs?: boolean;
};

export function RecipeCard(props: CardProps) {
	const navigation = useNavigation();

	// Happens when you tap on a recipe card
	const openRecipe = () => {
		props.setHeaderStatus(false);
		props.setCurRecipe(props.stub);
		navigation.navigate("Recipe" as never);
	};

	const cID = props.stub.cookbookID;
	const sID = props.stub.spoonacularID;

	// Check whether this stub is from Spoonacular or our DB
	const id = cID === "100000000000000000000000" ? "" + sID : cID;

	// console.log("recipecard id: " + id);

	const [favorite, setFavorite] = React.useState(
		props.fromFavsTabs ? true : props.favoriteStuff.checkIfFav(id)
	);
	const [color, setColor] = React.useState(
		favorite ? theme.colors.secondary : theme.colors.text_light
	);

	useEffect(() => {
		const isFav = props.favoriteStuff.checkIfFav(id);
		setFavorite(isFav);
		setColor(isFav ? theme.colors.secondary : theme.colors.text_light);
	}, [props.favoriteStuff]);

	const toggleStar = () => {
		props.favoriteStuff.updateFavorite(props.stub, !favorite);
	};

	let backCount = 0;
	let backTimer: NodeJS.Timeout;
	return (
		// <Card
		// 	onPress={openRecipe}
		// 	onLongPress={toggleStar}
		// 	style={{
		// 		display: "flex",
		// 		flexDirection: "row",
		// 		marginTop: 10,
		// 		borderRadius: 10,
		// 		height: 240,
		// 	}}
		// >
		<Pressable onPress={openRecipe} onLongPress={toggleStar}>
			<View
				style={{
					backgroundColor: theme.colors.primary,
					marginTop: 14,
					borderRadius: 15,
					//	height: cardDimensionConstant,
					height: "auto",
					width: "auto",
					display: "flex",
					flexDirection: "column",
				}}
			>
				<Image
					source={{
						uri: props.stub.imageURL
							? props.stub.imageURL
							: "https://picsum.photos/700",
					}}
					style={styles.cardCover}
					// style={{
					// 	resizeMode: "cover",
					// 	flex: 1,
					// 	width: 240,
					// 	alignSelf: "flex-start",
					// }}
				/>

				<View
					style={{
						overflow: "hidden",
						// height: cardDimensionConstant,
						height: "auto",
						maxHeight: 500,
						width: "100%",
						paddingLeft: 8,
						flex: -1, // shrinks to proper size
						display: "flex",
						flexDirection: "column",
						alignItems: "stretch",
						justifyContent: "space-between",
					}}
				>
					{/* <Card.Title title={stub.name} subtitle="Recipe" /> */}
					<Text numberOfLines={2} style={styles.cardTitle}>
						{props.stub.name}
					</Text>

					<View
						style={{
							position: "relative",
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "stretch",
							height: "auto",
							paddingLeft: 12,
							paddingRight: 8,
						}}
					>
						<Time numericTime={props.stub.totalTime as number} />
						<IconButton
							icon="heart"
							color={color}
							onPress={toggleStar}
							style={{ position: "relative" }}
						/>
					</View>
				</View>
			</View>
		</Pressable>
		// </Card>
	);
}

export default RecipeCard;
