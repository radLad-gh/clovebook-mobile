import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { theme } from "../themes/Theme";
import * as local from "../validation/securestore";

import RecipeCard from "../components/RecipeCard";
import { getFavorites } from "../api/requests";
import { SimpleRecipe } from "../api/models";
import { getFavSet } from "../components/FavoriteStuff";
import { useFocusEffect } from "@react-navigation/native";

type TabProps = {
	setHeaderStatus: Function;
	setCurRecipe: Function;
};

let userID: string;
local.getValueFor("user-session").then((value) => {
	userID = value;
});

const FavoritesTab = ({ setHeaderStatus, setCurRecipe }: TabProps) => {
	const [recipes, setRecipes] = React.useState<SimpleRecipe[]>([]);
	const [searchQuery, setQuery] = React.useState("");

	React.useEffect(() => {
		// recipes = getFavSet();
		console.log("this is the userID in favs:", userID);
		getFavorites(userID, searchQuery).then((response) => {
			setRecipes(response);
		});
	}, [searchQuery]);

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		console.log("refreshing favorites list for tab");
	// 		getFavorites(userID, searchQuery).then((response) => {
	// 			setRecipes(response);
	// 		});
	// 	}, [])
	// );

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
			{recipes.map((recipe, i) => (
				<RecipeCard
					stub={recipe}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					key={"fav" + i}
				/>
			))}
		</ScrollView>
	);
};

export default FavoritesTab;
