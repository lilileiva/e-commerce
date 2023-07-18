import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY } from "../constants"
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchCategories } from "../services/categories";
import { fetchProducts } from "../services/products";
import camera from "../../assets/camera-img.png";

import Loader from "../components/Loader";


function Categories() {

    const navigate = useNavigate()

    const queryClient = useQueryClient();
    const { data, status } = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)
    const [filter, setFilter] = useState(null)

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
        <div className="flex flex-col justify-top content-center h-[calc(100vh-200px)]">
            <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-turquoise rounded-b-sm py-1">
                Todas las
                <p className="text-transparent">-</p>
                <p className="text-turquoise">categorías</p>
            </p>
            <ul className="flex flex-wrap justify-center gap-10 mt-10 overflow-y-scroll">
                {
                    data && data.length > 0 && data.map((category) => (
                        <li className="flex flex-col justify-center align-center w-52 h-fit rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer"
                            key={category.name}
                            onClick={() => getProductsByCategory(category.id)}>
                            <div className="w-52 h-52">
                                <img
                                    className="object-cover w-52 h-52"
                                    src={category.image}
                                    alt={category.name}
                                    onError={(e) => { e.target.src = camera }}
                                />
                            </div>
                            <p className="w-full z-10 bg-white pl-2 text-gray-700 capitalize truncate">{category.name}</p>
                        </li>
                    ))
                }
                {(data && data.length == 0 || !data) && status === 'success' && <p>No se encontraron categorías</p>}
                {status === 'loading' && <Loader />}
                {status === 'error' && <p>Error al cargar las categorías</p>}
            </ul>
        </div>
    );
}

export default Categories;