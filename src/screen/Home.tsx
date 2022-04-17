import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeTab from "../tabs/HomeTab";
import DiscoverTab from "../tabs/DiscoverTab";
import FavoritesTab from "../tabs/FavoritesTab";
import { theme } from "../themes/Theme";

import * as local from "../validation/securestore";
import { Navigation } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RecipeScreen from "./Recipe";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { defaultSimpleRecipe, NewUser, SimpleRecipe } from "../api/models";
import { getFavoriteIDs, toggleFavorite } from "../api/requests";
import { initFavSet } from "../components/FavoriteStuff";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

type HomeTabsProps = {
	//   navigation: Navigation;
	// getHeaderStatus: Function;
	setHeaderStatus: Function;
	user: NewUser;
	setCurRecipe: Function;
};

type HomeScreenProps = {
	setHeaderStatus: Function;
	user: NewUser;
};

let userID: string;

const HomeTabs = ({
	//   navigation,
	// getHeaderStatus,
	setHeaderStatus,
	setCurRecipe,
}: HomeTabsProps) => {
	// load favorite IDs
	// local.getValueFor("user-session").then((value) => {
	// 	userID = value;
	// 	setUserIDForFavorites(userID);
	// 	getFavoriteIDs(userID).then((favIDs) => {
	// 		console.log("set favorite set");
	// 		setFavSet(new Set<string>(favIDs));
	// 	});
	// });

	console.log("loaded home tabs");

	return (
		<Tab.Navigator
			initialRouteName="Home"
			backBehavior="initialRoute"
			screenOptions={({ route }) => ({
				tabBarLabelPosition: "beside-icon",
				headerShown: false,
				tabBarStyle: {
					backgroundColor: theme.colors.surface,
					borderTopColor: theme.colors.selected,
					height: 60,
					position: "absolute",
				},
				tabBarIcon: ({ focused, color, size }) => {
					let iconName;

					if (route.name === "Discover") {
						iconName = focused ? "compass" : "compass-outline";
					} else if (route.name === "Home") {
						iconName = focused ? "home" : "home-outline";
					} else if (route.name === "Favorites") {
						iconName = focused ? "heart" : "heart-outline";
					}

					return <Icon name={iconName as string} size={size} color={color} />;
				},
				tabBarActiveBackgroundColor: theme.colors.selected,
				tabBarActiveTintColor: theme.colors.text_light,
			})}
		>
			<Tab.Screen
				name="Discover"
				children={() => (
					<DiscoverTab
						// getHeaderStatus={getHeaderStatus}
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
					/>
				)}
				// options={{ tabBarHideOnKeyboard: true }}
			/>
			<Tab.Screen
				name="Home"
				children={() => (
					<HomeTab
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
					/>
				)}
				// options={{
				//   tabBarHideOnKeyboard: true,
				// }}
			/>
			<Tab.Screen
				name="Favorites"
				children={() => (
					<FavoritesTab
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
					/>
				)}
				// options={{ tabBarHideOnKeyboard: true }}
			/>
		</Tab.Navigator>
	);
};

const HomeScreen = ({
	// getHeaderStatus,
	setHeaderStatus,
	user,
}: HomeScreenProps) => {
	const navigation = useNavigation();
	const [curRecipe, setCurRecipe] = useState<SimpleRecipe>(defaultSimpleRecipe);
	const getCurRecipe = () => curRecipe;

	initFavSet();

	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{ headerShown: false }}
				name="HomeTabs"
				children={() => (
					<HomeTabs
						// getHeaderStatus={getHeaderStatus}
						setHeaderStatus={setHeaderStatus}
						user={user}
						setCurRecipe={setCurRecipe}
					/>
				)}
			/>
			<Stack.Screen
				name="Recipe"
				children={() => (
					<RecipeScreen
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
						getCurRecipe={getCurRecipe}
					/>
				)}
				options={{
					headerLeft: () => (
						<IconButton
							icon="arrow-left"
							size={25}
							onPress={() => {
								setHeaderStatus(true);
								navigation.navigate("HomeTabs" as never);
							}}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	);
};

export default HomeScreen;
