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

interface createCategoryProps {
    name: string,
    image: string
}

export const createCategory = async ({ name, image }: createCategoryProps) => {
    try {
        const response = await fetch(`${baseUrl}/categories/`, {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                image: image
            })
        })
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        return response
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

interface editCategoryProps {
    name: string,
    image: string,
    categoryId: string
}

export const editCategory = async ({ name, image, categoryId }: editCategoryProps) => {
    try {        
        const response = await fetch(`${baseUrl}/categories/${categoryId}`, {
            method: "put",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                image: image
            })
        })
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }        
        return response
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};

export const deleteCategory = async ({ categoryId }) => {
    try {        
        const response = await fetch(`${baseUrl}/categories/${categoryId}`, {
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

export const fetchCategory = async ({ categoryId }) => {
    try {        
        const response = await fetch(`${baseUrl}/categories/${categoryId}`)
        if (!response.ok) {
            throw new Error("Error HTTP: " + response.status);
        }
        const category = await response.json();
        return category;
    } catch (error) {
        console.error('Error fetching API data:', error);
    }
};