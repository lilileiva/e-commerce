import { useContext, useEffect } from "react";
import BagCheckIcon from "../icons/BagCheckIcon";
import GlobalStateContext from "../context/globalStateContext";
import { useLocation, useNavigate } from "react-router-dom";

function SuccessfulCheckout() {

    const location = useLocation();
    const navigate = useNavigate()
    const { dispatch } = useContext(GlobalStateContext);

    const cleanCart = () => {
        dispatch({ type: 'CLEAN' });
    };

    useEffect(() => {
        cleanCart();
    }, [location])

    return (
        <div className="flex flex-col items-center justify-center gap-4 ease-in-out duration-300">
            <div className="ease-in-out duration-300">
                <BagCheckIcon size="55" />
            </div>
            <h1 className="text-3xl font-bold">Succesful purchase</h1>
            <p className="text-lg">Thank you!</p>
            <button className="bg-green-600 text-white p-2 rounded-md" onClick={() => navigate("/products")}>
                Continue buying
            </button>
        </div>
    );
}

export default SuccessfulCheckout;