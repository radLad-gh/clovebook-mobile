import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { theme } from "../themes/Theme";

import RecipeCard from "../components/RecipeCard";

type TabProps = {
	setHeaderStatus: Function;
};

const FavoritesTab = ({ setHeaderStatus }: TabProps) => {
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
				props={{ sID: 0, cbID: 0, name: "", savedAt: "" }}
				setHeaderStatus={setHeaderStatus}
			></RecipeCard>
			<RecipeCard
				props={{ sID: 0, cbID: 0, name: "", savedAt: "" }}
				setHeaderStatus={setHeaderStatus}
			></RecipeCard>
			<RecipeCard
				props={{ sID: 0, cbID: 0, name: "", savedAt: "" }}
				setHeaderStatus={setHeaderStatus}
			></RecipeCard>
		</ScrollView>
	);
};

export default FavoritesTab;
