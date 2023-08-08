import { Product } from '../interfaces/interfaces'

export const orderProducts = (products: Product[], order: string) => {
    if (order === "price_asc") {
        const sort = products.sort((a: any, b: any) => a.price - b.price);
        return sort;
    }
    if (order === "price_desc") {
        const sort = products.sort((a: any, b: any) => b.price - a.price);
        return sort;
    }
    if (order === "title_asc") {
        const sort = products.sort((a: any, b: any) => a.title.localeCompare(b.title));
        return sort;
    }
    if (order === "title_desc") {
        const sort = products.sort((a: any, b: any) => b.title.localeCompare(a.title));
        return sort;
    }
}