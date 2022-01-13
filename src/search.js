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

productsSearchService = async (product) => {
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

let numPage =  1

main = async (num,page) => {

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
    let container_products = document.getElementById("search_products");

    // loader
    let loader = ''
    for (let i = 0; i < 5; i++) {
        loader += `
            <div class="container__loader_product">
            </div>
        `             
    }
    container_products.innerHTML = `
        <h1>Resultado de la busqueda: </h1>
        <div class="container__loader_products">
            ${loader}
        </div>
        <div class="container__loader_products">
            ${loader}
        </div>
    `

    // get query
    let path = window.location.href
    let query = path.split("?product=")[1].replace(/\%20/gi, " ");
    let querySearch = query;
    if (query == '' ) {
        querySearch = "None"
    }
    querySearch +=  page
    
    // loading data
    let resp = await productsSearchService(querySearch);

    let content = '';
    let element = '';

    if (resp.statusText = "OK") {
        
        if (resp.data.results != undefined) {
            for (let i = 0; i < resp.data.results.length; i++) {
                let image = ''
                if (resp.data.results[i].url_image != 'nan') {
                    image = `<img src=${resp.data.results[i].url_image} alt="">`
                }else{
                    image = `<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png" alt="">`
                }
                element += `
                    <div class="container__product">
                        ${image}
                        <div>
                            <h4>${resp.data.results[i].name}</h4>
                            <div class="container__price__car">
                                <div class="price">$ ${resp.data.results[i].price}</div>
                                <i class="fa fa-cart-plus" aria-hidden="true"></i>
                            </div>
                        </div>
                    </div>
                `       
            }
    
            let pagination = ''
            let count = 1
            for (let i = 0; i < resp.data.count; i+=15) {
                
                if (i == 0 && num == 1 ) {
                    pagination += `
                        <button onclick="showPrevio()" disabled>&laquo;</button>
                    `                 
                }
                else if(i == 0 && num != 1){
                    pagination += `
                        <button onclick="showPrevio()">&laquo;</button>
                    `  
                }
    
                if (num == count) {
                    pagination += `
                        <button class="activate" onclick="showPage(${count})">${count}</button>
                    ` 
                }else{
                    pagination += `
                        <button onclick="showPage(${count})">${count}</button>
                    ` 
                }
    
                if ((count)*15 > resp.data.count && num > resp.data.count / 15  ) {
                    pagination += `
                        <button onclick="showNext()" disabled>&raquo;</button>
                    ` 
                    break
                }
                else if((count)*15 > resp.data.count ){
                    pagination += `
                        <button onclick="showNext()">&raquo;</button>
                    ` 
                    break
                }
                count++
            }
    
            if (resp.data.count > 15) {
                content += `
                    <h1>Resultado de la busqueda: ${query}</h1>
                    <div class="container__grid__products">
                        ${element}
                    </div>
                    <div class="paginacion">
                        ${pagination}
                    </div>
                `            
            }
            else if (resp.data.count == 0) {
                content += `
                    <h1>Resultado de la busqueda: ${query}</h1>
                    <h2>Ninguna coincidencia con la busqueda :(</h2>
                ` 
            }else{
                content += `
                    <h1>Resultado de la busqueda: ${query}</h1>
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

main(1,'')

showPrevio = async () => {
    numPage -= 1
    main(numPage,`?page=${numPage}`)
}

showPage = async (n) => {
    numPage = n
    main(numPage,`?page=${numPage}`)
}

showNext = async () => {
    numPage += 1
    main(numPage,`?page=${numPage}`)
}

onSidebar = () => {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = "block"
}

onClose = () => {
    let sidebar = document.getElementById("sidebar");
    sidebar.style.display = "none"
}