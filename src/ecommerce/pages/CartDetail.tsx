import { useContext } from "react";
import CartProducts from "../components/CartProducts";
import CustomButton from "../components/CustomButton";
import GlobalStateContext from "../context/globalStateContext";
import { useNavigate } from "react-router-dom";

function CartDetail() {

    const navigate = useNavigate();
    const { state } = useContext(GlobalStateContext);
    const { totalProducts, totalPrice } = state;

    return (
        <div className="w-full flex justify-center">
            <div className="flex flex-col w-10/12 h-fit justify-top content-center h-[calc(100vh-200px)]">
                <div className="w-full flex justify-between items-center">
                    <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-turquoise rounded-b-sm py-1">
                        Productos del
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">carrito</p>
                    </p>
                    {totalProducts != 0 && <h2 className="text-gray-400">Cantidad de productos: {totalProducts}</h2>}
                </div>
                <CartProducts />
                {totalPrice != 0 && <>
                    <div className="w-full flex justify-between items-center bg-gray-100 rounded-lg content-center mt-6 p-2">
                        <h2 className="text-xl text-gray-600 font-bold">Precio total: ${totalPrice}</h2>
                        <CustomButton width="fit" text="Finalizar compra" bgColor="turquoise" textColor="white" borderColor="turquoise"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/checkout/successful/")
                            }}
                        />
                    </div>
                </>}
            </div>
        </div>
    );
}

export default CartDetail;