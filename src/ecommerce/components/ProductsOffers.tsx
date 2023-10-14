import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import ProductsOffersLoader from "./ProductsOffersLoader";
import CustomButton from "./CustomButton";
import GlobalStateContext from "../context/globalStateContext";

function ProductsOffers({ data, status }) {

    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalStateContext);

    const [isAdded, setIsAdded] = useState("")
    const [length] = useState(5)

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
        setIsAdded(product.id)
        setTimeout(() => setIsAdded(""), 700)
    };
    
    return (
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className={data && data.length > 0 && status === 'success' &&
                "grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-rows-1 justify-around gap-6 mt-10 h-full w-full"
            }>
                {
                    data && data.length > 0 && status === 'success' && data.slice(0, length).map((product) => (
                        <li
                            onClick={() => navigate(`/products/${product.id}`)}
                            className={`
                                ${data.indexOf(product) == 4 && "lg:flex hidden"}
                                ${data.indexOf(product) == 3 && "md:flex hidden"}
                                ${data.indexOf(product) == 2 && "sm:flex hidden"}
                                flex-shrink-0 relative z-0 flex flex-col place-self-center justify-center items-center w-44 h-fit rounded-xl border-gray-300 overflow-hidden shadow shadow-slate-300 cursor-pointer border-gray-200 border-[1px] hover:border-[1px] hover:border-turquoise
                            `}
                            key={product.id}
                        >
                            {isAdded == product.id && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>}
                            <div className="w-44 h-44">
                                <img
                                    className="object-cover w-44 h-44"
                                    src={product.images[0]}
                                    alt={product.title}
                                    onError={(e) => { e.target["src"] = camera }}
                                />
                            </div>
                            <div className="flex flex-col w-full h-20 justify-center items-center">
                                <p className="w-5/6 bg-white text-gray-600 font-bold capitalize text-center truncate">
                                    {product.title}
                                </p>
                                <p className="w-5/6 bg-white text-gray-500 capitalize text-center truncate">
                                    {product.category.name}
                                </p>
                                <p className="w-5/6 bg-white font-medium text-gray-600 text-center text-lg text-green-400 truncate">
                                    ${product.price}
                                </p>
                            </div>
                            <CustomButton width="w-fit" text="Add to cart" bgColor="turquoise" textColor="white" borderColor="turquoise"
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