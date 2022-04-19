import React, { useCallback, useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import Featured from "../components/Featured";
import RecipeCard from "../components/RecipeCard";
import QueryBar from "../components/QueryBar";
import * as local from "../validation/securestore";

import { SimpleRecipe } from "../api/models";
import { getFavoriteIDs, getRecipes } from "../api/requests";
import { theme } from "../themes/Theme";
import { ActivityIndicator, Button } from "react-native-paper";
import { TabProps } from "../types";

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
	return String.fromCharCode(Math.floor(Math.random() * 26) + base);
};

const shuffleResponse = (response: SimpleRecipe[]) => {
	const ret = new Set<SimpleRecipe>();

	while (ret.size != 5) {
		let randomID = Math.floor(Math.random() * response.length);
		ret.add(response[randomID]);
	}

	return Array.from(ret);
};

// Tracks uniqueness of component key for recipe cards.
let key = 0;

const DiscoverTab = ({
	setHeaderStatus,
	setCurRecipe,
	favoriteStuff,
}: TabProps) => {
	const [recipes, setRecipes] = React.useState<SimpleRecipe[]>([]);
	const [randomLetter, setRandomLetter] = React.useState("");

	const [refreshing, setRefreshing] = useState(true);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setRandomLetter(getRandomLetter());
	}, []);

	React.useEffect(() => {
		getRecipes(getRandomLetter(), 0).then((response) => {
			setRecipes(shuffleResponse(response));
			setRefreshing(false);
		});
		// searchRecipes();
	}, [randomLetter]);

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
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
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
					flexDirection: "row",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Text style={{ fontSize: 20, color: theme.colors.text }}>
					Find by Random
				</Text>
				<Button
					style={{ width: 150 }}
					icon="refresh"
					mode="contained"
					onPress={() => setRandomLetter(getRandomLetter())}
				>
					Refresh
				</Button>
			</View>
			{!refreshing ? (
				recipes.map((recipe, i) => (
					<RecipeCard
						stub={recipe}
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
						favoriteStuff={favoriteStuff}
						key={i}
					/>
				))
			) : (
				<ActivityIndicator animating={true} color={"#000"} />
			)}
		</ScrollView>
	);
};

export default DiscoverTab;
