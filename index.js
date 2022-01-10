
const API_BASE_URL = "https://bsaletest-app.herokuapp.com/api";

const categoryService = async () => {
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

const productsCategoryService = async (category) => {
    const requestUrl = `${API_BASE_URL}/product/products/${category}/`;

    try {
        const resp = await axios({
            url: requestUrl,
            method: 'get',
        });
        if (resp.status == 200 || 201) {
            console.log(resp.data);
            return resp
        }
    } catch (error) {
        return false
    }
}

const productsSearchService = async (location,product) => {
    const requestUrl = `${API_BASE_URL}/product/search/${location}/${product}`;

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

const main = async () => {

    let container_products = document.getElementById("products");

    let resp = await categoryService();

    let content = '';

    for (let i = 0; i < resp.data.length; i++) {

        let respProdCat = await productsCategoryService(resp.data[i].name);
        let element = '';

        if (respProdCat.data[i] != undefined ) {
            for (let a = 0; a < respProdCat.data.length; a++) {
                let image = ''
                if (respProdCat.data[a].url_image != 'nan') {
                    image = `<img src=${respProdCat.data[a].url_image} alt="">`
                }else{
                    image = `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" alt="">`
                }
                element += `
                    <div class="container__product">
                        ${image}
                        <div>
                            <h4>${respProdCat.data[a].name}</h4>
                            <div class="container__price__car">
                                <div class="price">$ ${respProdCat.data[a].price}</div>
                                <i class="fa fa-cart-plus" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                `          
            }            
        }        

        content += `
            <div class="container__products__by_cat"> 
                <h2> ${resp.data[i].name} </h2> 
                <div class="container__products">${element}</div>
            </div>
        `        
    }


    container_products.innerHTML = `
        ${content}
    `
    
    console.log(resp.data);
}

main()