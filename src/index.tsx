import * as React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Drawer as PaperDrawer, Divider, Button } from "react-native-paper";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Splash from "./screen/Splash";
import Login from "./screen/Login";
import Home from "./screen/Home";
import { theme } from "./themes/Theme";
import SplashScreen from "./screen/Splash";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const DrawerNavigator = () => {
	// Used for the splash screen.
	const [isLoading, setLoading] = React.useState(true);
	// Used for authorization of user on load.
	const [loginValid, setLoginValid] = React.useState(true);
	const getLoginValidity = () => loginValid;

	// Used to hide drawerHeader when recipe is shown.
	const [headerStatus, setHeaderStatus] = React.useState(true);
	const getHeaderStatus = () => headerStatus;

	React.useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts/1")
			.then((response) => response.json())
			.then((response) => {
				if (response == null) {
					setLoginValid(false);
				}
				console.log("Fetched data.");
				setLoading(!isLoading); // Do user auth here?
				console.log(response.id);
			});
	}, []);

	return (
		<Drawer.Navigator
			drawerContent={() => (
				<>
					<View style={styles.drawerSection}>
						<Image
							source={require("./assets/logo-light.png")}
							style={styles.drawerLogo}
						/>
						<Divider />
					</View>
					<View style={styles.drawerSection}>
						<PaperDrawer.Section title="My Account">
							<Button
								disabled={!loginValid}
								icon="account"
								mode="contained"
								style={styles.drawerButton}
								onPress={() => console.log("profile screen")}
							>
								Profile
							</Button>
						</PaperDrawer.Section>
						<PaperDrawer.Section title="Other">
							<Button
								icon="cog"
								mode="contained"
								style={styles.drawerButton}
								onPress={() => console.log("settings screen")}
							>
								Settings
							</Button>
							<View style={{ height: 5 }}></View>
							<Button
								icon="help-circle-outline"
								mode="contained"
								style={styles.drawerButton}
								onPress={() => console.log("help screen")}
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
								setLoginValid(false);
							}}
						>
							Log Out
						</Button>
					</View>
				</>
			)}
		>
			{isLoading ? (
				<Drawer.Screen
					name="Splash"
					component={SplashScreen}
					options={{ headerShown: false }}
				/>
			) : loginValid ? (
				<Drawer.Screen
					name="Clovebook"
					children={() => (
						<Home
							getHeaderStatus={getHeaderStatus}
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
					name="Login"
					options={{ headerShown: false }}
					children={() => (
						<Login
							getLoginValidity={getLoginValidity}
							setLoginValidity={setLoginValid}
						/>
					)}
				/>
			)}

			<Drawer.Screen
				name="Settings"
				children={() => <Text>Settings screen.</Text>}
			/>
			<Drawer.Screen name="Help" children={() => <Text>Help screen.</Text>} />
		</Drawer.Navigator>
	);
};

const App = () => {
	return (
		<>
			<NavigationContainer>
				<DrawerNavigator />
				{/* 
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator> 
        */}
			</NavigationContainer>
		</>
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
		resizeMode: "contain",
	},
});

export default App;
