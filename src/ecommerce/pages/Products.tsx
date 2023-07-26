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
        <div className="flex flex-col justify-top content-center w-full h-[calc(100vh-200px)]">
            <div className="grid grid-cols-[min-content_auto] gap-10 h-full w-full">
                <div className="flex flex-col w-min">
                    <FilterBar setOrder={setOrder} />
                </div>
                <div className="w-full h-[calc(100vh-200px)] overflow-y-scroll w-full">
                    <div className="w-full flex justify-between items-center">
                        <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
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