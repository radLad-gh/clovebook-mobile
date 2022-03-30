import React, { memo } from "react";
import { Navigation } from "../types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoginTab from "../tabs/LoginTab";
import JoinTab from "../tabs/JoinTab";
import { theme } from "../themes/Theme";

type Props = {
  navigation: Navigation,
};

type tabBarIcon = {
  size: number;
  color: string;
};

const Tab = createBottomTabNavigator();

const LoginScreen = ({ navigation }: Props) => {
  // Our Homescreen consits of login and registering.
  // React navigation does magic to display the screen which you provide it.
  return (
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
        name="LOGIN" 
        children={() => <LoginTab navigation={navigation} screenName={"Home"}/>}
        options={{
            tabBarIcon: ({size, color}: tabBarIcon) => (
                <Icon name={"login-variant"} color={color} size={size} />
            ),
            tabBarHideOnKeyboard : true,
        }}
      />
      <Tab.Screen name="JOIN" component={JoinTab}
        options={{
          tabBarIcon: ({size, color}: tabBarIcon) => (
              <Icon name={"account-plus"} color={color} size={size} />
          ),
          tabBarHideOnKeyboard : true,
        }}
      />
    </Tab.Navigator>
)};

export default memo(LoginScreen);