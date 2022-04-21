import React from "react";
import { ScrollView, View } from "react-native";
import { FAB, TextInput, Title } from "react-native-paper";
import { User } from "../api/models";
import { theme } from "../themes/Theme";
import { updateUser } from "../api/requests";

type ScreenProps = {
	user: User;
	editStatus: boolean;
	setEditStatus: Function;
};

const ProfileScreen = ({ user, editStatus, setEditStatus }: ScreenProps) => {
	const [firstname, setFirstname] = React.useState(user.firstName);
	const [lastname, setLastname] = React.useState(user.lastName);
	// let name = user.firstName;
	const [name, setName] = React.useState(user.firstName);

	React.useEffect(() => {}, [name]);

	return (
		<>
			<ScrollView
				style={{
					flexGrow: 1,
					backgroundColor: theme.colors.background,
					flex: 1,
					paddingLeft: 18,
				paddingRight: 18,
				}}
			>
				<Title style={{ fontSize: 25, paddingVertical: 5 }}>Hi {name}!</Title>
				<Title>Update your Info:</Title>
				<View>
					<TextInput
						label="First Name"
						value={firstname}
						onChangeText={setFirstname}
						autoComplete={false}
						disabled={!editStatus}
						theme={{
							colors: {
								text: editStatus ? theme.colors.text : "black",
							},
						}}
					/>
					<TextInput
						label="Last Name"
						value={lastname}
						onChangeText={setLastname}
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
					backgroundColor: !editStatus
						? theme.colors.secondary
						: theme.colors.primary_dark,
				}}
				icon={!editStatus ? "pencil" : "content-save"}
				color={"white"}
				onPress={() => {
					setEditStatus(!editStatus);
					// Send firstname and lastname to the server to update.
					updateUser(user.userID, {
						...user,
						firstName: firstname,
						lastName: lastname,
					});
					setName(firstname);
				}}
			/>
		</>
	);
};

export default ProfileScreen;
