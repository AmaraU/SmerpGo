import { invokeRemoteAPI, invokeRemoteAPIWithId } from "./api";

export const getStoreList = async () => {
    try {
        const response = await invokeRemoteAPI('store-list', null, 'GET', null);
        if ('data' in response) {
            const payload = {
                status: "success",
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', data: [{ error: err }] };
        }
        return { status: 'error', data: [{ error: error.toString() }] };
    }
}

export const getStoreCollections = async (params) => {
    try {
        const { merchantCode } = params;
        const response = await invokeRemoteAPIWithId('store-collections', null, 'GET', null, `?merchantCode=${merchantCode}`);
        if ('data' in response) {
            const payload = {
                status: "success",
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', data: [{ error: err }] };
        }
        return { status: 'error', data: [{ error: error.toString() }] };
    }
};

export const getCollectionProducts = async (params) => {
    try {
        const { merchantCode, collectionId } = params;
        const response = await invokeRemoteAPIWithId('store-collections', null, 'GET', null, `${merchantCode}/${collectionId}`);
        if ('data' in response) {
            const payload = {
                status: "success",
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', data: [{ error: err }] };
        }
        return { status: 'error', data: [{ error: error.toString() }] };
    }
};

export const getAllProducts = async (params) => {
    try {
        const { merchantCode } = params;
        const response = await invokeRemoteAPIWithId('products-all', null, 'GET', null, `?linkcode=${merchantCode}`);
        if ('data' in response) {
            const payload = {
                status: "success",
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', data: [{ error: err }] };
        }
        return { status: 'error', data: [{ error: error.toString() }] };
    }
};

export const getProductCategories = async (params) => {
    try {
        const response = await invokeRemoteAPI('product-categories', null, 'GET', null);
        if ('data' in response) {
            const payload = {
                status: "success",
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', data: [{ error: err }] };
        }
        return { status: 'error', data: [{ error: error.toString() }] };
    }
};

export const authenticate = async (params) => {
    try {
        const response = await invokeRemoteAPI('signin', params, 'POST', null);
        if ('data' in response) {
            const payload = {
                status: "success",
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', data: [{ error: err }] };
        }
        return { status: 'error', data: [{ error: error.toString() }] };
    }
};

export const getDashboardOverview = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('dashboard-agg', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getAllUsers = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('users', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getActiveUsers = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('active-users', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getInactiveUsers = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('inactive-users', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const submitOrder = async (params) => {
    try {
        const response = await invokeRemoteAPI('order-submit', params, 'POST', null);
        if ('data' in response) {
            const payload = {
                status: "success",
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', data: [{ error: err }] };
        }
        return { status: 'error', data: [{ error: error.toString() }] };
    }
};

export const getTopOrders = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('top-orders', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getTopSales = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('top-sales', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getTopMerchants = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('top-merchants', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getTopCustomers = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('top-customers', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getAuditLog = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('audit-log', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getAuditLogFilter = async (params) => {
    try {
        const { startDate, endDate, token } = params;
        const response = await invokeRemoteAPIWithId('audit-log', null, 'GET', token, `AuditByDate?fromDate=${startDate}&toDate=${endDate}`);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const getAllNotifications = async (params) => {
    try {
        const { token } = params;
        const response = await invokeRemoteAPI('notify-all', null, 'GET', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const sendNotificationAllUsers = async (params) => {
    try {
        const { payload, token } = params;
        const response = await invokeRemoteAPI('notify-all', payload, 'POST', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};

export const sendNotificationToSpecificUsers = async (params) => {
    try {
        const { payload, token } = params;
        const response = await invokeRemoteAPI('notify-selected', payload, 'POST', token);
        if ('data' in response) {
            const payload = {
                status: "success",
                responseCode: 200,
                data: response.data
            };

            return payload;
        }
        else {
            throw new Error(response.toString());
        }
    }
    catch (error) {
        if (error.toString().includes("AxiosError")) {
            const err = JSON.stringify(error.response.data);
            return { status: 'error', responseCode: error.response.status, data: [{ error: err }] };
        }
        return { status: 'error', responseCode: 200, data: [{ error: error.toString() }] };
    }
};
