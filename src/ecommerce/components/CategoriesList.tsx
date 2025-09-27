import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-svg.png";

import EditIcon from "../icons/EditIcon";
import CategoriesLoader from "./CategoriesLoader";

function CategoriesList({ data, status, getProductsByCategory }) {

    const navigate = useNavigate()
    const userRole = window.localStorage.getItem("userRole")

    return (
        <>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-center mt-10">
                {
                    data && data.length > 0 && status === 'success' && data.map((category) => (
                        <li
                            onClick={() => getProductsByCategory(category.id)}
                            className="group relative"
                            key={category.id}
                        >
                            {userRole === "admin" && <button
                                onClick={() => navigate(`/categories/edit/${category.id}`)}
                                className="z-10 text-white pl-[2.5px] bg-turquoise w-6 h-6 rounded-md absolute right-0"
                            >
                                <EditIcon size='20' />
                            </button>}
                            <div className="cursor-pointer w-32 h-32 mx-auto rounded-full overflow-hidden shadow-lg transform group-hover:scale-105 transition-transform">
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
        </>
    );
}

export default CategoriesList;