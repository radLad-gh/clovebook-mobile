import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { ScrollView, Text, View, RefreshControl } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { SimpleRecipe } from "../api/models";
import { getRecipes } from "../api/requests";
import Featured from "../components/Featured";
import HomeSearchBar from "../components/HomeSearchBar";
import RecipeCard from "../components/RecipeCard";
import { theme } from "../themes/Theme";
import { TabProps } from "../types";
import * as local from "../validation/securestore";

let userID: string;

const HomeTab = ({
	setHeaderStatus,
	setCurRecipe,
	favoriteStuff,
}: TabProps) => {
	const navigation = useNavigation();

	const [recipes, setRecipes] = React.useState<SimpleRecipe[]>([]);
	const [searchQuery, setQuery] = React.useState("");
	const [offset, setOffset] = React.useState(0);
	const [refreshing, setRefreshing] = useState(true);

	React.useEffect(() => {
		searchRecipes();
	}, [searchQuery]);

	const searchRecipes = () => {
		local.getValueFor("user-session").then((value) => {
			getRecipes(searchQuery, 0).then((response) => {
				setRecipes(response);
				setOffset(offset + response.length);
				setRefreshing(false);
			});
		});
	};

	const getMoreRecipes = () => {
		local.getValueFor("user-session").then((value) => {
			getRecipes(searchQuery, offset).then((response) => {
				setRecipes([...recipes, ...response]);
				setOffset(offset + response.length);
			});
		});
	};

	const isCloseToBottom = ({
		layoutMeasurement,
		contentOffset,
		contentSize,
	}: any) => {
		const paddingToBottom = 20;
		return (
			layoutMeasurement.height + contentOffset.y >=
			contentSize.height - paddingToBottom
		);
	};

	useFocusEffect(
		useCallback(() => {
			// console.log("useFocusEffect triggered");
		}, [])
	);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		searchRecipes();
	}, []);

	return (
		<ScrollView
			scrollEventThrottle={1000}
			style={{
				flexGrow: 1,
				backgroundColor: theme.colors.background,
				paddingLeft: 15,
				paddingRight: 15,
				marginBottom: 60,
			}}
			onScroll={({ nativeEvent }) => {
				if (isCloseToBottom(nativeEvent)) {
					getMoreRecipes();
				}
			}}
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
		>
			<Featured
				imageSrc="https://picsum.photos/700"
				title="Discover"
				loadScreen={() => {
					navigation.navigate("Discover" as never);
				}}
			/>
			<HomeSearchBar submit={setQuery}></HomeSearchBar>
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

export default HomeTab;
