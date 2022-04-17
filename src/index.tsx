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

import { NewUser } from "./api/models";
import * as local from "./validation/securestore";
import * as SecureStore from "expo-secure-store";
import ProfileScreen from "./screen/Profile";

const Drawer = createDrawerNavigator();

const userInfo: NewUser = {
	username: "",
	firstName: "",
	lastName: "",
	password: "",
	email: "",
};

const DrawerNavigator = () => {
	// // Used for authorization of user on load.
	// const [loginValid, setLoginValid] = React.useState(false);
	// const getLoginValidity = () => loginValid;
	// // Used to hide drawerHeader when recipe is shown.
	// const [headerStatus, setHeaderStatus] = React.useState(true);
	// const getHeaderStatus = () => headerStatus;
	// return (
	// 	<Drawer.Navigator
	// 		screenOptions={{
	// 			drawerStyle: {
	// 				backgroundColor: theme.colors.primary_glow,
	// 			},
	// 		}}
	// 		// props is a preset set of props from the drawer.nav.
	// 		drawerContent={({ ...props }) => (
	// 			<>
	// 				<View style={styles.drawerSection}>
	// 					<Image
	// 						source={require("./assets/logo-dark.png")}
	// 						style={styles.drawerLogo}
	// 					/>
	// 					<Divider />
	// 				</View>
	// 				<View style={styles.drawerSection}>
	// 					<PaperDrawer.Section title="My Account">
	// 						<Button
	// 							disabled={!loginValid}
	// 							icon="account"
	// 							mode="contained"
	// 							style={[styles.drawerButton, { marginBottom: 15 }]}
	// 							onPress={() => {
	// 								fetchUser();
	// 							}}
	// 						>
	// 							Profile
	// 						</Button>
	// 					</PaperDrawer.Section>
	// 					<PaperDrawer.Section title="Other">
	// 						<Button
	// 							icon="cog"
	// 							mode="contained"
	// 							style={styles.drawerButton}
	// 							onPress={() => console.log("settings screen")}
	// 						>
	// 							Settings
	// 						</Button>
	// 						<View style={{ height: 5 }}></View>
	// 						<Button
	// 							icon="help-circle-outline"
	// 							mode="contained"
	// 							style={[styles.drawerButton, { marginBottom: 15 }]}
	// 							onPress={() => console.log("help screen")}
	// 						>
	// 							Help
	// 						</Button>
	// 					</PaperDrawer.Section>
	// 				</View>
	// 				<View style={styles.drawerSection}>
	// 					<Button
	// 						disabled={!loginValid}
	// 						mode="contained"
	// 						style={{ marginHorizontal: 10, marginTop: 10 }}
	// 						onPress={() => {
	// 							// Remove the user's session token from
	// 							// the device.
	// 							local.deleteValue("user-session");
	// 							// Close the drawer
	// 							props.navigation.closeDrawer();
	// 							setLoginValid(false);
	// 						}}
	// 					>
	// 						Log Out
	// 					</Button>
	// 				</View>
	// 			</>
	// 		)}
	// 	>
	// 		{loginValid ? (
	// 			<Drawer.Screen
	// 				name="Clovebook"
	// 				children={() => (
	// 					<Home
	// 						user={userInfo}
	// 						getHeaderStatus={getHeaderStatus}
	// 						setHeaderStatus={setHeaderStatus}
	// 					/>
	// 				)}
	// 				options={{
	// 					headerShown: headerStatus,
	// 					headerTintColor: theme.colors.text_light,
	// 					headerStyle: { backgroundColor: theme.colors.primary },
	// 				}}
	// 			/>
	// 		) : (
	// 			<Drawer.Screen
	// 				name="Login"
	// 				options={{ headerShown: false }}
	// 				children={() => (
	// 					<Login
	// 						user={userInfo}
	// 						getLoginValidity={getLoginValidity}
	// 						setLoginValidity={setLoginValid}
	// 					/>
	// 				)}
	// 			/>
	// 		)}
	// 		<Drawer.Screen
	// 			name="Settings"
	// 			children={() => <Text>Settings screen.</Text>}
	// 		/>
	// 		<Drawer.Screen name="Help" children={() => <Text>Help screen.</Text>} />
	// 	</Drawer.Navigator>
	// );
};

function fetchUser() {
	React.useEffect(() => {
		(async () => {
			try {
				let result = await SecureStore.getItemAsync("user-session");
				if (result) console.log(result);
				else console.error("User session not saved on this device.");
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);
}

const App = () => {
	// Used for authorization of user on load.
	const [loginValid, setLoginValid] = React.useState(false);
	const getLoginValidity = () => loginValid;

	// Used to hide drawerHeader when recipe is shown.
	const [headerStatus, setHeaderStatus] = React.useState(true);
	const getHeaderStatus = () => headerStatus;

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
								<PaperDrawer.Section title="Clovebook">
									<Button
										icon="home"
										mode="contained"
										style={[
											styles.drawerButton,
											{
												marginBottom: 15,
												backgroundColor: theme.colors.secondary,
											},
										]}
										onPress={() => props.navigation.navigate("HomeScreen")}
									>
										Home
									</Button>
								</PaperDrawer.Section>
							) : (
								<></>
							)}
							<PaperDrawer.Section title="My Account">
								<Button
									disabled={!loginValid}
									icon="account"
									mode="contained"
									style={styles.drawerButton}
									onPress={async () => {
										try {
											let result = await SecureStore.getItemAsync(
												"user-session"
											);
											if (result) {
												// navigate to this users page
												props.navigation.navigate("Profile");

												console.log(result);
											} else
												console.error("Something went wrong fetching value.");
										} catch (error) {
											console.error(error);
										}
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
								>
									Settings
								</Button>
								<View style={{ height: 5 }}></View>
								<Button
									icon="help-circle-outline"
									mode="contained"
									style={[styles.drawerButton, { marginBottom: 15 }]}
									onPress={() => props.navigation.navigate("Help")}
								>
									Help
								</Button>
							</PaperDrawer.Section>
						</View>
						<View style={styles.drawerSection}>
							<Button
								disabled={!loginValid}
								mode="outlined"
								style={{ marginHorizontal: 10, marginTop: 10 }}
								onPress={() => {
									// Remove the user's session token from
									// the device.
									local.deleteValue("user-session");
									// Close the drawer
									props.navigation.closeDrawer();
									setLoginValid(false);
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
						name="HomeScreen"
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
					children={() => <ProfileScreen user={userInfo} />}
				/>
				<Drawer.Screen
					name="Settings"
					children={() => <Text>Settings screen.</Text>}
				/>
				<Drawer.Screen name="Help" children={() => <Text>Help screen.</Text>} />
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
