import React, { memo } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Button, Switch } from "react-native-paper";

import Input from "../components/Input";
import InputSecure from "../components/InputSecure";
import { theme } from "../themes/Theme";
import { SvgUri } from "react-native-svg";

import { NewUser } from "../api/models";
import { doLogin } from "../api/requests"
import md5 from "md5";
import jwt_decode from "jwt-decode";
import * as local from "../validation/securestore";
import * as SecureStore from 'expo-secure-store';

import Logo from "../assets/logo.svg";

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
		(async () => {
			try {
				let result = await SecureStore.getItemAsync("user-session");
				if (result) setLoginValidity(true);
				else console.error('User session not saved on this device.');
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
	
	// Username and password input.
	const [username, setUsername] = React.useState("");
	const [password, setPassword] = React.useState("");

	// Watches the toggle switch for "Remember Me"
	//const [rememberSwitch, setRememberSwitch] = React.useState(false);
	//const onToggleSwitch = () => setRememberSwitch(!rememberSwitch);

	const validate = () => {
		doLogin({
			username: username,
			password: md5(password),
		})
			.then((data) => {
				if (data !== undefined) {
					const decoded = jwt_decode(data.refreshToken);
					const userID: string = (decoded as cbJWT)!.userID;

					// Save the access token locally.
					local.save("user-session", userID);	
					// if (rememberSwitch) {
					// 	local.save("username", username);
					// 	local.save("password", password);
					// }
					setLoginValidity(true);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Image source={require("../assets/logo-dark.png")} style={styles.logo} />
			{/* // Ability to use SVG if we wanted to.
				<Logo style={styles.logo} /> */
			}
			<View style={styles.inputContainer}>
				<Input
					label="Username"
					onChangeText={setUsername}
					value={username}
				></Input>
				<InputSecure
					label={"Password"}
					onChangeText={setPassword}
					value={password}
				></InputSecure>
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
							console.log("Forgot Password clicked.");
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
		marginBottom: -60
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
		marginTop: 5,
		marginLeft: 5,
	},
});

export default memo(LoginTab);
