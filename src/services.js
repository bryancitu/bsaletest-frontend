import API_BASE_URL from './api.js';

export const productsSearchService = async (product) => {
    const requestUrl = `${API_BASE_URL}/product/search/${product}`;

    try {
        const resp = await axios({
            url: requestUrl,
            method: 'get',
        });
        if (resp.status == 200 || 201) {
            return resp
        }
    } catch (error) {
        return false
    }
}

export const categoryService = async () => {
    const requestUrl = `${API_BASE_URL}/product/categories/`;

    try {
        const resp = await axios({
            url: requestUrl,
            method: 'get',
        });
        if (resp.status == 200 || 201) {
            return resp
        }
    } catch (error) {
        return false
    }
}

export const productsCategoryService = async (category) => {
    const requestUrl = `${API_BASE_URL}/product/products/${category}/`;

    try {
        const resp = await axios({
            url: requestUrl,
            method: 'get',
        });
        if (resp.status == 200 || 201) {
            return resp
        }
    } catch (error) {
        return false
    }
}