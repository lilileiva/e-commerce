import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY } from "../constants"
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCategories } from "../services/categories";
import { fetchProducts } from "../services/products";

import CustomButton from "../components/CustomButton";
import CategoriesList from "../components/CategoriesList";


function Categories() {

    const navigate = useNavigate()

    const queryClient = useQueryClient();
    const { data, status } = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)
    const [filter, setFilter] = useState(null)
    const userRole = window.localStorage.getItem("userRole")

    const getProductsByCategory = (categoryId) => {
        setFilter(`&categoryId=${categoryId}`)
    }

    const mutation = useMutation([PRODUCTS_QUERY_KEY, { filter, order: "" }], () => fetchProducts({ filter, order: "" }), {
        onSuccess: () => {
            queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]);
            navigate(`/products/?${filter}`)
        }
    })

    useEffect(() => {
        if (filter != null) {
            mutation.mutate(filter)
        }
    }, [filter])

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col w-10/12 justify-top content-center h-[calc(100vh-200px)]">
                <div className="w-full flex justify-between items-center">
                    <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-turquoise rounded-b-sm py-1">
                        Todas las
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">categorías</p>
                    </p>
                    {userRole === "admin" && <CustomButton width="fit" text="Crear categoría" bgColor="white" textColor="turquoise" borderColor="turquoise" onClick={() => navigate("/categories/create")} />}
                </div>
                <CategoriesList data={data} status={status} getProductsByCategory={getProductsByCategory} />
            </div>
        </div>
    );
}

export default Categories;