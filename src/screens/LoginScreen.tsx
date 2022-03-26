import React, { memo } from "react";
import { Text } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Navigation } from "../types";
import Background from "../components/Background";

import LoginField from "../components/LoginField";

const LoginScreen = () => {
    return (
        <LoginField>
        </LoginField>
    );
};

export default memo(LoginScreen);