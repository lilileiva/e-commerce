import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import Loader from "../components/Loader";

function BestCategories({ data, status }) {
    console.log(data)
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className="flex flex-wrap justify-center gap-6 mt-10 h-full w-full">
                {
                    data && data.length > 0 && status === 'success' && data.map((category) => (
                        <li
                            onClick={() => navigate(`/categorys/${category.id}`)}
                            className="relative z-0 flex flex-col justify-center items-center lg:w-52 w-44 h-fit border-white rounded-full overflow-hidden cursor-pointer"
                            key={category.id}
                        >
                            <div className="w-52 h-52">
                                <img
                                    className="object-cover w-52 h-52 rounded-full shadow shadow-slate-300 border-gray-200 border-[1px] hover:border-[1px] hover:border-turquoise"
                                    src={category.image}
                                    alt={category.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <div className="flex flex-col w-full h-20 justify-center items-center">
                                <p className="w-5/6 bg-white text-gray-700 font-bold capitalize text-center truncate">
                                    {category.name}
                                </p>
                            </div>
                        </li>
                    ))
                }
                {data && data.length == 0 && status === 'success' && <p className="w-full">No se encontraron categorías</p>}
                {status === 'loading' && <Loader />}
                {status === 'error' && <p>Error al cargar los categoryos</p>}
            </ul>
        </div>
    );
}

export default BestCategories;