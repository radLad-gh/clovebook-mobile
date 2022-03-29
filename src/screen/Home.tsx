import React, {  } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Navigation } from "../types";
import HomeTab from '../tabs/HomeTab';
import DiscoverTab from '../tabs/DiscoverTab';
import FavoritesTab from "../tabs/FavoritesTab";
import Ionicons from '@expo/vector-icons/Ionicons';
import styles from "../themes/Theme";

const Tab = createBottomTabNavigator();

type Props = {
    navigation: Navigation,
};

function HomeScreen({ navigation }: Props) {
  return (
      <Tab.Navigator initialRouteName="Home"  screenOptions={({ route }) => ({
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
          tabBarActiveTintColor: '#0c2245ff',
          tabBarInactiveTintColor: 'gray',
      })}>
          <Tab.Screen name="Discover" component={DiscoverTab} />
          <Tab.Screen name="Home" component={HomeTab} />
          <Tab.Screen name="Favorites" component={FavoritesTab} />
      </Tab.Navigator>
  );
}

export default HomeScreen;