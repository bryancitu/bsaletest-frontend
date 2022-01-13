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
    let respCat = await categoryService();
    
    let container_categories = document.getElementById("categories");
    let sidebar = document.getElementById("sidebar");

    let header_categories = ''

    console.log(respCat.data);
    respCat.data.map((d,i) => {
        header_categories += `
            <a href="./category.html?category=${d.name}">
                <span> ${d.name}</span>
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

    // load data
    let container_products = document.getElementById("products_categories");

    // loader
    let loader = ''
    for (let i = 0; i < 5; i++) {
        loader += `
            <div class="container__loader_product">
            </div>
        `             
    }
    container_products.innerHTML = `
        <h1>Categoria: </h1>
        <div class="container__loader_products">
            ${loader}
        </div>
        <div class="container__loader_products">
            ${loader}
        </div>
    `

    // get query
    let path = window.location.href
    let my_category = path.split("?category=")[1].replace(/\%20/gi, " ");
    
    // loading data
    let resp = await productsCategoryService(my_category);
    console.log(resp);

    let content = '';
    let element = '';

    if (resp.statusText = "OK") {
        
        if (resp.data != undefined) {
            for (let i = 0; i < resp.data.length; i++) {
                let image = ''
                if (resp.data[i].url_image != 'nan') {
                    image = `<img src=${resp.data[i].url_image} alt="">`
                }else{
                    image = `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" alt="">`
                }
                element += `
                    <div class="container__product">
                        ${image}
                        <div>
                            <h4>${resp.data[i].name}</h4>
                            <div class="container__price__car">
                                <div class="price">$ ${resp.data[i].price}</div>
                                <i class="fa fa-cart-plus" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                `       
            }
    
            if (resp.data.count == 0) {
                content += `
                    <h1>Categoria: ${my_category.toUpperCase()}</h1>
                    <h2>Ninguna coincidencia con la busqueda :(</h2>
                ` 
            }else{
                content += `
                    <h1>Categoria: ${my_category.toUpperCase()}</h1>
                    <div class="container__grid__products">
                        ${element}
                    </div>
                ` 
            }
    
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