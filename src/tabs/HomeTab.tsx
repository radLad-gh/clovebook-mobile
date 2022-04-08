import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { Card, Divider, Searchbar, Button, Title } from "react-native-paper";
import HomeSearchBar from "../components/HomeSearchBar";
import RecipeCard from "../components/RecipeCard";
import Featured from "../components/Featured";
import { theme } from "../themes/Theme";

import { useNavigation } from "@react-navigation/native";

type TabProps = {
	// navigation: Navigation,
	// screenName: string,
	setHeaderStatus: Function;
};

const HomeTab = ({ setHeaderStatus }: TabProps) => {
	const navigation = useNavigation();

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
				title="Discover"
				loadScreen={() => {
					navigation.navigate("Discover" as never);
				}}
			/>
			<HomeSearchBar></HomeSearchBar>
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
					Recent Favorites
				</Text>
				<Button
					onPress={() => {
						navigation.navigate("Favorites" as never);
					}}
					color={theme.colors.text}
					compact={true}
					style={{ alignSelf: "center", marginBottom: -5 }}
				>
					View More
				</Button>
			</View>
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

export default HomeTab;
