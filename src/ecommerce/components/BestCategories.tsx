import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import GlobalStateContext from "../context/globalStateContext";
import { PRODUCTS_QUERY_KEY } from "../constants";
import camera from "../../assets/camera-img.png";
import { fetchProducts } from "../services/products";

import BestCategoriesLoader from "./BestCategoriesLoader";

function BestCategories({ data, status }) {

    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalStateContext);
    const [filter, setFilter] = useState(null)
    const [length] = useState(5)

    const mutation = useMutation([PRODUCTS_QUERY_KEY, { filter, order: "" }], () => fetchProducts({ filter, order: "" }), {
        onSuccess: () => {
            queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]);
            dispatch({ type: 'SET_PAGE', payload: 1 });
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
            <ul className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-center lg:gap-6 md:gap-4 gap-2 mt-10 h-full w-full">
                {
                    data && data.length > 0 && status === 'success' && data.map((category) => (
                        <li
                            onClick={() => setFilter(`&categoryId=${category.id}`)}
                            className="relative z-0 block justify-center place-self-center items-center w-full h-fit border-gray-200 cursor-pointer"
                            key={category.id}
                        >
                            <div className="w-full h-full overflow-hidden rounded-full border-[1px] hover:border-[1px] hover:border-turquoise">
                                <img
                                    className="object-cover aspect-square w-full shadow shadow-slate-300 border-gray-200"
                                    src={category.image}
                                    alt={category.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <p className="w-full bg-white text-gray-800 mt-2 font-bold capitalize text-center truncate">
                                {category.name}
                            </p>
                        </li>
                    ))
                }
                {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center absolute left-0 right-0">There are no categories</p>}
                {status === 'loading' && <BestCategoriesLoader length={length} />}
                {status === 'error' && <p className="text-center absolute left-0 right-0">Error al cargar las categorías</p>}
            </ul>
        </div>
    );
}

export default BestCategories;