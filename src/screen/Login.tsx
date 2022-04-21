import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { memo } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { NewUser } from "../api/models";
import JoinTab from "../tabs/JoinTab";
import LoginTab from "../tabs/LoginTab";
import { theme } from "../themes/Theme";

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
					height: 50,
				},
				tabBarActiveBackgroundColor: theme.colors.selected,
				tabBarActiveTintColor: theme.colors.text_light,
			}}
		>
			<Tab.Screen
				name="Login"
				children={() => (
					<LoginTab
						screenName={"Login"}
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
					tabBarLabelStyle: {fontSize: 18}
				}}
			/>
			<Tab.Screen
				name="Join"
				children={() => (
					<JoinTab
						screenName="Join"
						getLoginValidity={getLoginValidity}
						setLoginValidity={setLoginValidity}
						user={user}
					/>
				)}
				options={{
					tabBarIcon: ({ size, color }: tabBarIcon) => (
						<Icon name={"account-plus"} color={color} size={size} />
					),
					tabBarHideOnKeyboard: false,
					tabBarLabelStyle: {fontSize: 18}
				}}
			/>
		</Tab.Navigator>
	);
};

export default memo(LoginScreen);
