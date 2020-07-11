import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_ERROR
} from 'react-admin';
export default {
    // called when the user attempts to log in
    login: ({
        email,
        password
    }) => {

        const request = new Request(process.env.REACT_APP_API_BASE + '/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300 || response.status === 401) {

                    return Promise.reject(response)
                }
                return response.json();
            })
            .then(({
                token
            }) => {
                localStorage.setItem('token', token);
            });
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({
        status
    }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }

        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        /* return Promise.resolve(); */
        return localStorage.getItem('token') ?
            Promise.resolve() :
            Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => Promise.resolve(),
};