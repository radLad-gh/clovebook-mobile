import React from "react";
import * as SecureStore from "expo-secure-store";

export async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key: string): Promise<string> {
	// let result = await SecureStore.getItemAsync(key);
	// return result;
	let result = await SecureStore.getItemAsync(key);
	result
		? console.log("🔐 Here's your value 🔐 \n" + result)
		: console.log("No values stored under that key.");
	return result ? result : "";

	//pointer = result;
}

export async function deleteValue(key: string) {
	await SecureStore.deleteItemAsync(key, {});
}
