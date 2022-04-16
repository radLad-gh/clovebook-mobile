import React, { memo } from "react";
import { StyleSheet, View, Image, Keyboard, ScrollView } from "react-native";
import { Button, Modal, Portal, Text } from "react-native-paper";

import Input from "../components/Input";
import InputSecure from "../components/InputSecure";
import { theme } from "../themes/Theme";
import { doRegister, doAuth, doLogin } from "../api/requests";

import { Navigation } from "../types";
import { NewUser } from "../api/models";

import * as VALID from "../api/validator";

import md5 from "md5";
import jwt_decode from "jwt-decode";
import * as local from "../validation/securestore";
import * as SecureStore from "expo-secure-store";

interface cbJWT {
	userID: string;
	exp: string;
}

type TabProps = {
	screenName: string;
	getLoginValidity: Function;
	setLoginValidity: Function;
	user: NewUser;
};

const JoinTab = ({
	user,
	screenName,
	getLoginValidity,
	setLoginValidity,
}: TabProps) => {
	// Field placeholders
	const [firstPlaceHolder, setFirstPlaceHolder] = React.useState("Firstname");
	const [lastPlaceHolder, setLastPlaceHolder] = React.useState("Lastname");
	const [userPlaceHolder, setUserPlaceHolder] = React.useState("Username");
	const [emailPlaceHolder, setEmailPlaceHolder] = React.useState("Email");
	const [passPlaceholder, setPassPlaceholder] = React.useState("Password");

	// Field inputs
	const [firstname, setFirstname] = React.useState("");
	const [lastname, setLastname] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [email, setEmail] = React.useState("");

	// Field errors
	const [firstError, setFirstError] = React.useState(false);
	const [lastError, setLastError] = React.useState(false);
	const [userError, setUserError] = React.useState(false);
	const [emailError, setEmailError] = React.useState(false);
	const [passError, setPassError] = React.useState(false);
	// Verification junk
	let flag = false as Boolean;
	const [modalPresent, setModalPresent] = React.useState(false);
	const [code, setCode] = React.useState("");

	const [keyboardStatus, setKeyboardStatus] = React.useState("flex");

	React.useEffect(() => {
		Keyboard.addListener("keyboardDidShow", () => {
			setKeyboardStatus("none");
		});
		Keyboard.addListener("keyboardDidHide", () => {
			setKeyboardStatus("flex");
		});
	});
	const validate = () => {
		doAuth({ username, email }).then(() => {
			// bring up modal
			// user types in 6 digit.
			// confirm the code.
		});
		// doRegister({
		// 	userName: username,
		// 	email: email,
		// 	password: password,
		// 	firstName: firstname,
		// 	lastName: lastname
		// })
		// 	.then((data) => {
		// 		if (data !== undefined) {
		// 			const decoded = jwt_decode(data.refreshToken);
		// 			const userID: string = (decoded as cbJWT)!.userID;

		// 			// Save the access token locally.
		// 			local.save("user-session", userID);
		// 			// if (rememberSwitch) {
		// 			// 	local.save("username", username);
		// 			// 	local.save("password", password);
		// 			// }
		// 			setLoginValidity(true);
		// 		}
		// 	})
		// 	.catch((err) => console.log(err));
	};

	const resetErrorMessages = () => {
		// Reset error message/placeholder.
		setFirstPlaceHolder("Firstname");
		setLastPlaceHolder("Lastname");
		setEmailPlaceHolder("Email");
		setUserPlaceHolder("Username");
		setPassPlaceholder("Password");

		// Reset error colour
		setFirstError(false);
		setLastError(false);
		setEmailError(false);
		setUserError(false);
		setPassError(false);
	};

	return (
		<>
			<Portal>
				<Modal visible={modalPresent} onDismiss={() => setModalPresent(false)}>
					<View style={{ display: "flex", flexDirection: "column" }}>
						<Input
							label="Code"
							onChangeText={setCode}
							value={code}
							keyboardType={"phone-pad"}
							maxLength={6}
						/>
						<Button
							mode="contained"
							onPress={() => {
								doRegister(user, code)
									// If register-code is successfully typed in.
									.then((data) => {
										doLogin({ username, password })
											.then((data) => {
												if (data !== undefined) {
													const decoded = jwt_decode(data.refreshToken);
													const userID: string = (decoded as cbJWT)!.userID;

													// Save the access token locally.
													local.save("user-session", userID);
													// The user is now registered! Enter the site!
													setLoginValidity(true);
												}
											})
											.catch((error) => console.error(error));
									})
									.catch((error) => console.error(error));
							}}
							style={{ alignSelf: "center", width: 200, marginTop: 25 }}
						>
							Verify
						</Button>
					</View>
				</Modal>
			</Portal>
			<Image
				source={require("../assets/logo-dark.png")}
				style={[styles.logo, { display: keyboardStatus }]}
			/>
			<ScrollView
				style={styles.inputContainer}
				contentContainerStyle={{ paddingVertical: 25 }}
			>
				<Input
					error={firstError}
					label={firstPlaceHolder}
					onChangeText={setFirstname}
					value={firstname}
				></Input>
				<Input
					error={lastError}
					label={lastPlaceHolder}
					onChangeText={setLastname}
					value={lastname}
				></Input>
				<Input
					error={emailError}
					label={emailPlaceHolder}
					onChangeText={setEmail}
					value={email}
				></Input>
				<Input
					error={userError}
					label={userPlaceHolder}
					onChangeText={setUsername}
					value={username}
				></Input>
				<InputSecure
					error={passError}
					label={passPlaceholder}
					onChangeText={setPassword}
					value={password}
				></InputSecure>
				<View style={styles.inputOptionsContainer}></View>

				<Button
					mode="contained"
					onPress={() => {
						// Update the userInfo
						user.username = username;
						user.email = email;
						user.password = password;
						user.firstName = firstname;
						user.lastName = lastname;

						// On everypress, reset the flag and check each input
						flag = false;
						// And ofcourse, reset the errors.
						resetErrorMessages();

						if (VALID.isGoodFirst(user.firstName)) {
							setFirstPlaceHolder(VALID.isGoodFirst(user.firstName));
							setFirstError(true);
							flag = true;
						}
						if (VALID.isGoodLast(user.lastName)) {
							setLastPlaceHolder(VALID.isGoodLast(user.lastName));
							setLastError(true);
							flag = true;
						}
						if (VALID.isUsername(user.username)) {
							setUserPlaceHolder(VALID.isUsername(user.username));
							setUserError(true);
							flag = true;
						}
						if (VALID.isPassword(user.password)) {
							setPassPlaceholder(VALID.isPassword(user.password));
							setPassError(true);
							flag = true;
						}
						if (VALID.isEmail(user.email)) {
							setEmailPlaceHolder(VALID.isEmail(user.email));
							setEmailError(true);
							flag = true;
						}

						// If no flag, then the validation is truthy!
						if (!flag) {
							// Hash the passowrd.
							user.password = md5(password);
							validate();
							// On validation, open modal window for user
							// to type in 6 digit code.
							setModalPresent(true);
						}
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
		marginBottom: -60,
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
