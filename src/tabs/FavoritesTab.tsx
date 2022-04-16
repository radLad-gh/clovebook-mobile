import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { theme } from "../themes/Theme";

import RecipeCard from "../components/RecipeCard";

type TabProps = {
	setHeaderStatus: Function;
	setCurRecipe: Function;
};

const FavoritesTab = ({ setHeaderStatus, setCurRecipe }: TabProps) => {
	return (
		<ScrollView
			style={{
				flexGrow: 1,
				backgroundColor: theme.colors.background,
				paddingLeft: 15,
				paddingRight: 15,
				marginBottom: 60,
			}}
		>
			<RecipeCard
				props={{
					spoonacularID: 0,
					cookbookID: "100000000000000000000000",
					name: "",
					updatedAt: "",
					ingredients: [],
					authorID: "",
				}}
				setHeaderStatus={setHeaderStatus}
				setCurRecipe={setCurRecipe}
			></RecipeCard>
			<RecipeCard
				props={{
					spoonacularID: 0,
					cookbookID: "100000000000000000000000",
					name: "",
					updatedAt: "",
					ingredients: [],
					authorID: "",
				}}
				setHeaderStatus={setHeaderStatus}
				setCurRecipe={setCurRecipe}
			></RecipeCard>
			<RecipeCard
				props={{
					spoonacularID: 0,
					cookbookID: "100000000000000000000000",
					name: "",
					updatedAt: "",
					ingredients: [],
					authorID: "",
				}}
				setHeaderStatus={setHeaderStatus}
				setCurRecipe={setCurRecipe}
			></RecipeCard>
		</ScrollView>
	);
};

export default FavoritesTab;
