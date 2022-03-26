import React, { memo } from "react";
import { SafeAreaView  } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { Navigation } from "../types";
import LoginScreen from "./LoginScreen";
import JoinScreen from "./JoinScreen";
import { theme } from "../core/theme";

type Props = {
    navigation: Navigation,
};

type tabBarIcon = {
    size: number;
    color: string;
};

const Tab = createBottomTabNavigator();

const HomeScreen = ({ navigation }: Props) => {

    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={{
                    tabBarLabelPosition: "beside-icon",
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: theme.colors.surface,
                        borderTopColor: theme.colors.selected,
                        height: 60,
                    },
                    tabBarActiveBackgroundColor: theme.colors.selected,
                }}
            >
                <Tab.Screen 
                    name="LOG IN" 
                    component={LoginScreen}
                    options={{
                        tabBarIcon: ({size, color}: tabBarIcon) => (
                            <Icon 
                                name={"login-variant"}
                                color={color} 
                                size={size} />
                        ),

                    }}
                />
                <Tab.Screen 
                    name="JOIN" 
                    component={JoinScreen}
                    options={{
                        tabBarIcon: ({size, color}: tabBarIcon) => (
                            <Icon 
                                name={"account-plus"}
                                color={color} 
                                size={size} />
                        )
                        
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
)};

export default memo(HomeScreen);