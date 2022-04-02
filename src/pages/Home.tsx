import React, {  } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import FavoritesScreen from "../screens/FavoritesScreen";
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Theme from "../themes/Theme";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecipeScreen from "../screens/RecipeScreen";

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} />
            <HomeStack.Screen name="Recipe" component={RecipeScreen} />
        </HomeStack.Navigator>
    )
}

const Tab = createBottomTabNavigator();

function Tabs() {
  return (
      <Tab.Navigator 
        initialRouteName="Home"  
        screenOptions={
            ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              
              if (route.name === 'Discover') {
                  iconName = focused
                  ? 'compass'
                  : 'compass-outline';
              } else if (route.name === 'Home') {
                  iconName = focused
                  ? 'md-home'
                  : 'home-outline';
              } else if (route.name === 'Favorites') {
                  iconName = focused
                  ? 'star'
                  : 'star-outline';
              }
              
              return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: Theme.colors.accent,
          tabBarInactiveTintColor: 'gray',
      })}>
          <Tab.Screen name="Discover" component={DiscoverScreen} />
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
      </Tab.Navigator>
  );
}

export default function Home() {
    return(
        <NavigationContainer>
            <Tabs />
        </NavigationContainer>
    );
};
