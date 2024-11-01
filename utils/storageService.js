// storageService.js
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
}

async function get(key) {
    const result = await SecureStore.getItemAsync(key);
    return result;
}

async function remove(key) {
    await SecureStore.deleteItemAsync(key);
}

export default {
    save,
    get,
    remove,
};
