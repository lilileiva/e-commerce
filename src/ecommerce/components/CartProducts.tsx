import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GlobalStateContext from "../context/globalStateContext";
import camera from "../../assets/camera-img.png";
import TrashButton from "./TrashButton";

function CartProducts() {

    const navigate = useNavigate()
    const { state, dispatch } = useContext(GlobalStateContext);
    const { cartProducts } = state;
    const products = cartProducts.sort((a, b) => a.id - b.id);

    const addProductToCart = (product) => {
        dispatch({ type: 'ADD_PRODUCT', payload: product });
    };

    const removeProductToCart = (product) => {
        if (product.quantity > 1) dispatch({ type: 'REMOVE_PRODUCT', payload: product });
    };

    const removeAllProducts = (product) => {
        dispatch({ type: 'REMOVE_PRODUCT', payload: product });
    };

    return (
        <ul className="justify-top gap-10 mt-10 h-full w-full">
            {
                products && products.length > 0 && products.map((product) => (
                    <li
                        className="relative z-0 mt-4 grid grid-cols-[100px_auto_60px] w-full h-fit rounded-xl border-white overflow-auto shadow shadow-slate-300 cursor-pointer"
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
                        <div className="flex lg:flex-row md:flex-row flex-col justify-around content-center items-center gap-2 w-full">
                            <p className="h-fit lg:w-56 md:w-48 w-40 bg-white text-gray-700 lg:text-base text-sm font-bold capitalize text-center truncate text-left">
                                {product.title}
                            </p>
                            <div className="flex w-24">
                                <button
                                    className="font-bold bg-gray-200 text-gray-700 px-2 rounded-sm hover:text-gray-800 hover:bg-gray-300 duration-200"
                                    onClick={() => removeProductToCart(product)}
                                >
                                    -
                                </button>
                                <p className="w-24 bg-white text-gray-700 capitalize text-center truncate bg-gray-100">
                                    x {product.quantity}
                                </p>
                                <button
                                    className="font-bold bg-gray-200 text-gray-700 px-2 rounded-sm hover:text-gray-800 hover:bg-gray-300 duration-200"
                                    onClick={() => addProductToCart(product)}
                                >
                                    +
                                </button>
                            </div>
                            <p className="h-fit w-fit bg-white lg:text-base md:text-base text-sm text-gray-600 text-center text-lg truncate">
                                Subtotal: ${product.totalPrice}
                            </p>
                        </div>
                        <div className="w-fit flex items-center justify-center">
                            <TrashButton width="fit" bgColor="white" color="#1ABCFE" borderColor="turquoise"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeAllProducts(product)
                                }} />
                        </div>
                    </li>
                ))
            }
            {products && products.length == 0 && <p className="w-full text-center">Aún no agregaste productos</p>}
        </ul>
    );
}

export default CartProducts;