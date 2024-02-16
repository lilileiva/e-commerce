import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import ProductsOffersLoader from "./ProductsOffersLoader";
import CustomButton from "./CustomButton";
import GlobalStateContext from "../context/globalStateContext";

function ProductsOffers({ data, status }) {

    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalStateContext);

    const [isAdded, setIsAdded] = useState("")

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
        setIsAdded(product.id)
        setTimeout(() => setIsAdded(""), 700)
    };
    
    return (
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className="grid grid-rows-2 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-center lg:gap-6 gap-4 mt-10 h-full w-full">
                {
                    data && data.length > 0 && status === 'success' && data.map((product) => (
                        <li
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="relative z-0 flex flex-col justify-center items-center place-self-center w-full rounded-xl border-gray-200 overflow-hidden shadow shadow-slate-300 cursor-pointer border-gray-200 border-[1px] hover:border-[1px] hover:border-turquoise"
                            key={product.id}
                        >
                            {isAdded == product.id && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>}
                            <div className="w-fit">
                                <img
                                    className="object-cover w-fit"
                                    src={product.images[0]}
                                    alt={product.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <div className="flex flex-col w-full bg-white h-20 justify-center items-center">
                                <p className="w-5/6 bg-white text-gray-800 font-medium capitalize text-left truncate">
                                    {product.title}
                                </p>
                                <p className="w-5/6 bg-white font-bold text-gray-600 text-left text-gray-800 truncate">
                                    ${product.price}
                                </p>
                                <p className="w-5/6 bg-white font-medium text-gray-600 text-left text-green-500 truncate border-t-[1px] border-gray-200">
                                    Save - $50
                                </p>
                            </div>
                            <CustomButton width="w-11/12" text="Add to cart" bgColor="turquoise" textColor="white" borderColor="turquoise"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addProductToCart(product)
                                }}
                            />
                        </li>
                    ))
                }
                {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center absolute left-0 right-0">There are no products</p>}
                {status === 'loading' && < ProductsOffersLoader length={length} />}
                {status === 'error' && <p className="text-center absolute left-0 right-0">Error al cargar los productos</p>}
            </ul>
        </div>
    );
}

export default ProductsOffers;