import { Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const SplashScreen = () => {
	return (
		<View>
			<Text>SPLASH!</Text>
		</View>
	);
};
export default SplashScreen;
