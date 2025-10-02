import { userStorage } from "../storage";

export function logoutHelper(fallbackUrl = '/login') {
    userStorage.remove();
    window.location.href = fallbackUrl;
}
