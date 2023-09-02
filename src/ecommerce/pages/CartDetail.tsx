import { useContext } from "react";
import CartProducts from "../components/CartProducts";
import CustomButton from "../components/CustomButton";
import GlobalStateContext from "../context/globalStateContext";
import { useNavigate } from "react-router-dom";

function CartDetail() {

    const token = window.localStorage.getItem("token");
    const navigate = useNavigate();
    const { state } = useContext(GlobalStateContext);

    const totalProducts = state?.cartProducts.reduce((acc, product) => acc + product.quantity, 0);
    const totalPrice = state?.cartProducts.reduce((acc, product) => acc + product.quantity * product.price, 0);

    const purchase = (e) => {
        e.stopPropagation();
        token ? navigate("/checkout") : navigate("/login")
    }

    return (
        <div className="w-full grid grid-cols-1">
            <div className="flex flex-col w-full h-fit justify-top content-center h-[calc(100vh-200px)]">
                <div className="w-full flex lg:flex-row md:flex-row flex-wrap gap-4 justify-between items-center">
                    <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-turquoise rounded-b-sm py-1">
                        Cart
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">products</p>
                    </p>
                    {totalProducts != 0 && <h2 className="text-gray-400">Total products: {totalProducts}</h2>}
                </div>
                <CartProducts />
                {totalPrice != 0 && <>
                    <div className="w-full flex justify-between items-center bg-gray-100 rounded-lg content-center mt-6 p-2">
                        <h2 className="text-lg text-gray-600 font-bold">Total price: ${totalPrice}</h2>
                        <CustomButton width="w-fit" text="Buy" bgColor="turquoise" textColor="white" borderColor="turquoise"
                            onClick={(e) => purchase(e)}
                        />
                    </div>
                </>}
            </div>
        </div>
    );
}

export default CartDetail;