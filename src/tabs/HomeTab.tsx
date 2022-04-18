import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { Card, Divider, Searchbar, Button, Title } from "react-native-paper";
import QueryBar from "../components/QueryBar";
import RecipeCard from "../components/RecipeCard";
import Featured from "../components/Featured";
import { theme } from "../themes/Theme";

import { useNavigation } from "@react-navigation/native";

import { SimpleRecipe } from "../api/models";
import { getFavoriteIDs, getRecipes } from "../api/requests";
import * as local from "../validation/securestore";
import { setFavSet } from "../components/FavoriteStuff";

type TabProps = {
	// navigation: Navigation,
	// screenName: string,
	setHeaderStatus: Function;
	setCurRecipe: Function;
};

let userID: string;

const HomeTab = ({ setHeaderStatus, setCurRecipe }: TabProps) => {
	const navigation = useNavigation();

	const [recipes, setRecipes] = React.useState<SimpleRecipe[]>([]);
	const [searchQuery, setQuery] = React.useState("");

	React.useEffect(() => {
		local.getValueFor("user-session").then((value) => {
			// TODO: change empty string to seachquery when building app!!#!#!@@$%#
			getRecipes("").then((response) => {
				setRecipes(response);
			});
		});
	}, [searchQuery]);

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
			{/* <Featured
				imageSrc="https://picsum.photos/700"
				title="Discover"
				loadScreen={() => {
					navigation.navigate("Discover" as never);
				}}
			/> */}
			<QueryBar submit={setQuery}></QueryBar>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: 5,
					marginBottom: -5,
				}}
			>
				<Text
					style={{
						alignSelf: "center",
						fontSize: 20,
						color: theme.colors.text,
					}}
				>
					Find New Recipes!
				</Text>
			</View>
			{recipes.map((recipe, i) => (
				<RecipeCard
					stub={recipe}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					key={i}
				/>
			))}
		</ScrollView>
	);
};

export default HomeTab;
