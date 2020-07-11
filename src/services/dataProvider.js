/* import simpleRestProvider from 'ra-data-simple-rest'; */
import myRestProvider from "./rest-provider";
import {
    fetchUtils
} from "react-admin";

const httpClient = (url, options = {}) => {

    if (!options.headers) {
        options.headers = new Headers({
            Accept: "application/json"
        });
    }
    const token = localStorage.getItem("token");
    options.headers.set("Authorization", token);

    return fetchUtils.fetchJson(url, options);
};

const dataProvider = myRestProvider(process.env.REACT_APP_API_BASE, httpClient);

const myDataProvider = {
    ...dataProvider,
    update: (resource, params) => {
        if (resource === 'libros' && params.data.hasOwnProperty('img') && params.data.img.hasOwnProperty('rawFile')) {
            let form = new FormData();
            form.set("avatar", params.data.img.rawFile);
            for (var prop in params.data) {
                if (typeof params.data[prop] === 'object') {
                    form.append(prop, JSON.stringify(params.data[prop]))
                } else {
                    form.append(prop, params.data[prop])
                }
            }

            return fetch(`${process.env.REACT_APP_API_BASE}/libros/${params.data._id}`, {
                    method: "PUT",
                    headers: new Headers({
                        'Authorization': localStorage.getItem('token')
                    }),
                    body: form
                })
                .then((response) => response.json())
                .then((json) => ({
                    data: {
                        id: json._id
                    }
                }))
        }
        return dataProvider.update(resource, params);


    },
    create: (resource, params) => {
        if (resource === 'libros' && params.data.hasOwnProperty('img') && params.data.img.hasOwnProperty('rawFile')) {
            let form = new FormData();
            form.set("avatar", params.data.img.rawFile);
            for (var prop in params.data) {
                if (typeof params.data[prop] === 'object') {
                    form.append(prop, JSON.stringify(params.data[prop]))
                } else {
                    form.append(prop, params.data[prop])
                }
            }

            return fetch(`${process.env.REACT_APP_API_BASE}/libros/`, {
                    method: "POST",
                    headers: new Headers({
                        'Authorization': localStorage.getItem('token')
                    }),
                    body: form
                })
                .then((response) => response.json())
                .then((json) => ({
                    data: {
                        id: json._id
                    }
                }))
        }
        return dataProvider.create(resource, params);
    }
    //aca podria agregar otros metodos
};

export default myDataProvider;