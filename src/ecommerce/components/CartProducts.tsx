import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import GlobalStateContext from "../context/globalStateContext";

function CartProducts() {

    const navigate = useNavigate()
    const { state, dispatch } = useContext(GlobalStateContext);
    const { cartProducts } = state;
    const products = cartProducts.sort((a, b) => a.id - b.id);

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
    };

    const removeProductToCart = (product) => {
        dispatch({ type: 'REMOVE_PRODUCT', payload: product });
    };

    return (
        <ul className="justify-top gap-10 mt-10 h-full w-full">
            {
                products && products.length > 0 && products.map((product) => (
                    <li                        
                        className="relative z-0 mt-4 flex justify-center items-center w-full h-fit rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer"
                        key={product.name}
                    >
                        <div className="w-24 h-24">
                            <img
                                onClick={() => navigate(`/products/${product.id}`)}
                                className="object-cover w-24 h-24"
                                src={product.images[0]}
                                alt={product.title}
                                onError={(e) => { e.target["src"] = camera }}
                            />
                        </div>
                        <div className="flex w-full h-20 justify-center items-center">
                            <p className="w-5/6 bg-white text-gray-700 font-bold capitalize text-center truncate">
                                {product.title}
                            </p>
                            <div className="flex w-52">
                                <button
                                    className="font-bold bg-gray-200 text-gray-700 px-2 rounded-sm hover:text-gray-800 hover:bg-gray-300 duration-200"
                                    onClick={() => removeProductToCart(product)}
                                >
                                    -
                                </button>
                                <p className="w-5/6 bg-white text-gray-700 capitalize text-center truncate bg-gray-100">
                                    x {product.quantity}
                                </p>
                                <button
                                    className="font-bold bg-gray-200 text-gray-700 px-2 rounded-sm hover:text-gray-800 hover:bg-gray-300 duration-200"
                                    onClick={() => addProductToCart(product)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="w-5/6 bg-white font-medium text-gray-600 text-center text-lg truncate">
                                Subtotal: ${product.totalPrice}
                            </p>
                        </div>
                        <CustomButton width="fit" text="Eliminar del carrito" bgColor="white" textColor="turquoise" borderColor="turquoise"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeProductToCart(product)
                            }}
                        />
                    </li>
                ))
            }
            {products && products.length == 0 && <p className="w-full text-center">Aún no agregaste productos</p>}
        </ul>
    );
}

export default CartProducts;