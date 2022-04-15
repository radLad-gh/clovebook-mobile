import React, { memo } from "react";
import { StyleSheet, View, Image, Keyboard, ScrollView } from "react-native";
import { Button } from "react-native-paper";

import Input from "../components/Input";
import InputSecure from "../components/InputSecure";
import { theme } from "../themes/Theme";

import { Navigation } from "../types";
import { NewUser } from "../api/models";

type TabProps = {
	user: NewUser;
	screenName: string;
};

const JoinTab = ({user, screenName} : TabProps) => {
	const [firstname, setFirstname] = React.useState('');
	const [lastname, setLastname] = React.useState('');
	const [username, setUsername] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [email, setEmail] = React.useState('');

	const [keyboardStatus, setKeyboardStatus] = React.useState("flex");
	React.useEffect(() => {
		Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardStatus("none");
		});
		Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardStatus("flex");
		});
	});

	return (
		<>
			<Image
				source={require("../assets/logo-dark.png")}
				style={[styles.logo, { display: keyboardStatus }]}
			/>
			<ScrollView
				style={styles.inputContainer}
				contentContainerStyle={{ paddingVertical: 25 }}
			>
				<Input label="Firstname" onChangeText={setFirstname} value={firstname}></Input>
				<Input label="Lastname" onChangeText={setLastname} value={lastname}></Input>
				<Input label="Email" onChangeText={setEmail} value={email}></Input>
				<Input label="Username" onChangeText={setUsername} value={username}></Input>
				<InputSecure label="Password" onChangeText={setPassword} value={password}></InputSecure>
				<View style={styles.inputOptionsContainer}></View>

				<Button
					mode="contained"
					onPress={() => {
						// Assign the user object values from inputs.
						user.firstName = firstname;
						user.lastName = lastname;
						user.email = email;
						user.username = username;
						user.password = password;

						// Now that the "data" for a registration is complete,
						// We need to verify it to verify it to the backend.
						

						
					}}
					style={{ alignSelf: "center", width: 200, marginTop: 25 }}
				>
					Join
				</Button>
			</ScrollView>
		</>
	);
};

const styles = StyleSheet.create({
	logo: {
		flex: 1,
		backgroundColor: theme.colors.background,
		width: "100%",
		resizeMode: "contain",
		paddingTop: 100,
		marginBottom: -60
	},
	inputContainer: {
		backgroundColor: theme.colors.background,
		flex: 1,
		paddingHorizontal: 25,
		// Hacky way to get this page the way it looks.
		paddingBottom: 250,
	},
	inputOptionsContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "row",
	},
});

export default memo(JoinTab);
