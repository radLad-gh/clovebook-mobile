import { getFavoriteIDs, toggleFavorite } from "../api/requests";
import * as local from "../validation/securestore";

let favoriteSet: Set<string> = new Set<string>();
let userID: string;

export const getFavSet = () => favoriteSet;

export const setFavSet = (favIDs: string[]) => {
	favoriteSet = new Set<string>(favIDs);
};

export const checkIfFav = (id: string): boolean => {
	// return id ? favoriteSet.has(id) : false;
	return favoriteSet.has(id);
};

export const updateFavorite = (recipeID: string, set: boolean): void => {
	if (set && !favoriteSet.has(recipeID)) {
		favoriteSet.add(recipeID);
	} else {
		favoriteSet.delete(recipeID);
	}

	if (!userID) {
		local.getValueFor("user-session").then((value) => {
			userID = value;
			console.log(
				"calling toggleFavorite(" + userID + ", " + set + ", " + recipeID + ")"
			);

			// API Call
			toggleFavorite(userID, set, recipeID);
		});
	} else {
		console.log(
			"calling toggleFavorite(" + userID + ", " + set + ", " + recipeID + ")"
		);

		// API Call
		toggleFavorite(userID, set, recipeID);
	}
};
