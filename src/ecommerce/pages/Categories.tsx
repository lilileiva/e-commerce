import { useNavigate } from "react-router-dom";
import { GET_ALL_CATEGORIES } from "../constants"
import { useQuery } from 'react-query';
import { fetchCategories } from "../actions/categoriesActions";

import Loader from "../components/Loader";


function Categories() {

    const { data, status } = useQuery(GET_ALL_CATEGORIES, fetchCategories)
    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-top content-center min-h-screen">
            <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-skyblue rounded-b-sm py-1">
                Todas las
                <p className="text-transparent">-</p>
                <p className="text-skyblue">categorías</p>
            </p>
            <ul className="flex flex-wrap justify-center gap-10 mt-10">
                {
                    data && data.length > 0 && data.map((category) => (
                        <li className="flex flex-col justify-center align-center w-fit rounded-xl border-white overflow-hidden shadow cursor-pointer"
                            onClick={() => navigate(`/products/?categoryId=${category.id}`)}>
                            <div className="w-52 h-52">
                                <img className="object-cover w-52 h-52" src={category.image} alt={category.name} />
                            </div>
                            <p className="w-full z-10 bg-white pl-2 capitalize">{category.name}</p>
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