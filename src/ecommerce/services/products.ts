import { baseUrl } from "../constants"

interface Props {
    params: string;
}

export const fetchProducts = async ({params}: Props) => {
    try {        
        const response = await fetch(`${baseUrl}/products/?${params.toString()}`)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const products = await response.json();         
        return products;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};