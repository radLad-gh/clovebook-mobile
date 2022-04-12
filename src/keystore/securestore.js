import * as SecureStore from 'expo-secure-store';

export async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
	// let result = await SecureStore.getItemAsync(key);
	// return result;
	let result = await SecureStore.getItemAsync(key);
	result
		? console.log("🔐 Here's your value 🔐 \n" + result)
		: console.log("No values stored under that key.");

	//pointer = result;
}

export async function deleteValue(key) {
	await SecureStore.deleteItemAsync(key, {});
}