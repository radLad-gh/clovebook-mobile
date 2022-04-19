import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import {
	Drawer as PaperDrawer,
	Divider,
	Button,
	Colors,
} from "react-native-paper";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import LoginScreen from "./screen/Login";
import HomeScreen from "./screen/Home";
import { theme } from "./themes/Theme";

import { NewUser, User } from "./api/models";
import * as local from "./validation/securestore";
import * as SecureStore from "expo-secure-store";
import ProfileScreen from "./screen/Profile";
import { getUserByID } from "./api/requests";
import AboutScreen from "./screen/About";

const Drawer = createDrawerNavigator();

const userInfo: NewUser = {
	username: "",
	firstName: "",
	lastName: "",
	password: "",
	email: "",
};

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

const App = () => {
	React.useEffect(() => {
		local.getValueFor("user-session").then((value) => {
			const userID = value;
			getUserByID(userID).then((result) => {
				user = result;
			});
		});
	}, [user]);

	// Used for authorization of user on load.
	const [loginValid, setLoginValid] = React.useState(false);
	const getLoginValidity = () => loginValid;
	// Used to hide drawerHeader when recipe is shown.
	const [headerStatus, setHeaderStatus] = React.useState(true);
	// Edit status is if the user is in an edit/update state on a page.
	const [editStatus, setEditStatus] = React.useState(false);

	return (
		<NavigationContainer>
			<Drawer.Navigator
				screenOptions={{
					drawerStyle: {
						backgroundColor: theme.colors.primary_glow,
					},
				}}
				// props is a preset set of props from the drawer.nav.
				drawerContent={({ ...props }) => (
					<>
						<View style={styles.drawerSection}>
							<Image
								source={require("./assets/logo-dark.png")}
								style={styles.drawerLogo}
							/>
							<Divider />
						</View>
						<View style={styles.drawerSection}>
							{loginValid ? (
								<PaperDrawer.Section title="Clove">
									<Button
										icon="home"
										mode="contained"
										style={[
											styles.drawerButton,
											{ backgroundColor: theme.colors.secondary },
										]}
										onPress={() => props.navigation.navigate("Clove")}
									>
										Home
									</Button>
									<View style={{ height: 5 }}></View>
									<Button
										icon="help-circle-outline"
										mode="contained"
										style={styles.drawerButton}
										onPress={() => props.navigation.navigate("About")}
									>
										About
									</Button>
								</PaperDrawer.Section>
							) : (
								<></>
							)}
							<PaperDrawer.Section title="My Account">
								<View style={{ height: 5 }}></View>
								<Button
									disabled={!loginValid}
									icon="account"
									mode="contained"
									style={styles.drawerButton}
									onPress={() => {
										props.navigation.navigate("Profile");
									}}
								>
									Profile
								</Button>
								<View style={{ height: 5 }}></View>
								<Button
									icon="cog"
									mode="contained"
									style={styles.drawerButton}
									onPress={() => props.navigation.navigate("Settings")}
									disabled={true}
								>
									Settings
								</Button>
							</PaperDrawer.Section>
						</View>
						<View style={styles.drawerSection}>
							<Button
								disabled={!loginValid}
								color={theme.colors.accent}
								mode="outlined"
								style={{ marginHorizontal: 10, marginTop: 10 }}
								onPress={() => {
									// Set of actions to do when the user logs
									// out. A "clean slate" for a new session

									// Remove the user's session token from
									// the device.
									local.deleteValue("user-session");

									// When the user is editing, remove the
									// "edit" state.
									setEditStatus(false);

									// **HomeScreen needs to be set on logout**
									props.navigation.navigate("Clove");
									setLoginValid(false);
									props.navigation.closeDrawer();
								}}
							>
								Log Out
							</Button>
						</View>
					</>
				)}
			>
				{loginValid ? (
					<Drawer.Screen
						name="Clove"
						children={() => (
							<HomeScreen
								user={userInfo}
								// getHeaderStatus={getHeaderStatus}
								setHeaderStatus={setHeaderStatus}
							/>
						)}
						options={{
							headerShown: headerStatus,
							headerTintColor: theme.colors.text_light,
							headerStyle: { backgroundColor: theme.colors.primary },
						}}
					/>
				) : (
					<Drawer.Screen
						name="LoginScreen"
						options={{ headerShown: false }}
						children={() => (
							<LoginScreen
								user={userInfo}
								getLoginValidity={getLoginValidity}
								setLoginValidity={(thing: boolean) => setLoginValid(thing)}
							/>
						)}
					/>
				)}
				<Drawer.Screen
					name="Profile"
					children={() => (
						<ProfileScreen
							user={user}
							editStatus={editStatus}
							setEditStatus={setEditStatus}
						/>
					)}
				/>
				<Drawer.Screen
					name="Settings"
					children={() => <Text>Settings screen.</Text>}
				/>
				<Drawer.Screen
					name="About"
					children={() => <AboutScreen user={user} />}
				/>
			</Drawer.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	drawerSection: {
		paddingVertical: 5,
	},
	drawerButton: {
		marginHorizontal: 10,
		paddingVertical: 2,
	},

	drawerLogo: {
		margin: -10,
		height: 150,
		width: 300,
		marginTop: 35,
		resizeMode: "contain",
	},
});

export default App;
