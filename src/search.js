
const API_BASE_URL = "https://bsaletest-app.herokuapp.com/api";

const productsSearchService = async (product) => {
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
const main = async (num,page) => {

    let container_products = document.getElementById("search_products");
    let path = window.location.href
    let query = path.split("?product=")[1];
    let querySearch = query
    if (query == '' ) {
        querySearch = "None"
    }
    querySearch +=  page
    
    let resp = await productsSearchService(querySearch);
    console.log(resp);

    let content = '';
    let element = '';

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
}

main(numPage,'')

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