import React, { useCallback, useEffect, useState } from "react";
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
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { defaultSimpleRecipe, NewUser, SimpleRecipe } from "../api/models";
import { getFavoriteIDs, getFavorites, toggleFavorite } from "../api/requests";
import { checkIfFav, setFavSet } from "../components/FavoriteStuff";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

type HomeTabsProps = {
	setHeaderStatus: Function;
	setCurRecipe: Function;
	setFavoriteStubs: Function;
	getFavoriteStubs: Function;
};

type HomeScreenProps = {
	setHeaderStatus: Function;
	user: NewUser;
};

let userID: string;

const HomeTabs = ({
	setHeaderStatus,
	setCurRecipe,
	setFavoriteStubs,
	getFavoriteStubs,
}: HomeTabsProps) => {
	// console.log("loaded home tabs");

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
						setFavoriteStubs={setFavoriteStubs}
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
						setFavoriteStubs={setFavoriteStubs}
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
						setFavoriteStubs={setFavoriteStubs}
						getFavoriteStubs={getFavoriteStubs}
					/>
				)}
				// options={{ tabBarHideOnKeyboard: true }}
			/>
		</Tab.Navigator>
	);
};

const HomeScreen = ({ setHeaderStatus }: HomeScreenProps) => {
	const navigation = useNavigation();
	const [curRecipe, setCurRecipe] = useState<SimpleRecipe>(defaultSimpleRecipe);
	const getCurRecipe = () => curRecipe;

	// const [shown, setShown] = useState(0);
	const [favIDsLoaded, setFavIDsLoaded] = useState(false);
	const [favStubsLoaded, setFavStubsLoaded] = useState(false);

	const [favoriteStubs, setFavoriteStubs] = useState<SimpleRecipe[]>();
	const getFavoriteStubs = () => favoriteStubs;
	const addToFavStubs = (stub: SimpleRecipe) => {
		setFavoriteStubs(favoriteStubs?.concat(stub));
	};
	const removeFromFavStubs = (id: string) => {
		if (!checkIfFav(id)) return;
		setFavoriteStubs(
			favoriteStubs?.filter(
				(stub) => stub.cookbookID !== id && "" + stub.spoonacularID !== id
			)
		);
	};

	// Get favorite IDs for correct heart state on home tab cards
	React.useEffect(() => {
		local.getValueFor("user-session").then((value) => {
			userID = value;
			getFavoriteIDs(userID).then((favIDs) => {
				// Initialize favorite ID set (for checking :3)
				setFavSet(favIDs);
				setFavIDsLoaded(true);
			});
		});
	}, []);

	// Get actual favorites for display on favorites tab
	React.useEffect(() => {
		local.getValueFor("user-session").then((value) => {
			userID = value;
			getFavorites(userID, "").then((response) => {
				// Initialize favorite stubs
				setFavoriteStubs(response);
				setFavStubsLoaded(true);
			});
		});
	}, []);

	return favIDsLoaded && favStubsLoaded ? (
		<Stack.Navigator>
			<Stack.Screen
				options={{ headerShown: false }}
				name="HomeTabs"
				children={() => (
					<HomeTabs
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
						setFavoriteStubs={setFavoriteStubs}
						getFavoriteStubs={getFavoriteStubs}
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
	) : (
		<></>
	);
};

export default HomeScreen;
