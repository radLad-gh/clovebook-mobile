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
	tags?: string[]
): Promise<models.SimpleRecipe[]> => {
	return requests.get("/recipes", { query: query, tags: tags });
};

export const getRecipeById = (id: string): Promise<models.Recipe> => {
	return requests.get(`/recipes/${id}`);
};

export const doLogin = (
	data: models.Userpass
): Promise<{ refreshToken: string }> => requests.get("/users/login", data);
