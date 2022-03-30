import React, {  } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HomeTab from '../tabs/HomeTab';
import DiscoverTab from '../tabs/DiscoverTab';
import FavoritesTab from "../tabs/FavoritesTab";
import { theme } from '../themes/Theme'

import { Navigation } from "../types";

const Tab = createBottomTabNavigator();

type ScreenProps = {
  navigation: Navigation,
};

const HomeScreen = ({ navigation }: ScreenProps) => {

  return (
    <Tab.Navigator 
      initialRouteName="Home"  
      screenOptions={({ route }) => ({
        tabBarLabelPosition: "beside-icon",
        headerShown: false,
        tabBarStyle: {
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.selected,
            height: 60,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Discover') {
              iconName = focused
              ? 'compass'
              : 'compass-outline';
          } else if (route.name === 'Home') {
              iconName = focused
              ? 'home'
              : 'home-outline';
          } else if (route.name === 'Favorites') {
              iconName = focused
              ? 'star'
              : 'star-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveBackgroundColor: theme.colors.selected,
        tabBarActiveTintColor: theme.colors.accent,
    })}>
      <Tab.Screen name="Discover" component={DiscoverTab} />
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Favorites" component={FavoritesTab} />
    </Tab.Navigator>
  );
}

export default HomeScreen;