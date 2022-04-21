import jwt_decode from "jwt-decode";
import md5 from "md5";
import React, { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, Dialog, HelperText, Modal, Portal } from "react-native-paper";
import { NewUser } from "../api/models";
import { doLogin, sendResetEmail } from "../api/requests";
import Input from "../components/Input";
import InputSecure from "../components/InputSecure";
import { theme } from "../themes/Theme";
import * as local from "../validation/securestore";

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

const LoginTab = ({
	user,
	screenName,
	getLoginValidity,
	setLoginValidity,
}: TabProps) => {
	// This use effect runs on load, and checks if the session token is still
	// saved on the device, if it is, then the user is a valid login.
	React.useEffect(() => {
		local
			.getValueFor("user-session")
			.then((result) => {
				//console.log("logintab result: " + result);
				if (result) {
					setLoginValidity(true);
				} else {
					console.error("User session not saved on this device.");
				}
			})
			.catch();
	}, []);

	// Username and password input.
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	const [userError, setUserError] = React.useState(false);
	const [passError, setPassError] = React.useState(false);

	// Let the user know if the username or pass is incorrect.
	const [correctLogin, setCorrectLogin] = React.useState(true);

	const [modalPresent, setModalPresent] = React.useState(false);
	const [forgotEmail, setForgotEmail] = React.useState("");

	const [dialogPresent, setDialogPresent] = React.useState(false);
	// Watches the toggle switch for "Remember Me"
	//const [rememberSwitch, setRememberSwitch] = React.useState(false);
	//const onToggleSwitch = () => setRememberSwitch(!rememberSwitch);

	function warnUser(condition: boolean) {
		setUserError(condition);
		setPassError(condition);
		setCorrectLogin(!condition);
	}

	const validate = () => {
		doLogin({
			username: username,
			password: md5(password),
		})
			.then((data) => {
				// Token valid! Decode JWT and save the user token to device.
				if (data !== undefined) {
					const decoded = jwt_decode(data.refreshToken);
					const userID: string = (decoded as cbJWT)!.userID;

					local.save("user-session", userID);
					setLoginValidity(true);
					// Remove any error fields if any.
					warnUser(false);
				}
			})
			.catch(() => {
				// Let user know that the information provided is incorret.
				warnUser(true);
			});
	};

	const sendForgot = () => {
		// Sends an email to the typed in address and close the modal.
		sendResetEmail(forgotEmail);
		setModalPresent(false);
		setDialogPresent(true);
	};

	return (
		<>
			{/* Portal is a react-native-paper component which renders a component
			    at a different place than the parent tree. Useful for modals */}
			<Portal>
				<Modal visible={modalPresent} onDismiss={() => setModalPresent(false)}>
					<Input
						label="Email"
						onChangeText={setForgotEmail}
						value={forgotEmail}
						enterAction={sendForgot}
					/>
					<Button
						mode="contained"
						onPress={sendForgot}
						style={{ alignSelf: "center", width: 200, marginTop: 10 }}
					>
						Submit
					</Button>
				</Modal>
				<Dialog
					visible={dialogPresent}
					onDismiss={() => setDialogPresent(false)}
				>
					<Dialog.Title>Email Sent!</Dialog.Title>
					<Dialog.Content>
						<Text>
							Check your email for further instructions to reset your password
						</Text>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={() => setDialogPresent(false)}>Okay</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<Image source={require("../assets/logo-dark.png")} style={styles.logo} />
			{/* // Ability to use SVG if we wanted to.
				<Logo style={styles.logo} /> */}
			<View style={styles.inputContainer}>
				<Input
					error={userError}
					label="Username"
					onChangeText={setUsername}
					value={username}
				></Input>
				<InputSecure
					error={passError}
					label={"Password"}
					onChangeText={setPassword}
					value={password}
				></InputSecure>
				<HelperText type="error" visible={!correctLogin}>
					The username or password is incorrect.
				</HelperText>
				<View style={styles.inputOptionsContainer}>
					{/* <View style={styles.inputOptionRememberContainer}>
						<Text
							style={{
								paddingRight: 10,
								alignSelf: "center",
								color: theme.colors.text,
							}}
						>
							Remember Me
						</Text>
						<Switch value={rememberSwitch} onValueChange={onToggleSwitch} />
					</View> */}
					<Button
						style={styles.inputOptionForgot}
						mode="text"
						compact={true}
						uppercase={false}
						onPress={() => {
							setModalPresent(true);
						}}
					>
						Forgot Password
					</Button>
				</View>

				<Button
					mode="contained"
					style={{ alignSelf: "center", width: 200, marginTop: 75 }}
					onPress={validate}
				>
					Log In
				</Button>
			</View>
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
		flex: 2,
		justifyContent: "flex-start",
		paddingHorizontal: 25,
	},
	inputOptionsContainer: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
	},
	inputOptionRememberContainer: {
		flexDirection: "row",
		justifyContent: "center",
		width: "50%",
		paddingRight: 5,
	},
	inputOptionForgot: {
		backgroundColor: theme.colors.secondary,
		color: theme.colors.text,
		marginTop: 5,
		// marginLeft: 5,
	},
});

export default memo(LoginTab);
