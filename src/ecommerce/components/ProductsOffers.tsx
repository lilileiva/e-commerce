import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import { useContext } from "react";
import Loader from "../components/Loader";
import CustomButton from "./CustomButton";
import GlobalStateContext from "../context/globalStateContext";

function ProductsOffers({ data, status }) {

    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalStateContext);

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
    };

    return (
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className="flex flex-wrap justify-center gap-6 mt-10 h-full w-full">
                {
                    data && data.length > 0 && status === 'success' && data.map((product) => (
                        <li
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="relative z-0 flex flex-col justify-center items-center lg:w-52 w-44 h-fit rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer border-gray-200 border-[1px] hover:border-[1px] hover:border-turquoise"
                            key={product.id}
                        >
                            <div className="w-52 h-52">                         
                                <img
                                    className="object-cover w-52 h-52"
                                    src={product.images[0]}
                                    alt={product.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <div className="flex flex-col w-full h-20 justify-center items-center">
                                <p className="w-5/6 bg-white text-gray-700 font-bold capitalize text-center truncate">
                                    {product.title}
                                </p>
                                <p className="w-5/6 bg-white text-gray-700 capitalize text-center truncate">
                                    {product.category.name}
                                </p>
                                <p className="w-5/6 bg-white font-medium text-gray-600 text-center text-lg text-green-400 truncate">
                                    ${product.price}
                                </p>
                            </div>
                            <CustomButton width="fit" text="Add to cart" bgColor="turquoise" textColor="white" borderColor="turquoise"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addProductToCart(product)
                                }}
                            />
                        </li>
                    ))
                }
                {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center absolute left-0 right-0">No se encontraron productos</p>}
                {status === 'loading' && <Loader />}
                {status === 'error' && <p className="text-center absolute left-0 right-0">Error al cargar los productos</p>}
            </ul>
        </div>
    );
}

export default ProductsOffers;