import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import GlobalStateContext from "../context/globalStateContext";
import { PRODUCTS_QUERY_KEY } from "../constants";
import camera from "../../assets/camera-svg.png";
import { fetchProducts } from "../services/products";

import CategoriesLoader from "./CategoriesLoader";

function BestCategories({ data, status }) {

    const queryClient = useQueryClient();
    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalStateContext);
    const [filter, setFilter] = useState(null)

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
        <section className="my-12">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 text-center">
                {
                    data && data.length > 0 && status === 'success' && data.map((category) => (
                        <li
                            onClick={() => setFilter(`&categoryId=${category.id}`)}
                            className="group"
                            key={category.id}
                        >
                            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform">
                                <img
                                    className="object-cover h-full w-full"
                                    src={category.image}
                                    alt={category.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <p className="mt-4 font-semibold text-gray-700">{category.name}</p>
                        </li>
                    ))
                }
                {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center absolute left-0 right-0">There are no categories</p>}
                {status === 'loading' && <CategoriesLoader />}
                {status === 'error' && <p className="text-center absolute left-0 right-0">Error al cargar las categorías</p>}
            </ul>
        </section>
    );
}

export default BestCategories;