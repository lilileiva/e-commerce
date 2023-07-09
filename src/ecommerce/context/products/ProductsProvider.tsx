import { useState, useEffect, ReactNode } from "react";
import { ProductsContext } from "./ProductsContext";
import { Product } from "../../interfaces/interfaces";
import { baseUrl } from "../../constants"


interface props {
    children: ReactNode;
    category: string;
}

export const ProductsProvider = ({ children, category }: props) => {

    const [data, setData] = useState<Array<Product>>(null);

    const fetchData = async () => {
        try {
            let response: Response;
            console.log(category)
            if (category) {
                response = await fetch(`${baseUrl}/products/?title=${category}`)
            } else {
                response = await fetch(`${baseUrl}/products`)
            }
            if (!response.ok) {
                throw new Error("Error HTTP: " + response.status);
            }
            const products = await response.json();
            setData(products)
            console.log('data', products)
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