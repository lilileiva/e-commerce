import { useState, useEffect, ReactNode } from "react";
import { ProductsContext } from "./ProductsContext";
import { Product } from "../../interfaces/interfaces";
import { baseUrl } from "../../constants"


interface props {
    children: ReactNode;
    categoryId: number;
}

export const ProductsProvider = ({ children, categoryId }: props) => {

    const [data, setData] = useState<Array<Product>>(null);

    const fetchData = async () => {
        try {
            let response: Response;
            if (categoryId) {                
                response = await fetch(`${baseUrl}/products/?categoryId=${categoryId.toString()}`)                
            } else {
                response = await fetch(`${baseUrl}/products`)
            }
            const products = await response.json();
            setData(products)
            console.log('data', products)
            if (!response.ok) {
                throw new Error("Error HTTP: " + response.status);
            }        
        } catch (error) {
            console.error('Error fetching API data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ProductsContext.Provider value={{ data }}>
            {children}
        </ProductsContext.Provider>
    );
}