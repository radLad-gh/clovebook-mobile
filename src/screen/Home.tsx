import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import { defaultSimpleRecipe, NewUser, SimpleRecipe } from "../api/models";
import { getFavoriteIDs, getFavorites, toggleFavorite } from "../api/requests";
import { HomeTabs } from "../components/HomeTabs";
import * as local from "../validation/securestore";
import RecipeScreen from "./Recipe";

const Stack = createNativeStackNavigator();

type HomeScreenProps = {
	setHeaderStatus: Function;
	user: NewUser;
};

let userID: string;

const HomeScreen = ({ setHeaderStatus }: HomeScreenProps) => {
	const navigation = useNavigation();
	const [curRecipe, setCurRecipe] = useState<SimpleRecipe>(defaultSimpleRecipe);
	const getCurRecipe = () => curRecipe;

	const [favStubs, setFavStubs] = useState<SimpleRecipe[]>([]);
	const [favIDs, setFavIDs] = useState<Set<string>>(new Set<string>());

	const checkIfFav = (id: string): boolean => favIDs.has(id);
	const updateFavorite = (recipeStub: SimpleRecipe, set: boolean): void => {
		const recipeID =
			recipeStub.cookbookID === "100000000000000000000000"
				? "" + recipeStub.spoonacularID
				: recipeStub.cookbookID;

		// console.log("updating favorite id " + recipeID + " to be " + set);

		// Update set of IDs
		let newFavIDs = new Set<string>(favIDs);
		// console.log("size of newFavIDs before: " + newFavIDs.size);
		if (set && !newFavIDs.has(recipeID)) {
			newFavIDs.add(recipeID);
		} else if (!set) {
			newFavIDs.delete(recipeID);
		}
		// console.log("size of newFavIDs after: " + newFavIDs.size);
		setFavIDs(newFavIDs);

		// Update array of stubs
		let newFavStubs = [...favStubs];
		// console.log("size of newFavStubs before: " + newFavStubs.length);
		if (set && !newFavStubs.includes(recipeStub)) {
			newFavStubs.push(recipeStub);
		} else if (!set) {
			newFavStubs = newFavStubs.filter(
				(stub) =>
					stub.cookbookID !== recipeID && "" + stub.spoonacularID !== recipeID
			);
		}
		// console.log("size of newFavStubs before: " + newFavStubs.length);
		setFavStubs(newFavStubs);

		// Get user ID if it's not stored already
		if (!userID) {
			local.getValueFor("user-session").then((value) => {
				userID = value;
				// API Call
				toggleFavorite(userID, set, recipeID);
			});
		} else {
			// API Call
			toggleFavorite(userID, set, recipeID);
		}
	};

	const [favIDsLoaded, setFavIDsLoaded] = useState(false);
	const [favStubsLoaded, setFavStubsLoaded] = useState(false);

	const initFavs = () => {
		getFavoriteIDs(userID).then((favIDs) => {
			// Initialize favorite ID set (for checking :3)
			const newFavIDs = new Set<string>(favIDs);
			setFavIDs(newFavIDs);
			setFavIDsLoaded(true);
		});

		getFavorites(userID, "").then((favs) => {
			setFavStubs(favs);
			setFavStubsLoaded(true);
		});
	};

	React.useEffect(() => {
		if (!userID) {
			local.getValueFor("user-session").then((value) => {
				userID = value;
				initFavs();
			});
		} else {
			initFavs();
		}
	}, []);

	return favIDsLoaded && favStubsLoaded ? (
		<Stack.Navigator>
			<Stack.Screen
				options={{ headerShown: false }}
				name="HomeTabs"
				children={() => (
					<HomeTabs
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
						favoriteStuff={{ favStubs, checkIfFav, updateFavorite }}
					/>
				)}
			/>
			<Stack.Screen
				name="Recipe"
				children={() => (
					<RecipeScreen
						setHeaderStatus={setHeaderStatus}
						setCurRecipe={setCurRecipe}
						getCurRecipe={getCurRecipe}
					/>
				)}
				options={{
					headerLeft: () => (
						<IconButton
							icon="arrow-left"
							size={25}
							onPress={() => {
								setHeaderStatus(true);
								navigation.navigate("HomeTabs" as never);
							}}
						/>
					),
				}}
			/>
		</Stack.Navigator>
	) : (
		<></>
	);
};

export default HomeScreen;
