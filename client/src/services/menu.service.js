import axios from 'axios';
import authHeader from './auth-header';

const URL = "https://goldfish-app-ibq9e.ondigitalocean.app/api";

const api = axios.create({
    baseURL: URL,
});

const authApi = axios.create({
    baseURL: URL,
    headers: authHeader(),
});

export const getMenus = async (locationId) => {
    const res = await api.get(`/locations/${locationId}/menus`);
    return res.data;
};