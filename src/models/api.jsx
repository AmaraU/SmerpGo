import axios from "axios";
import { getRemoteEndpoint } from "./api_config";

export const invokeRemoteAPI = async (type, params = null, method = 'POST', token = null) => {
    let options = null;
    if (params) {
        if (token) {
            options = {
                'method': method,
                'url': getRemoteEndpoint(type),
                'headers': {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: params
            };
        }
        else {
            options = {
                'method': method,
                'url': getRemoteEndpoint(type),
                'headers': {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                data: params
            };
        }
    }
    else {
        if (token) {
            options = {
                'method': method,
                'url': getRemoteEndpoint(type),
                'headers': {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
        }
        else {
            options = {
                'method': method,
                'url': getRemoteEndpoint(type),
                'headers': {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            };
        }
    }
    const result = await axios(options);
    return result;
}

export const invokeRemoteAPIWithId = async (type, param = "", method = 'GET', token = null, suffix = "") => {
    let options = null;
    if (param) {
        if (token) {
            options = {
                'method': method,
                'url': `${getRemoteEndpoint(type)}/${param}${suffix}`,
                'headers': {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
        }
        else {
            options = {
                'method': method,
                'url': `${getRemoteEndpoint(type)}/${param}${suffix}`,
                'headers': {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            };
        }
    }
    else {
        if (token) {
            options = {
                'method': method,
                'url': `${getRemoteEndpoint(type)}/${suffix}`,
                'headers': {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            };
        }
        else {
            options = {
                'method': method,
                'url': `${getRemoteEndpoint(type)}/${suffix}`,
                'headers': {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            };
        }
    }
    const result = await axios(options);
    return result;
}