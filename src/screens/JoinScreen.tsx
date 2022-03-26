import React, { memo } from "react";
import { Text } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Navigation } from "../types";
import Background from "../components/Background";

type Props = {
    navigation: Navigation;
};

const JoinScreen = () => {
    
    return (
        <Background>
            <Text>Hello Join!</Text>
        </Background>
)};

export default memo(JoinScreen);