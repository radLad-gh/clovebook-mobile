import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SimpleRecipe } from "../api/models";
import { getFavorites } from "../api/requests";
import RecipeCard from "../components/RecipeCard";
import { theme } from "../themes/Theme";
import { TabProps } from "../types";
import * as local from "../validation/securestore";
import { useFocusEffect } from "@react-navigation/native";

const FavoritesTab = ({
	setHeaderStatus,
	setCurRecipe,
	favoriteStuff,
}: TabProps) => {
	// const [recipes, setRecipes] = React.useState<SimpleRecipe[]>([]);
	// TODO: add a search bar for this
	const [recipes, setRecipes] = useState<SimpleRecipe[]>([]);
	const [searchQuery, setQuery] = React.useState("");
	const [isLoaded, setLoaded] = React.useState(false);

	let userID: string;

	// const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setLoaded(false);
		initFavs();
	}, []);

	const loadFavs = () => {
		getFavorites(userID, searchQuery).then((response) => {
			setRecipes(response);
			setLoaded(true);
		});
	};

	const initFavs = () => {
		if (!userID) {
			local.getValueFor("user-session").then((value) => {
				userID = value;
				loadFavs();
			});
		} else {
			loadFavs();
		}
	};

	useFocusEffect(useCallback(() => initFavs(), []));

	useFocusEffect(
		useCallback(() => {
			return () => {
				setLoaded(false);
			};
		}, [])
	);

	const cards = recipes.map((stub, i) => (
		<RecipeCard
			stub={stub}
			setHeaderStatus={setHeaderStatus}
			setCurRecipe={setCurRecipe}
			favoriteStuff={favoriteStuff}
			fromFavsTabs={true}
			key={i}
		/>
	));

	return (
		<ScrollView
			style={{
				flexGrow: 1,
				backgroundColor: theme.colors.background,
				paddingLeft: 15,
				paddingRight: 15,
				marginBottom: 60,
			}}
			refreshControl={
				<RefreshControl refreshing={!isLoaded} onRefresh={onRefresh} />
			}
		>
			{isLoaded ? (
				cards.length === 0 ? (
					<View
						style={{
							alignItems: "center",
							alignSelf: "center",
							justifyContent: "center",
							flex: 1,
							display: "flex",
						}}
					>
						<Text
							style={{
								fontSize: 16,
								justifyContent: "center",
							}}
						>
							Try adding some recipes to your favorites!
						</Text>
					</View>
				) : (
					cards
				)
			) : (
				<></>
			)}
		</ScrollView>
	);
};

export default FavoritesTab;
