export default {
    save(key, data) {
        return window.localStorage.setItem(key, JSON.stringify(data));
    },

    retrieve(key, defaultValue) {
        const found = window.localStorage.getItem(key);

        if (!found) {
            return defaultValue;
        }

        return JSON.parse(found);
    },

    saveSession(key, data) {
        return window.sessionStorage.setItem(key, JSON.stringify(data));
    },

    removeSession(key) {
        return window.sessionStorage.removeItem(key);
    },

    retrieveSession(key, defaultValue) {
        const found = window.sessionStorage.getItem(key);

        if (!found) {
            return defaultValue;
        }

        return JSON.parse(found);
    },
}
