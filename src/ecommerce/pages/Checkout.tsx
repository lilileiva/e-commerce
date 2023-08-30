import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

function Checkout() {

    const navigate = useNavigate()

    const token = window.localStorage.getItem("token")
    const cart = window.localStorage.getItem("cart")
    if (!token && cart == "[]") navigate("")

    const [showBack, setShowBack] = useState(false)

    const [purchaseDetails, setPurchaseDetails] = useState({
        cardNumber: "",
        cardHolder: "",
        expirationMonth: "",
        expirationYear: "",
        cvv: ""
    })

    const handleInputChange = (e) => {
        if (e.target.name === "cardHolder") {
            setPurchaseDetails({
                ...purchaseDetails,
                [e.target.name]: (e.target.value).toUpperCase()
            })
        } else {
            if (e.target.value == Number(e.target.value)) {                
                setPurchaseDetails({
                    ...purchaseDetails,
                    [e.target.name]: e.target.value
                })
            }
        }
    }

    return (
        <div className="flex flex-col items-center justify-center pt-8">
            <div className="h-fit">
                <Card showBack={showBack} purchaseDetails={purchaseDetails} />
            </div>
            <form className="rounded-md shadow p-6 mt-32 lg:w-[600px] md:w-[500px] w-full" onSubmit={() => navigate("/checkout/successful")}>
                <div className="mt-6">
                    <span className="block text-sm text-gray-400 pb-2">
                        CARD NUMBER
                    </span>
                    <input
                        className="w-full rounded-md border-[1px] border-gray-300 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none text-gray-400 h-8 p-2"
                        required
                        onFocus={() => setShowBack(false)}
                        onChange={(e) => handleInputChange(e)}
                        name="cardNumber"
                        value={purchaseDetails.cardNumber}
                        type="text"
                        maxLength={16}
                    />
                </div>
                <div className="mt-6">
                    <span className="block text-sm text-gray-400 pb-2">
                        CARD HOLDER
                    </span>
                    <input
                        className="w-full rounded-md border-[1px] border-gray-300 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none text-gray-400 h-8 p-2 border-skyblue"
                        required
                        onClick={() => setShowBack(false)}
                        onChange={(e) => handleInputChange(e)}
                        name="cardHolder"
                        value={purchaseDetails.cardHolder}
                        type="text"
                    />
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="mt-6">
                        <span className="block text-sm text-gray-400 pb-2">
                            EXPIRATION MM
                        </span>
                        <select
                            className="w-full rounded-md border-[1px] border-gray-300 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none text-gray-400 h-8 p-2"
                            required
                            onFocus={() => setShowBack(false)}
                            onChange={(e) => handleInputChange(e)}
                            name="expirationMonth"
                            value={purchaseDetails.expirationMonth}
                        >
                            <option value="month" selected disabled>
                                MONTH
                            </option>
                            <option value="01">01</option>
                            <option value="02">02</option>
                            <option value="03">03</option>
                            <option value="04">04</option>
                            <option value="05">05</option>
                            <option value="06">06</option>
                            <option value="07">07</option>
                            <option value="08">08</option>
                            <option value="09">09</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>
                    <div className="mt-6">
                        <span className="block text-sm text-gray-400 pb-2">
                            EXPIRATION YY
                        </span>
                        <input
                            className="w-full rounded-md border-[1px] border-gray-300 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none text-gray-400 h-8 p-2"
                            required
                            placeholder="YEAR"
                            onFocus={() => setShowBack(false)}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            maxLength={2}
                            name="expirationYear"
                            value={purchaseDetails.expirationYear}
                        />
                    </div>
                    <div className="mt-6">
                        <span className="block text-sm text-gray-400 pb-2">
                            CVV
                        </span>
                        <input
                            className="w-full rounded-md border-[1px] border-gray-300 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none text-gray-400 h-8 p-2"
                            required
                            onFocus={() => setShowBack(true)}
                            onChange={(e) => handleInputChange(e)}
                            type="text"
                            name="cvv"
                            maxLength={4}
                            value={purchaseDetails.cvv}
                        />
                    </div>
                </div>
                <input
                    className="w-full mt-6 text-white cursor-pointer p-2 duration-200 rounded-md border-[1px] font-bold border-turquoise bg-turquoise hover:opacity-70 hover:tracking-wider"
                    type="submit"
                    value="SUBMIT"
                />
            </form>
        </div>
    );
}

export default Checkout;