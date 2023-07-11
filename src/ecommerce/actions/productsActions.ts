import { baseUrl } from "../constants"

export const fetchProducts = async ({params}) => {
    try {        
        const response = await fetch(`${baseUrl}/products/?${params.toString()}`)
        const products = await response.json();
        console.log(products)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return products;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};