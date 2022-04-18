import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import DiscoverTab from "../tabs/DiscoverTab";
import FavoritesTab from "../tabs/FavoritesTab";
import HomeTab from "../tabs/HomeTab";
import { theme } from "../themes/Theme";
import { TabProps } from "../types";

const Tab = createBottomTabNavigator();

export const HomeTabs = ({
	setHeaderStatus,
	setCurRecipe,
	favoriteStuff,
}: TabProps) => {
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
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
						favoriteStuff={favoriteStuff}
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
						favoriteStuff={favoriteStuff}
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
						favoriteStuff={favoriteStuff}
					/>
				)}
				// options={{ tabBarHideOnKeyboard: true }}
			/>
		</Tab.Navigator>
	);
};
