import * as requests from "./requests";

export const getRandomRecipes = () => requests.getRecipes("&sort=random", [""]);
