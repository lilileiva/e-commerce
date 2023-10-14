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
            <ul className={data && data.length > 0 && status === 'success' &&
                "grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-rows-1 justify-around gap-6 mt-10 h-full w-full"
            }>
                {
                    data && data.length > 0 && status === 'success' && data.map((category) => (
                        <li
                            onClick={() => setFilter(`&categoryId=${category.id}`)}                             
                            className={`
                                ${data.indexOf(category) == 4 && "lg:block hidden"}
                                ${data.indexOf(category) == 3 && "md:block hidden"}
                                ${data.indexOf(category) == 2 && "sm:block hidden"}
                                relative z-0 block justify-center items-center place-self-center w-44 h-fit border-gray-300 cursor-pointer
                            `}                            
                            key={category.id}
                        >
                            <div className="overflow-hidden rounded-full border-[1px] hover:border-[1px] hover:border-turquoise">
                                <img
                                    className="object-cover aspect-square shadow shadow-slate-300 border-gray-200"
                                    src={category.image}
                                    alt={category.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <p className="w-full mt-2 bg-white text-gray-600 font-bold capitalize text-center truncate">
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