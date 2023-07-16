import { baseUrl } from "../constants"
import { orderProducts } from "../utils";

interface productProps {
    productId: string
}
export const fetchProduct = async ({ productId }: productProps) => {
    try {
        const response = await fetch(`${baseUrl}/products/${productId}`)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const product = await response.json();
        return product;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

interface productsProps {
    filter: string,
    order: string
}

export const fetchProducts = async ({ filter, order }: productsProps) => {
    try {
        const response = await fetch(`${baseUrl}/products/?${filter}`)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const products = await response.json();
        if (order === "price_asc" || order === "price_desc" || order === "title_asc" || order === "title_desc") {
            return orderProducts(products, order)
        }
        return products;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};