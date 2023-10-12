import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import { useMutation, useQueryClient } from "react-query";
import { PRODUCTS_QUERY_KEY } from "../constants";
import { useEffect, useState } from "react";
import { fetchProducts } from "../services/products";
import BestCategoriesLoader from "./BestCategoriesLoader";

function BestCategories({ data, status }) {

    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const [filter, setFilter] = useState(null)

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
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className="flex flex-wrap justify-center gap-6 mt-10 h-full w-full">
                {
                    data && data.length > 0 && status === 'success' && data.map((category) => (
                        <li
                            onClick={() => setFilter(`&categoryId=${category.id}`)}
                            className="relative z-0 block justify-center items-center lg:w-52 lg:h-52 w-44 h-fit border-white cursor-pointer"
                            key={category.id}
                        >
                            <div className="lg:w-52 lg:h-52 w-46 h-46 overflow-hidden rounded-full border-[1px] hover:border-[1px] hover:border-turquoise">
                                <img
                                    className="object-cover aspect-square lg:w-52 lg:h-52 w-46 h-46 shadow shadow-slate-300 border-gray-200"
                                    src={category.image}
                                    alt={category.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <p className="w-full bg-white text-gray-700 font-bold capitalize text-center truncate">
                                {category.name}
                            </p>
                        </li>
                    ))
                }
                {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center absolute left-0 right-0">No se encontraron categorías</p>}
                {status === 'loading' && <BestCategoriesLoader length="4" />}
                {status === 'error' && <p className="text-center absolute left-0 right-0">Error al cargar las categorías</p>}
            </ul>
        </div>
    );
}

export default BestCategories;