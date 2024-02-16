import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import EditIcon from "../icons/EditIcon";
import CategoriesLoader from "./CategoriesLoader";

function CategoriesList({ data, status, getProductsByCategory }) {

    const navigate = useNavigate()
    const userRole = window.localStorage.getItem("userRole")

    return (
        <>
            <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center gap-8 mt-10 overflow-hidden">
                {
                    data && data.length > 0 && data.map((category) => (
                        <li className="flex flex-col justify-center items-center place-self-center w-full h-fit rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer border-gray-200 border-[1px] hover:border-[1px] hover:border-turquoise"
                            key={category.id}
                            onClick={() => getProductsByCategory(category.id)}>
                            <div className="w-full h-full relative">
                                {userRole === "admin" && <button
                                    onClick={() => navigate(`/categories/edit/${category.id}`)}
                                    className="text-white pl-[2.5px] bg-turquoise w-6 h-6 rounded-md absolute right-0"
                                >
                                    <EditIcon size='20' />
                                </button>}
                                <img
                                    className="object-cover w-full h-44"
                                    src={category.image}
                                    alt={category.name}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <p className="w-full z-10 bg-white pl-2 text-gray-700 capitalize truncate">
                                {category.name}
                            </p>
                        </li>
                    ))
                }
            </ul>
            {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center">There are not categories</p>}
            {status === 'loading' && <CategoriesLoader length="8" />}
            {status === 'error' && <p className="text-center">Error loading categories</p>}
        </>
    );
}

export default CategoriesList;