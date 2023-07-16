import { baseUrl } from "../constants"

interface Props {
    filter: string,
    order: string
}

export const fetchProducts = async ({ filter, order }: Props) => {
    try {
        const response = await fetch(`${baseUrl}/products/?${filter}`)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const products = await response.json();
        if (order ===  "price_asc" || order === "price_desc" || order === "title_asc" || order === "title_desc") {
            return orderProducts(products, order)
        }
        return products;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

const orderProducts = (products: [], order: string) => {
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