import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000',
});

export const readAll = (endpoint) => {
    return new Promise((resolve, reject) => {
        api.get(`/${endpoint}`)
            .then((res) => {
                resolve(res.data);
            })
            .catch((error) => {
                alert(error.message);
            });
    });
};
