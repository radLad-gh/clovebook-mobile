import { Text, View, ScrollView } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NewUser, User } from "../api/models";
import * as local from "../validation/securestore";
import { getUserByID } from "../api/requests";

let user: User = {
	createdAt: "",
	email: "",
	firstName: "",
	lastName: "",
	password: "",
	updatedAt: "",
	userID: "",
	username: "",
};

local.getValueFor("user-session").then((value) => {
	const userID = value;
	getUserByID(userID).then((result) => {
		user = result;
	});
});

const ProfileScreen = ({ user }: { user: NewUser }) => {
	return (
		<ScrollView
			style={{
				flexGrow: 1,
				backgroundColor: "#b3bb1b",
			}}
		>
			<View>
				<Text>{user.firstName}</Text>
				<Text></Text>
			</View>
		</ScrollView>
	);
};
export default ProfileScreen;
