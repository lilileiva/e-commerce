import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from 'react-query';
import { GET_ALL_PRODUCTS } from "../constants";
import { fetchProducts } from "../actions/productsActions";

import Loader from "../components/Loader";



function Products() {

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    let params: string = ""
    searchParams.forEach((value, key) => {
        return params += `&${key}=${value}`
      });

    const { data, status } = useQuery(GET_ALL_PRODUCTS, () => fetchProducts({params}))

    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-top content-center w-full min-h-screen">
            <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-skyblue rounded-b-sm py-1 h-fit">
                Todos los
                <p className="text-transparent">-</p>
                <p className="text-skyblue">productos</p>
            </p>
            <ul className="flex flex-wrap justify-center gap-10 mt-10 h-full">
                {
                    data && data.length > 0 && status === 'success' && data.map((product) => (
                        <li className="flex flex-col justify-center align-center w-fit rounded-xl border-white overflow-hidden shadow cursor-pointer"
                        onClick={() => navigate(`/products/${product.id}`)}>
                            <div className="w-52 h-52">
                                <img className="w-52" src={product.images[0]} alt={product.title} />
                            </div>
                            <p className="w-full z-10 bg-white pl-2 text-gray-800 capitalize">{product.title}</p>
                            <p className="w-full z-10 bg-white pl-2 font-semibold text-gray-600">${product.price}</p>
                        </li>
                    ))
                }
                {data && data.length == 0 && <p>No se encontraron productos</p>}
                {status === 'loading' && <Loader />}
                {status === 'error' && <p>Error al cargar los productos</p>}                
            </ul>
        </div>
    );
}

export default Products;