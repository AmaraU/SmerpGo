export const BASE_URL = 'https://devgo.smerp.io';
export const STORES_URL = `${BASE_URL}/api/Lookup/Stores`;
export const APP_STORE_URL = 'https://apps.apple.com/ng/app/smerpgo/id6451312469';
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.fifthlab.smerp_go';
export const DEFAULT_AUTH_ERR_MSG = "We are unable to authenticate you at the moment. Please contact support or try again later";

const LOCAL_API_URL = "https://go.smerp.io/api";

export function getAPIEndpoint(type, isremote = false) {
    let url = null;
    switch (type) {
        case 'store-list':
            url = `${LOCAL_API_URL}/store/list`
            break;
        case 'store-collections':
            url = `${LOCAL_API_URL}/store/collections`
            break;
        case 'product-categories':
            url = `${LOCAL_API_URL}/store/product/categories`
            break;
        case 'products-all':
            url = `${LOCAL_API_URL}/store/products/all`
            break;
        case 'collection-products':
            url = `${LOCAL_API_URL}/store/collection/products`
            break;
        case 'order-submit':
            url = `${LOCAL_API_URL}/shopping/order/submit`
            break;
        case 'signin':
            url = `${LOCAL_API_URL}/auth/signin`
            break;
        case 'dashboard':
            url = `${LOCAL_API_URL}/dashboard/content`
            break;
        case 'users-all':
            url = `${LOCAL_API_URL}/users/all`
            break;
        case 'active-users':
            url = `${LOCAL_API_URL}/users/active`
            break;
        case 'inactive-users':
            url = `${LOCAL_API_URL}/users/inactive`
            break;
        case 'activity-log':
            url = `${LOCAL_API_URL}/log/user/activity`
            break;
        case 'activity-log-filter':
            url = `${LOCAL_API_URL}/log/user/activity/filter`
            break;
        case 'top-sales':
            url = `${LOCAL_API_URL}/shopping/recent/orders`
            break;
        case 'top-orders':
            url = `${LOCAL_API_URL}/shopping/recent/sales`
            break;
        case 'top-merchants':
            url = `${LOCAL_API_URL}/shopping/recent/merchants`
            break;
        case 'top-customers':
            url = `${LOCAL_API_URL}/shopping/recent/customers`
            break;
        default:
            break
    }

    return url;
}
