import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import camera from "../../assets/camera-img.png";

import ProductsOffersLoader from "./ProductsOffersLoader";
import CustomButton from "./CustomButton";
import GlobalStateContext from "../context/globalStateContext";

function ProductsOffers({ data, status }) {

    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalStateContext);

    const [isAdded, setIsAdded] = useState("");

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
        setIsAdded(product.id)
        setTimeout(() => setIsAdded(""), 700)
    };

    return (
        <section className="my-12">
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {
                    data && data.length > 0 && status === 'success' && data.map((product) => (
                        <li
                            onClick={() => navigate(`/products/${product.id}`)}
                            key={product.id}
                            className="relative z-0 cursor-pointer rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden group">
                            {isAdded == product.id && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>}
                            <img
                                className="object-cover w-full h-40"
                                src={product.images[0]}
                                alt={product.title}
                                onError={(e) => { e.target["src"] = camera }}
                            />
                            <div className="p-4">
                                <h4 className="font-semibold truncate text-gray-800">{product.title}</h4>
                                <div className="flex items-baseline space-x-2 my-2">
                                    <p className="text-lg font-bold text-gray-800">${product.price}</p>
                                    <p className="text-sm text-gray-600 line-through">${product.price - (product.price * 15 / 100)}</p>
                                </div>
                                <p className="text-xs text-green-600 mb-4">Save ${(product.price * 15 / 100)}</p>
                                <CustomButton width="w-full" text="Add to cart" bgColor="turquoise" textColor="white" borderColor="turquoise"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addProductToCart(product)
                                    }}
                                />
                            </div>
                        </li>
                    ))
                }
                {(data && data.length == 0 || !data) && status === 'success' && <p className="text-center absolute left-0 right-0">There are no products</p>}
                {status === 'loading' && < ProductsOffersLoader />}
                {status === 'error' && <p className="text-center absolute left-0 right-0">Error al cargar los productos</p>}
            </ul>
        </section>
    );
}

export default ProductsOffers;