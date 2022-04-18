import React from "react";
import { View, Text, Dimensions, ScrollView, BackHandler } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { theme } from "../themes/Theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Navigation } from "../types";
import Featured from "../components/Featured";
import RecipeCard from "../components/RecipeCard";
import QueryBar from "../components/QueryBar";


import { SimpleRecipe } from "../api/models";
import { getFavoriteIDs, getRecipes } from "../api/requests";

type TabProps = {
	setHeaderStatus: Function;
	setCurRecipe: Function;
};

// function getRandomRecipes() : SimpleRecipe[] {
// 	const base = 97;
	
// 	let recipes = [] as SimpleRecipe[];
// 	getRecipes(getRandomLetter()).then((response) => {
// 		recipes = response;
// 		return recipes.slice(0,4);
// 	});
// }

const getRandomLetter = () => {
	const base = 97;
	return String.fromCharCode((Math.floor(Math.random() * 26)) + base);
}

const shuffleResponse = (response : SimpleRecipe[]) => {
	const ret = new Set<SimpleRecipe>();

	while (ret.size != 5) {
		let randomID = Math.floor(Math.random() * response.length);
		ret.add(response[randomID]);
	}

	return Array.from(ret);
}

// Tracks uniqueness of component key for recipe cards.
let key = 0;

const DiscoverTab = ({ setHeaderStatus, setCurRecipe }: TabProps) => {
	
	const [recipes, setRecipes] = React.useState<SimpleRecipe[]>([]);
	const [randomLetter, setRandomLetter] = React.useState("");

	React.useEffect(() => {
		getRecipes(getRandomLetter()).then((response) => {
			setRecipes(shuffleResponse(response));
		})
	}, [randomLetter])


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
			<Featured
				imageSrc="https://picsum.photos/700"
				title="Random"
				loadScreen={() => setRandomLetter(getRandomLetter())}
			/>
			<View
				style={{
					marginTop: 10,
					display: "flex",
					flexDirection: 'row',
					justifyContent: "space-between",
					alignItems: 'center',
				}}
			>
				<Text style={{ fontSize: 20, color: theme.colors.text }}>
					Find by Random
				</Text>
				<Button
					style={{width: 150}}
					icon="refresh"
					mode="contained"
					onPress={() => setRandomLetter(getRandomLetter())}
				>
					Refresh
				</Button>
			</View>
			{recipes.map((recipe) => (
				<RecipeCard
					stub={recipe}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					key={key++}
				/>
			))}
		</ScrollView>
	);
};

export default DiscoverTab;
