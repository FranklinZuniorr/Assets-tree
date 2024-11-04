import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://fake-api.tractian.com',
})