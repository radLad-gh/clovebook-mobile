import React, { useState } from "react";
import {
	View,
	Dimensions,
	Image,
	ScrollView,
	BackHandler,
	Text,
	Linking,
	FlatList,
} from "react-native";
import { Button, IconButton, Headline, Subheading } from "react-native-paper";
import styles, { theme } from "../themes/Theme";
import { decimalToFraction } from "./UnitConverter";
import { Navigation } from "../types";
import Featured from "../components/Featured";
import RecipeCard from "../components/RecipeCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getRecipe } from "../api/requests";
import { Recipe, SimpleRecipe, Nutrient } from "../api/models";

type RecipeProps = {
	setHeaderStatus: Function;
	setCurRecipe: Function;
	getCurRecipe: Function;
	// componentName: string;
};

const RecipeScreen = ({
	//   navigation,
	// getHeaderStatus,
	setHeaderStatus,
	setCurRecipe,
	getCurRecipe, // Use this function to retrieve the SimpleRecipe you clicked on to get here
}: RecipeProps) => {
	const navigation = useNavigation();

	// THIS IS THE FULL RECIPE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	const [recipe, setRecipe] = useState<Recipe>();
	const importantNutrients = [
		"Calcium",
		"Carbohydrates",
		"Sugar",
		"Fiber",
		"Cholesterol",
		"Fat",
		"Sodium",
		"Saturated Fat",
		"Vitamin C",
		"Protein",
		"Vitamin B",
	];
	const getFullRecipe = () => {
		// Get stub we clicked on (and fields from it)
		const curRecipe: SimpleRecipe = getCurRecipe();
		const sID: number = curRecipe.spoonacularID;
		const cID: string = curRecipe.cookbookID;

		// Check whether this stub is from Spoonacular or our DB
		let id: string = cID === "100000000000000000000000" ? "" + sID : cID;

		getRecipe(id).then((response) => {
			setRecipe(response);
		});
	};

	useFocusEffect(
		React.useCallback(() => {
			const onBackPress = () => {
				setHeaderStatus(true);
				navigation.navigate("HomeTabs" as never);
				return true;
			};

			BackHandler.addEventListener("hardwareBackPress", onBackPress);

			return () =>
				BackHandler.removeEventListener("hardwareBackPress", onBackPress);
		}, [])
	);

	// Fetch & update full recipe when the recipe stub in parent component changes
	React.useEffect(() => {
		getFullRecipe();
	}, [setCurRecipe]);

	return (
		<ScrollView
			style={{
				flexGrow: 1,
				backgroundColor: theme.colors.background,
			}}
		>
			<Image
				style={{
					width: "auto",
					height: 400,
					borderBottomRightRadius: 32,
					shadowRadius: 10,
				}}
				source={{
					uri:
						recipe?.imageURL === "" || recipe?.imageURL === null
							? "http://www.nyan.cat/images/Collection11-20.gif"
							: recipe?.imageURL,
				}}
			/>

			<Text style={styles.recipeTitle}>{recipe?.name}</Text>
			<Text style={styles.authorName}>{recipe?.author}</Text>
			<View
				style={{
					paddingTop: 0,
					display: "flex",
					flexDirection: "column",
				}}
			>
				{/* Ingredients */}
				<View style={styles.infoBlock}>
					<Subheading style={styles.blockLabels}>Ingredients</Subheading>
					{recipe?.ingredients?.map((ingredient, _) => (
						<Text key={ingredient.name} style={styles.body}>
							{ingredient.name}: {decimalToFraction(ingredient.amount).display}
							{"\u00A0"}
							{ingredient.unit}
						</Text>
					))}
				</View>

				{/* Instructions */}
				<View style={styles.infoBlock}>
					<Subheading style={styles.blockLabels}>Instructions</Subheading>
					{recipe?.instructions?.map((instruction, i) => (
						<Text key={"instr" + i} style={styles.body}>
							{i + 1}. {instruction.description}
						</Text>
					))}
				</View>

				{/* Nutrients */}

				{recipe?.nutrients ? (
					<View style={styles.infoBlock}>
						<Subheading style={styles.blockLabels}>Nutrition</Subheading>
						<View style={{ display: "flex" }}>
							{recipe?.nutrients?.map((nutrient, i) =>
								importantNutrients.includes(nutrient.name) &&
								(nutrient?.percentOfDailyNeeds || nutrient.amount) ? (
									<Text key={"nutri" + i} style={styles.body}>
										{nutrient.name}: {nutrient.amount} (
										{nutrient?.percentOfDailyNeeds.toPrecision(2)} % of DV)
									</Text>
								) : (
									<></>
								)
							)}
						</View>
					</View>
				) : (
					<></>
				)}
				{/* URL for Spoon Recipes */}

				{recipe?.url ? (
					<View style={styles.infoBlock}>
						<Subheading style={styles.blockLabels}>Recipe Link</Subheading>
						<Text
							style={styles.link}
							onPress={() => Linking.openURL(recipe?.url as string)}
						>
							{recipe?.url}
						</Text>
					</View>
				) : (
					<></>
				)}

				{/* <Text>{JSON.stringify(recipe?.nutrients)}</Text> */}
			</View>
		</ScrollView>
	);
};

export default RecipeScreen;
