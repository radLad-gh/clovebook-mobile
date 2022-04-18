import React from "react";
import { ScrollView, Text, View } from "react-native";
import Featured from "../components/Featured";
import RecipeCard from "../components/RecipeCard";
import { theme } from "../themes/Theme";
import { TabProps } from "../types";

const DiscoverTab = ({
	setHeaderStatus,
	setCurRecipe,
	favoriteStuff,
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
					favoriteStuff={favoriteStuff}
				></RecipeCard>
			</View>
		</ScrollView>
	);
};

export default DiscoverTab;
