import { SimpleRecipe } from "./api/models";

export type Navigation = {
	navigate: (scene: string) => void;
};

export type TabProps = {
	setHeaderStatus: Function;
	setCurRecipe: Function;
	favoriteStuff: FavUtils;
};

export type FavUtils = {
	favStubs: SimpleRecipe[];
	checkIfFav: Function;
	updateFavorite: Function;
};
