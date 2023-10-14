import { useEffect, useState } from "react";
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
    const userRole = window.localStorage.getItem("userRole")
    const [order, setOrder] = useState("")
    const [showFilters, setShowFilters] = useState(true)

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])

    const { data, status } = useQuery([PRODUCTS_QUERY_KEY, { filter: location.search, order }], () => fetchProducts({ filter: location.search, order }))

    return (
        <div className="flex flex-col justify-top content-center w-full h-fit pb-12">
            <div className={`grid h-full w-full lg:gap-10 gap-4 ${showFilters ? "lg:grid-cols-[320px_auto] grid-row-1" : "grid-row-1"}`}>
                <div className="inline-flex lg:w-min w-full">
                    <FilterBar showFilters={showFilters} setShowFilters={setShowFilters} setOrder={setOrder} />
                    {!showFilters && <p className="w-fit inline-flex lg:ml-10 ml-4 lg:text-xl md:text-lg text-md text-gray-500 lg:font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                        All
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">products</p>
                    </p>}
                </div>
                <div className="w-full h-full">
                    <div className="w-full flex flex-col justify-left">
                        {showFilters && <p className="w-fit inline-flex lg:text-xl md:text-lg text-md w-fit text-gray-500 lg:font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                            All
                            <p className="text-transparent">-</p>
                            <p className="text-turquoise">products</p>
                        </p>}
                        {userRole === "admin"
                            && <CustomButton width="w-fit" text="Create product" bgColor="white" textColor="turquoise" borderColor="turquoise" onClick={() => navigate("/products/create")} />}
                    </div>
                    <ProductsList data={data} status={status} />
                </div>
            </div>
        </div>
    );
}

export default Products;