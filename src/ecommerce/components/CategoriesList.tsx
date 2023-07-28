import camera from "../../assets/camera-img.png";

import Loader from "./Loader";
import EditButton from "./buttons/EditButton";

function CategoriesList({ data, status, getProductsByCategory }) {

    const userRole = window.localStorage.getItem("userRole")

    return (
        <ul className="flex flex-wrap justify-center gap-10 mt-10 overflow-y-scroll">
            {
                data && data.length > 0 && data.map((category) => (
                    <li className="flex flex-col justify-center align-center w-52 h-fit rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer"
                        key={category.id}
                        onClick={() => getProductsByCategory(category.id)}>
                        <div className="w-52 h-52 relative">
                            {userRole === "admin" && <EditButton endpoint={`/categories/edit/${category.id}`} />}
                            <img
                                className="object-cover w-52 h-52"
                                src={category.image}
                                alt={category.name}
                                onError={(e) => { e.target["src"] = camera }}
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
    );
}

export default CategoriesList;