const REMOTE_API_URL_BASE = "https://devgo.smerp.io";
const REMOTE_API_ADMIN_URL_BASE = "https://admingo.smerp.io";

export function getRemoteEndpoint(type, param = null) {
    let url = null;

    switch (type) {
        case 'store-list':
            url = `${REMOTE_API_URL_BASE}/api/Lookup/Stores`
            break;
        case 'store-collections':
            url = `${REMOTE_API_URL_BASE}/api/Collections`
            break;
        case 'product-categories':
            url = `${REMOTE_API_URL_BASE}/api/Lookup/ProductCategory`
            break;
        case 'products-all':
            url = `${REMOTE_API_URL_BASE}/api/Catalogue/ProductInStock`
            break;
        case 'order-submit':
            url = `${REMOTE_API_URL_BASE}/api/Shopping/Order`
            break;
        case 'signin':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Anth/Login`
            break;
        case 'users':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/User`
            break;
        case 'active-users':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/User/ActiveUsers`
            break;
        case 'inactive-users':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/User/InActiveUsers`
            break;
        case 'dashboard-agg':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Dashboard`
            break;
        case 'audit-log':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Audit`
            break;
        case 'top-sales':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Dashboard/TopRecentSale`
            break;
        case 'top-orders':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Dashboard/TopRecentOrder`
            break;
        case 'top-merchants':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Dashboard/TopRecentMerchant`
            break;
        case 'top-customers':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Dashboard/TopRecentCustomer`
            break;
        case 'notify-all':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Notification`;
            break;
        case 'notify-selected':
            url = `${REMOTE_API_ADMIN_URL_BASE}/api/Notification/OneToMany`;
            break;
        default:
            break;
    }

    return url;
}