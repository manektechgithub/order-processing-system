import storage from "./storage";

const ACCESS_TOKEN_NAME = 'accessToken';

export default {
    removeToken() {
        return storage.removeSession(ACCESS_TOKEN_NAME);
    },

    setToken(token) {
        return storage.saveSession(ACCESS_TOKEN_NAME, token);
    },

    getToken() {
        return storage.retrieveSession(ACCESS_TOKEN_NAME);
    }
}
