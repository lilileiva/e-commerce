import visaLogo from "../../assets/visa-logo.png";
import chip from "../../assets/chip-logo.png";

function Card({ showBack, purchaseDetails }) {

    const formatCardNumber = (number) => {
        if (number) {
            number.split("").map((_, index) => {
                if (index == 4 || index == 9 || index == 14) {
                    number = number.slice(0, index) + " " + number.slice(index)
                }
            })
            return number
        } else {
            return "#### #### #### ####"
        }
    }

    const formattedNumber = formatCardNumber(purchaseDetails.cardNumber)

    return (
        <div className="mb-[-150px] w-full relative flex justify-center">
            <div className={
                showBack ? "hidden" : "animate-cardFlip visible lg:w-[350px] md:w-[340px] w-[335px] h-56 p-4 rounded-xl flex flex-col justify-around bg-gradient-to-r from-cyan-500 to-blue-500 shadow"
            }>
                <div className="flex justify-between">
                    <img src={chip} alt="chip" className="w-16" />
                    <img src={visaLogo} alt="visa" className="w-32 h-12" />
                </div>
                <div className="text-sm text-white font-bold text-xl tracking-wider">
                    {formattedNumber}
                </div>
                <div className="flex justify-between">
                    <div>
                        <span className="text-sm text-white font-bold">CARD HOLDER</span>
                        <div className="text-sm text-white font-bold">
                            {purchaseDetails.cardHolder != "" ? purchaseDetails.cardHolder : "FULL NAME"}
                        </div>
                    </div>
                    <div>
                        <span className="text-sm text-white font-bold">EXPIRES</span>
                        <div>
                            <span className="text-sm text-white font-bold">{purchaseDetails.expirationMonth != "" ? purchaseDetails.expirationMonth : "MM"}</span>
                            <span className="text-sm text-white font-bold"> / </span>
                            <span className="text-sm text-white font-bold">{purchaseDetails.expirationYear != "" ? purchaseDetails.expirationYear : "YY"}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={showBack ? "visible animate-cardFlip lg:w-[350px] md:w-[340px] w-[335px] text-right h-56 py-4 rounded-xl flex flex-col justify-around bg-gradient-to-r from-cyan-500 to-blue-500 shadow" : "hidden backface-hidden"}>
                <div className="bg-black h-12 w-full"></div>
                <div className="flex justify-between w-full px-4">
                    <div className="w-full flex flex-col">
                        <span className="text-sm text-white font-bold">CVV</span>
                        <div className="text-medium text-gray-800 font-bold bg-white h-8 w-full flex justify-end pr-2 items-center rounded-sm">
                            {purchaseDetails.cvv}
                        </div>
                        <img src={visaLogo} alt="visa" className="w-16 pt-4 self-end" />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Card;