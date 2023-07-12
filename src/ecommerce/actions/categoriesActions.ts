import { baseUrl } from "../constants"

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${baseUrl}/categories`)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const categories = await response.json();
        return categories;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

export const fetchCategory = async ({ categoryId }) => {
    try {        
        const response = await fetch(`${baseUrl}/categories/${categoryId.toString()}`)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const category = await response.json();
        return category;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};