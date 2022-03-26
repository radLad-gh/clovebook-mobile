import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
    HomeScreen,
    LoginScreen,
    JoinScreen,
} from "./screens";

const Router= createStackNavigator(
    {
        HomeScreen,
        LoginScreen,
        JoinScreen,
    },
    {
        initialRouteName: 'HomeScreen',
        headerMode: "none",
    }
);

export default createAppContainer(Router);