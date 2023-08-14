import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { PRODUCTS_QUERY_KEY } from "../constants";
import { fetchProducts } from "../services/products";

import FilterBar from "../components/FilterBar";
import CustomButton from "../components/CustomButton";
import ProductsList from "../components/ProductsList";

function Products() {

    const navigate = useNavigate()
    const location = useLocation()
    const [order, setOrder] = useState("")
    const userRole = window.localStorage.getItem("userRole")

    const { data, status } = useQuery([PRODUCTS_QUERY_KEY, { filter: location.search, order }], () => fetchProducts({ filter: location.search, order }))

    return (
        <div className="flex flex-col justify-top content-center w-full h-fit pb-12">
            <div className="grid lg:grid-cols-[min-content_auto] lg:gap-10 md:gap-4 gap-2 h-full w-full grid-row-1">
                <div className="flex flex-col lg:w-min w-full">
                    <FilterBar setOrder={setOrder} />
                </div>
                <div className="w-full h-full">
                    <div className="w-full flex justify-between items-center">
                        <p className="inline-flex lg:text-xl md:text-lg text-md w-fit text-gray-500 lg:font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                            Todos los
                            <p className="text-transparent">-</p>
                            <p className="text-turquoise">productos</p>
                        </p>
                        {userRole === "admin"
                            && <CustomButton width="fit" text="Crear producto" bgColor="white" textColor="turquoise" borderColor="turquoise" onClick={() => navigate("/products/create")} />}
                    </div>
                    <ProductsList data={data} status={status} />
                </div>
            </div>
        </div>
    );
}

export default Products;