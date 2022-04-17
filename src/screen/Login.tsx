import React, { memo } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import LoginTab from "../tabs/LoginTab";
import JoinTab from "../tabs/JoinTab";
import { theme } from "../themes/Theme";

import { NewUser } from "../api/models";

type ScreenProps = {
	getLoginValidity: Function;
	setLoginValidity: Function;
	user: NewUser;
};

type tabBarIcon = {
	size: number;
	color: string;
};

const Tab = createBottomTabNavigator();

const LoginScreen = ({
	getLoginValidity,
	setLoginValidity,
	user,
}: ScreenProps) => {
	React.useEffect(() => {
		// TODO: STOPPED HERE
	});

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
				tabBarActiveTintColor: theme.colors.text_light,
			}}
		>
			<Tab.Screen
				name="LoginTab"
				children={() => (
					<LoginTab
						screenName={"Home"}
						getLoginValidity={getLoginValidity}
						setLoginValidity={setLoginValidity}
						user={user}
					/>
				)}
				options={{
					tabBarIcon: ({ size, color }: tabBarIcon) => (
						<Icon name={"login-variant"} color={color} size={size} />
					),
					tabBarHideOnKeyboard: false,
				}}
			/>
			<Tab.Screen
				name="Join"
				children={() => <JoinTab screenName="Join" user={user} />}
				options={{
					tabBarIcon: ({ size, color }: tabBarIcon) => (
						<Icon name={"account-plus"} color={color} size={size} />
					),
					tabBarHideOnKeyboard: false,
				}}
			/>
		</Tab.Navigator>
	);
};

export default memo(LoginScreen);
