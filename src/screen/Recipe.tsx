import React, { useState } from "react";
import { View, Text, Dimensions, ScrollView, BackHandler } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { theme } from "../themes/Theme";

import { Navigation } from "../types";
import Featured from "../components/Featured";
import RecipeCard from "../components/RecipeCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getRecipeById } from "../api/requests";
import { Recipe, SimpleRecipe } from "../api/models";

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
	const [recipe, setRecipe] = useState<Recipe>();

	const getFullRecipe = () => {
		// Get stub we clicked on (and fields from it)
		const curRecipe: SimpleRecipe = getCurRecipe();
		const sID: number = curRecipe.spoonacularID;
		const cID: string = curRecipe.cookbookID;

		// Check whether this stub is from Spoonacular or our DB
		let id: string = cID === "100000000000000000000000" ? "" + sID : cID;

		return getRecipeById(id).then((response) => {
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
				paddingLeft: 15,
				paddingRight: 15,
			}}
		>
			<Text>{JSON.stringify(recipe)}</Text>
		</ScrollView>
	);
};

export default RecipeScreen;
