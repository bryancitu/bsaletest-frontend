const API_BASE_URL = "https://bsaletest-app.herokuapp.com/api";

categoryService = async () => {
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

productsCategoryService = async (category) => {
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

main = async () => {
    
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

    let resp = await categoryService();
    
    let container_categories = document.getElementById("categories");
    let sidebar = document.getElementById("sidebar");

    let header_categories = ''

    resp.data.map((d) => {
        header_categories += `
            <a href="./category.html?category=${d.name}">
                <span>${d.name}</span>
            </a>
        `
    })

    container_categories.innerHTML = header_categories
    sidebar.innerHTML = `
        <span onclick="onClose()" class="btn-close-sidebar"><b>x</b></span>
        <div class="container__sidebar">
            <a href="./index.html" style="border: none"><h1>Bsale Test</h1></a>
            <h2>Nuestras categorias:</h2>
            ${header_categories}
        </div>
    `

    let content = '';

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

onSidebar = () => {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = "block"
}

onClose = () => {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none"
}