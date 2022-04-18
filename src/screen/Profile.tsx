import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Title, TextInput, ToggleButton, FAB } from "react-native-paper";

import { NewUser, User } from "../api/models";
import * as local from "../validation/securestore";
import { getUserByID } from "../api/requests";
import { theme } from "../themes/Theme";
import { ThemeColors } from "react-navigation";

type ScreenProps = {
	user: User;
	editStatus: boolean
	setEditStatus: Function
};

const ProfileScreen = ({ user, editStatus, setEditStatus }: ScreenProps) => {
	
	return (
		<>
			<ScrollView
				style={{
					flexGrow: 1,
					backgroundColor: theme.colors.background,
					flex: 1,
					paddingHorizontal: 15,
				}}
			>
				<Title style={{fontSize: 25, paddingVertical: 5}}>Hello {user.firstName}.</Title>
				<Title>Update your Info:</Title>
				<View>
					<TextInput
						label="Firstname"
						value={user.firstName}
						autoComplete={false}
						disabled={!editStatus}
						theme={{
							colors: {
								text: editStatus ? theme.colors.text : "black",
							},
						}}
					/>
					<TextInput
						label="Lastname"
						value={user.lastName}
						autoComplete={false}
						disabled={!editStatus}
						theme={{
							colors: {
								text: editStatus ? theme.colors.text : "black",
							},
						}}
					/>
					<TextInput
						label="Username"
						value={user.username}
						autoComplete={false}
						disabled={true}
						theme={{
							colors: {
								text: editStatus ? theme.colors.text : "black",
							},
						}}
					/>
					<TextInput
						label="Email"
						value={user.email}
						autoComplete={false}
						disabled={true}
						theme={{
							colors: {
								text: editStatus ? theme.colors.text : "black",
							},
						}}
					/>
				</View>
			</ScrollView>
			<FAB
				style={{
					position: "absolute",
					margin: 16,
					right: 0,
					bottom: 0,
					backgroundColor: !editStatus ? theme.colors.secondary : "green",
				}}
				icon={!editStatus ? "pencil" : "content-save"}
				color={"white"}
				onPress={() => {
					setEditStatus(!editStatus);
				}}
			/>
		</>
	);
};

export default ProfileScreen;
