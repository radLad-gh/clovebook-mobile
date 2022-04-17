import { getFavoriteIDs, toggleFavorite } from "../api/requests";
import * as local from "../validation/securestore";

let favoriteSet: Set<string> = new Set<string>();
let userID: string;

export const getFavSet = () => favoriteSet;

export const setFavSet = (favIDs: string[]) => {
	favoriteSet = new Set<string>(favIDs);
};

// export const initFavSet = async () => {
// 	local.getValueFor("user-session").then((value) => {
// 		userID = value;
// 		getFavoriteIDs(userID).then((favIDs) => {
// 			// console.log("set favorite set");
// 			favoriteSet = new Set<string>(favIDs);
// 		});
// 	});
// };

export const checkIfFav = (id: string): boolean => {
	// console.log("is fav????? ☻", typeof favoriteSet);
	// return id ? favoriteSet.has(id) : false;
	return favoriteSet.has(id);
};

export const updateFavorite = (id: string, set: boolean): void => {
	if (set && !favoriteSet.has(id)) {
		favoriteSet.add(id);
	} else {
		favoriteSet.delete(id);
	}
	// API Call
	toggleFavorite(userID, set, id);
};
