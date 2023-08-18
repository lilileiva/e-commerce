import { useLocation } from "react-router-dom";
import ProductsOffers from "../components/ProductsOffers";
import { fetchProducts } from "../services/products";
import { useState } from "react";
import { PRODUCTS_QUERY_KEY } from "../constants";
import { useQuery } from "react-query";

function Home() {
    
    const location = useLocation()
    const [order] = useState("")    

    const { data, status } = useQuery([PRODUCTS_QUERY_KEY, { filter: location.search, order }], () => fetchProducts({ filter: location.search, order }))
    
    return (
        <div>
            <div className="w-full h-64 bg-gray-300 rounded-lg">

            </div>
            <div className="w-full h-full mt-8">
                    <div className="w-full flex justify-between items-center">
                        <p className="inline-flex lg:text-xl md:text-lg text-md w-fit text-gray-500 lg:font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                            Todas las
                            <p className="text-transparent">-</p>
                            <p className="text-turquoise">ofertas</p>
                        </p>                        
                    </div>
                    <ProductsOffers data={data.slice(0,9)} status={status} />
                </div>
        </div>
    );
}

export default Home;