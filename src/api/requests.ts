import axios, { AxiosResponse } from "axios";
import * as models from "./models";

const instance = axios.create({
	baseURL: "https://api.clovebook.com",
	timeout: 15000,
	withCredentials: true,
});

const resBody = (res: AxiosResponse) => res.data;

const contentJSON = { "content-type": "application/json" };

const handleError = (err: any) => {
	if (err.response) {
		console.log("Bad status code");
		console.log(err.response);
		// We want to return the error to let the user know what needs
		// to be changed. Either their username or email will be taken.
		return err["request"]["_response"];
	} else if (err.request) {
		console.log("No Response");
		console.log(err.request);
	} else {
		console.log("Request setup failed");
		console.log(err.message);
	}
	console.log(err.config);
};

const requests = {
	get: (url: string, params?: {}) => {
		console.log("url:" + url + ", params:" + params);
		return instance
			.get(url, { params: params })
			.then(resBody)
			.catch(handleError);
	},
	post: (url: string, body: {}, params?: {}) =>
		instance
			.post(url, body, { params: params, headers: contentJSON })
			.then(resBody)
			.catch(handleError),
	put: (url: string, body: {}, params?: {}) =>
		instance
			.put(url, body, { params: params, headers: contentJSON })
			.then(resBody)
			.catch(handleError),
	delete: (url: string, params?: {}) =>
		instance.delete(url, { params: params }).then(resBody).catch(handleError),
};

export const getRecipes = (
	query: string,
	offset: number
): Promise<models.SimpleRecipe[]> =>
	requests.get("/recipes", { query: query, tags: "", offset: offset });

export const getRecipe = (id: string): Promise<models.Recipe> => {
	return requests.get(`/recipes/${id}`);
};

export const getUsersRecipes = (
	userID: string
): Promise<models.SimpleRecipe[]> => requests.get(`/users/${userID}/created`);

// ==== User Section ====

export const doRegister = (
	data: models.NewUser,
	code: string
): Promise<{ userID: string }> => requests.post("/users", data, { code: code });

export const doAuth = (data: models.Useremail): Promise<{ expires: string }> =>
	requests.post("/users/auth", data);

export const doLogin = (
	data: models.Userpass
): Promise<{ refreshToken: string }> => requests.get("/users/login", data);

export const sendResetEmail = (email: string) =>
	requests.post("/users/reset", {}, { email: email });
// FAVORITES
export const toggleFavorite = (
	userID: string,
	set: boolean,
	recipeID: string
) => {
	requests.put(
		`/users/${userID}/favorites`,
		{},
		{ set: set, cookbookID: recipeID }
	);
};

export const getFavorites = (
	userID: string,
	query: string
): Promise<models.SimpleRecipe[]> =>
	requests.get(`/users/${userID}/favorites`, { query: query });

export const getFavoriteIDs = (userID: string): Promise<string[]> =>
	requests.get(`/users/${userID}/favorites`, {
		query: "",
		onlyID: "true",
	});

export const getUserByID = (userID: string): Promise<models.User> =>
	requests.get(`/users/${userID}`);

export const updateUser = (userID: string, data: models.User) =>
requests.put(`/users/${userID}`, data);