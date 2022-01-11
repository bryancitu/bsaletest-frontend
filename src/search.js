import { main } from "./search_function.js"

let numPage =  1
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