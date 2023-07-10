import { useContext } from "react";
import { CategoriesContext } from "../context/categories/CategoriesContext";
import { useNavigate } from "react-router-dom";


function Categories() {

    const categories = useContext(CategoriesContext);
    const categoriesData = categories?.data
    const navigate = useNavigate()

    return (
        <div className="py-5 flex flex-col justify-center content-center">
            <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-skyblue rounded-b-sm py-1">
                Todas las
                <p className="text-transparent">-</p>
                <p className="text-skyblue">categorías</p>
            </p>
            <ul className="flex flex-wrap justify-center gap-10 mt-10">
                {
                    categoriesData ? categoriesData.map((category) => (
                        <li className="flex flex-col justify-center align-center w-fit rounded-xl border-white overflow-hidden shadow cursor-pointer"
                            onClick={() => navigate(`/products/?categoryId=${category.id}`)}>
                            <div className="w-52 h-52">
                                <img className="w-52" src={category.image} alt={category.name} />
                            </div>
                            <p className="w-full z-10 bg-white pl-2 capitalize">{category.name}</p>
                        </li>
                    )) : <p>Cargando...</p>
                }
            </ul>
        </div>
    );
}

export default Categories;