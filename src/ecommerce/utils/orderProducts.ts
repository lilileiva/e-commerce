import {Product} from '../interfaces/interfaces'

export const orderProducts = (products: Product[], order: string) => {
    if (order === "price_asc") {
        const sort = products.sort((a: string, b: string) => a.price - b.price);
        return sort;
    }
    if (order === "price_desc") {
        const sort = products.sort((a: string, b: string) => b.price - a.price);
        return sort;
    }
    if (order === "title_asc") {
        const sort = products.sort((a: string, b: string) => a.title.localeCompare(b.title));
        return sort;
    }
    if (order === "title_desc") {
        const sort = products.sort((a: string, b: string) => b.title.localeCompare(a.title));
        return sort;
    }
}