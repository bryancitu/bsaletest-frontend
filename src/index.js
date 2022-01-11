import { categoryService, productsCategoryService } from './services.js';

const main = async () => {
    let container_products = document.getElementById("products");

    //loader
    let loader = ''
    for (let i = 0; i < 5; i++) {
        loader += `
            <div class="container__loader_product">
            </div>
        `             
    }
    container_products.innerHTML = `
        <h2 class="loader_cat_name"></h2>
        <div class="container__loader_products">
            ${loader}
        </div>
        <h2 class="loader_cat_name"></h2>
        <div class="container__loader_products">
            ${loader}
        </div>
    `

    let content = '';

    // loading data
    let resp = await categoryService();

    if (resp.statusText = "OK") {

        for (let i = 0; i < resp.data.length; i++) {
            let respProdCat = await productsCategoryService(resp.data[i].name);
            let element = '';
    
            if (respProdCat.data != undefined ) {
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
                    <h2> ${resp.data[i].name.toUpperCase() } </h2> 
                    <div class="container__products">${element}</div>
                </div>
            `        
        }
    
    
        container_products.innerHTML = `
            ${content}
        `
    } else {
        content = "<h1>ERROR 404 VUELVE MAS TARDE :(</h1>"
    }

}

main()