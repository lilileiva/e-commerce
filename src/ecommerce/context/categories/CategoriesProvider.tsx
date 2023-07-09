import { useState, useEffect, ReactNode } from "react";
import { CategoriesContext } from "./CategoriesContext";
import { Category } from "../../interfaces/interfaces";
import { baseUrl } from "../../constants"


interface props {    
    children: ReactNode;
}

export const CategoriesProvider = ({ children }: props) => {

    const [data, setData] = useState<Array<Category>>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${baseUrl}/categories`)
            if (!response.ok) {                
                throw new Error("Error HTTP: " + response.status);
            }
            const categories = await response.json();
            setData(categories)            
        } catch (error) {            
            console.error('Error fetching API data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <CategoriesContext.Provider value={{data}}>
            {children}
        </CategoriesContext.Provider>
    );
}