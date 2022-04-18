import React from "react";
import { View, Text, Dimensions, ScrollView, BackHandler } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { theme } from "../themes/Theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Navigation } from "../types";
import Featured from "../components/Featured";
import RecipeCard from "../components/RecipeCard";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

type TabProps = {
	setHeaderStatus: Function;
	setCurRecipe: Function;
	setFavoriteStubs: Function;
};

const DiscoverTab = ({
	setHeaderStatus,
	setCurRecipe,
	setFavoriteStubs,
}: TabProps) => {
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
				title="Seasonal recipes"
				loadScreen={() => {
					console.log(`Clicked: seasonal`);
				}}
			/>
			<Featured
				imageSrc="https://picsum.photos/700"
				title="Find new with favorites"
				loadScreen={() => {
					console.log(`Clicked: new`);
				}}
			/>
			<Featured
				imageSrc="https://picsum.photos/700"
				title="Random"
				loadScreen={() => {
					console.log(`Clicked: random`);
				}}
			/>
			<View style={{ marginTop: 10 }}>
				<Text style={{ fontSize: 20, color: theme.colors.text }}>
					Featured Dishes
				</Text>
				<RecipeCard
					stub={{
						spoonacularID: 0,
						cookbookID: "000000000000000000000000",
						name: "",
						updatedAt: "",
						ingredients: [],
						authorID: "",
					}}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					setFavoriteStubs={setFavoriteStubs}
				></RecipeCard>
				<RecipeCard
					stub={{
						spoonacularID: 0,
						cookbookID: "000000000000000000000000",
						name: "",
						updatedAt: "",
						ingredients: [],
						authorID: "",
					}}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					setFavoriteStubs={setFavoriteStubs}
				></RecipeCard>
				<RecipeCard
					stub={{
						spoonacularID: 0,
						cookbookID: "000000000000000000000000",
						name: "",
						updatedAt: "",
						ingredients: [],
						authorID: "",
					}}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					setFavoriteStubs={setFavoriteStubs}
				></RecipeCard>
				<RecipeCard
					stub={{
						spoonacularID: 0,
						cookbookID: "000000000000000000000000",
						name: "",
						updatedAt: "",
						ingredients: [],
						authorID: "",
					}}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					setFavoriteStubs={setFavoriteStubs}
				></RecipeCard>
				<RecipeCard
					stub={{
						spoonacularID: 0,
						cookbookID: "000000000000000000000000",
						name: "",
						updatedAt: "",
						ingredients: [],
						authorID: "",
					}}
					setHeaderStatus={setHeaderStatus}
					setCurRecipe={setCurRecipe}
					setFavoriteStubs={setFavoriteStubs}
				></RecipeCard>
			</View>
		</ScrollView>
	);
};

export default DiscoverTab;
