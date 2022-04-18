import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { theme } from "../themes/Theme";
import * as local from "../validation/securestore";

import RecipeCard from "../components/RecipeCard";
import { getFavorites } from "../api/requests";
import { SimpleRecipe } from "../api/models";
import { getFavSet } from "../components/FavoriteStuff";
import { useFocusEffect } from "@react-navigation/native";
import { Title } from "react-native-paper";

type TabProps = {
	setHeaderStatus: Function;
	setCurRecipe: Function;
};

const FavoritesTab = ({ setHeaderStatus, setCurRecipe }: TabProps) => {
	const [recipes, setRecipes] = React.useState<SimpleRecipe[]>([]);
	const [searchQuery, setQuery] = React.useState("");

	console.log("rendered FavoritesTab");

	let userID: string;

	React.useEffect(() => {
		let userID: string;
		local.getValueFor("user-session").then((value) => {
			userID = value;
			// console.log("this is the userID in favs:", userID);

			getFavorites(userID, searchQuery).then((response) => {
				setRecipes(response);
			});
		});
	}, [searchQuery]);

	useFocusEffect(
		React.useCallback(() => {
			// console.log("userID in favorites focuseffect: " + userID);
			local.getValueFor("user-session").then((value) => {
				userID = value;
				getFavorites(userID, searchQuery).then((response) => {
					setRecipes(response);
				});
			});
		}, [])
	);

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
			<Title
				style={{
					alignSelf: "flex-start",
					fontSize: 25,
					color: theme.colors.text,
					paddingTop: 7,
				}}
			>
				Favorites:
			</Title>
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
