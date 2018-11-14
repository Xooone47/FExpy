import axios from 'axios';
import {get as lodashGet, assign} from 'lodash';
import {omitInvalidValues} from '../utils';

const defaultOptions = {
    headers: {'Content-Type': 'application/json'}
};

const formHttpOptions = {
    headers: {'Content-Type': 'multipart/form-data'}
};

const http = axios.create(defaultOptions);

const formHttp = axios.create(formHttpOptions);

const handleError = error => {
    const response = lodashGet(error, 'response');

    throw assign(lodashGet(response, 'data'), {
        status: lodashGet(response, 'status', -1)
    });
};

const handleResponse = ({data, headers}) => {
    if ('x-total-count' in headers) {
        return {
            totalCount: +lodashGet(headers, 'x-total-count'),
            results: data
        };
    }
    return data;
};

const request = method => (url, data, ...extraOptions) => {
    const config = {
        url,
        method,
        ...extraOptions
    };

    if (data) {
        const key = method === 'GET' ? 'params' : 'data';
        config[key] = omitInvalidValues(data);
    }

    return http.request(config).catch(handleError).then(handleResponse);
};

const formatDataToFormData = data => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return formData;
};

const formRequest = method => (url, data, ...extraOptions) => {
    const config = {
        url,
        method,
        data: formatDataToFormData(omitInvalidValues(data)),
        ...extraOptions
    };

    return formHttp.request(config).catch(handleError).then(handleResponse);
};

export const get = request('GET');

export const post = request('POST');

export const put = request('PUT');

export const remove = request('DELETE');

export const patch = request('PATCH');

export const postAsForm = formRequest('POST');
