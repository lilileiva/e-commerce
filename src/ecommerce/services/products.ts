import { baseUrl } from "../constants"
import { orderProducts } from "../utils";

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

export const fetchProduct = async ({ productId }) => {
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

interface createProductProps {
    title: string,
    price: string,
    description: string,
    categoryId: string,
    images: any
}

export const createProduct = async ({ title, price, description, categoryId, images }: createProductProps) => {
    try {
        const response = await fetch(`${baseUrl}/products/`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
                description: description,
                categoryId: categoryId,
                images: images
            })
        })
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response.json()
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

interface editProductProps {
    title: string,
    price: string,
    description: string,
    categoryId: string,
    images: any,
    productId: string
}

export const editProduct = async ({ title, price, description, categoryId, images, productId }: editProductProps) => {
    try {
        const response = await fetch(`${baseUrl}/products/${productId}`, {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                price: price,
                description: description,
                categoryId: categoryId,
                images: images
            })
        })
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response.json()
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

export const deleteProduct = async ({ productId }) => {
    try {
        const response = await fetch(`${baseUrl}/products/${productId}`, {
            method: "delete",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};