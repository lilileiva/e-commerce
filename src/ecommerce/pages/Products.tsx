import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { PRODUCTS_QUERY_KEY } from "../constants";
import { fetchProducts } from "../services/products";
import camera from "../../assets/camera-img.png";

import FilterBar from "../components/FilterBar";
import Loader from "../components/Loader";

function Products() {

    const navigate = useNavigate()
    const location = useLocation()

    const { data, status } = useQuery([PRODUCTS_QUERY_KEY, { filter: location.search }], () => fetchProducts({ filter: location.search }))

    return (
        <div className="flex flex-col justify-top content-center w-full h-[calc(100vh-200px)]">
            <div className="grid grid-cols-[25%_auto] gap-10 h-full">
                <FilterBar />
                <div className="w-full h-[calc(100vh-200px)] overflow-y-scroll">
                    <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                        Todos los
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">productos</p>
                    </p>
                    <ul className="flex flex-wrap justify-center gap-10 mt-10 h-full">
                        {
                            data && data.length > 0 && status === 'success' && data.map((product) => (
                                <li className="flex flex-col justify-center items-center w-52 h-fit rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer"
                                    key={product.name}
                                    onClick={() => navigate(`/products/${product.id}`)}>
                                    <div className="w-52 h-52">
                                        <img
                                            className="object-cover w-52 h-52"
                                            src={product.images[0]}
                                            alt={product.title}
                                            onError={(e) => { e.target.src = camera }}
                                        />
                                    </div>
                                    <p className="w-5/6 z-10 bg-white text-gray-700 capitalize text-center truncate">
                                        {product.title}
                                    </p>
                                    <p className="w-5/6 z-10 bg-white text-gray-700 capitalize text-center truncate">
                                        {product.category.name}
                                    </p>
                                    <p className="w-5/6 z-10 bg-white font-medium text-gray-600 text-center text-lg truncate">
                                        ${product.price}
                                    </p>
                                    <button
                                        className="w-fit font-bold bg-turquoise text-white p-2 m-2 self-center rounded-md cursor-pointer hover:bg-white hover:text-turquoise transition duration-150 ease-out hover:ease-in"
                                    >
                                        Agregar al carrito
                                    </button>
                                </li>
                            ))
                        }
                        {data && data.length == 0 && status === 'success' && <p>No se encontraron productos</p>}
                        {status === 'loading' && <Loader />}
                        {status === 'error' && <p>Error al cargar los productos</p>}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Products;