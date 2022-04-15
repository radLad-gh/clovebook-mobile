import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeTab from "../tabs/HomeTab";
import DiscoverTab from "../tabs/DiscoverTab";
import FavoritesTab from "../tabs/FavoritesTab";
import { theme } from "../themes/Theme";

import { Navigation } from "../types";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Recipe from "./Recipe";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

import { NewUser } from "../api/models";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

type ScreenProps = {
	//   navigation: Navigation;
	getHeaderStatus: Function;
	setHeaderStatus: Function;
	user: NewUser;
};

const HomeTabs = ({
	//   navigation,
	getHeaderStatus,
	setHeaderStatus,
}: ScreenProps) => {
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
						iconName = focused ? "star" : "star-outline";
					}

					return <Icon name={iconName} size={size} color={color} />;
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
						// navigation={navigation}
					/>
				)}
				// options={{ tabBarHideOnKeyboard: true }}
			/>
			<Tab.Screen
				name="Home"
				children={() => <HomeTab setHeaderStatus={setHeaderStatus} />}
				// options={{
				//   tabBarHideOnKeyboard: true,
				// }}
			/>
			<Tab.Screen
				name="Favorites"
				children={() => <FavoritesTab setHeaderStatus={setHeaderStatus} />}
				// options={{ tabBarHideOnKeyboard: true }}
			/>
		</Tab.Navigator>
	);
};

const HomeScreen = ({ getHeaderStatus, setHeaderStatus, user }: ScreenProps) => {
	const navigation = useNavigation();

	return (
		<Stack.Navigator>
			<Stack.Screen
				options={{ headerShown: false }}
				name="HomeTabs"
				children={() => (
					<HomeTabs
						getHeaderStatus={getHeaderStatus}
						setHeaderStatus={setHeaderStatus}
						user={user}
					/>
				)}
			/>
			<Stack.Screen
				name="Recipe"
				children={() => <Recipe setHeaderStatus={setHeaderStatus} />}
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
