import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import GlobalStateContext from "../context/globalStateContext";

function CartProducts() {

    const { state, dispatch } = useContext(GlobalStateContext);
    const { cartProducts } = state;
    console.log(cartProducts)
    const navigate = useNavigate()

    const removeProductToCart = (product) => {
        dispatch({ type: 'REMOVE_PRODUCT', payload: product });
    };

    return (
        <ul className="justify-top gap-10 mt-10 h-full w-full">
            {
                cartProducts && cartProducts.length > 0 && cartProducts.map((product) => (
                    <li
                        onClick={() => navigate(`/products/${product.id}`)}
                        className="relative z-0 mt-4 flex justify-center items-center w-full h-fit rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer"
                        key={product.id}
                    >
                        <div className="w-24 h-24">
                            <img
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
                            <p className="w-5/6 bg-white text-gray-700 capitalize text-center truncate">
                                x {product.quantity}
                            </p>
                            <p className="w-5/6 bg-white font-medium text-gray-600 text-center text-lg truncate">
                                Subtotal: ${product.price}
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
            {cartProducts && cartProducts.length == 0 && <p className="w-full text-center">Aún no agregaste productos</p>}
        </ul>
    );
}

export default CartProducts;