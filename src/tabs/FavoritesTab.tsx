import React, { useEffect, useState } from "react";
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
	setFavoriteStubs: Function;
	getFavoriteStubs: Function;
};

const FavoritesTab = ({
	setHeaderStatus,
	setCurRecipe,
	setFavoriteStubs,
	getFavoriteStubs,
}: TabProps) => {
	// const [recipes, setRecipes] = React.useState<SimpleRecipe[]>([]);
	// TODO: add a search bar for this
	const [searchQuery, setQuery] = React.useState("");
	const [loaded, setLoaded] = React.useState(false);

	let userID: string;

	// React.useEffect(() => {
	// 	local.getValueFor("user-session").then((value) => {
	// 		userID = value;
	// 		// console.log("this is the userID in favs:", userID);
	// 		getFavorites(userID, searchQuery).then((response) => {
	// 			setRecipes(response);
	// 			setLoaded(true);
	// 		});
	// 	});
	// }, [searchQuery]);

	// useFocusEffect(
	// 	React.useCallback(() => {
	// 		setLoaded(false);
	// 		// console.log("userID in favorites focuseffect: " + userID);
	// 		local.getValueFor("user-session").then((value) => {
	// 			userID = value;
	// 			getFavorites(userID, searchQuery).then((response) => {
	// 				setRecipes(response);
	// 				setLoaded(true);
	// 			});
	// 		});
	// 	}, [])
	// );

	const [cards, setCards] = useState();

	useEffect(() => {
		setCards(
			getFavoriteStubs().map((recipe: SimpleRecipe, i: number) => (
				<RecipeCard
					stub={recipe}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					setFavoriteStubs={setFavoriteStubs}
					key={"fav" + i}
				/>
			))
		);
		setLoaded(true);
	}, [setFavoriteStubs]);

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
			{loaded ? cards : <></>}
		</ScrollView>
	);
};

export default FavoritesTab;
