import * as SecureStore from 'expo-secure-store';

export async function save(key, value) {
    await SecureStore.setItemAsync(key, value);
}

export async function getValueFor(key) {
	let result = await SecureStore.getItemAsync(key);
	result
		? alert("🔐 Here's your value 🔐 \n" + result)
		: alert("No values stored under that key.");
}