import { useState, useContext, useEffect } from "react";
import BagCheckIcon from "../icons/BagCheckIcon";
import GlobalStateContext from "../context/globalStateContext";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessfulCheckout() {

    const location = useLocation();
    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalStateContext);

    const [size, setSize] = useState("20");
    setTimeout(() => setSize("40"), 10)

    const cleanCart = () => {
        dispatch({ type: 'CLEAN' });
    };

    useEffect(() => {
        cleanCart();    
    }, [location])

    return (
        <div className="flex flex-col items-center justify-center gap-4 ease-in-out duration-300">
            <div className={`ease-in-out duration-300 flex justify-center items-center bg-green-500 p-8 rounded-full border-8 border-green-200 w-${size} h-${size}`}>
                <BagCheckIcon size="50" />
            </div>
            <h1 className="text-3xl font-bold text-gray-700">
                Succesful purchase
            </h1>
            <p className="text-lg text-gray-00">Thank you!</p>
            <button
                className="bg-green-500 text-white p-2 rounded-md duration-200 hover:bg-green-600"
                onClick={() => navigate("/products")}
            >
                Continue buying
            </button>
        </div>
    );
}

export default SuccessfulCheckout;