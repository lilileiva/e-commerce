import { baseUrl } from "../constants"

interface Props {
    filter: string;
}

export const fetchProducts = async ({filter}: Props) => {
    try {        
        const response = await fetch(`${baseUrl}/products/?${filter}`)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const products = await response.json();        
        return products;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};