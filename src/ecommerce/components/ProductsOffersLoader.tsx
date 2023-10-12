import CustomButton from "./CustomButton";

function ProductsOffersLoader({ length }) {

    const items = []
    for (let i = 0; i < length; i++) {
        items.push(i)
    }

    return (
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className="flex flex-wrap justify-center gap-6 h-full w-full">
                {
                    items.map((item) => (
                        <li
                            className="animate-pulseFast relative z-0 flex flex-col justify-center items-center w-fit h-fit rounded-xl overflow-hidden shadow shadow-slate-300 bg-gray-300 border-[1px]"
                            key={item}
                        >
                            <div className="lg:w-52 w-44 h-52"></div>
                            <div className="flex flex-col w-full h-20 justify-center items-center"></div>
                            <CustomButton width="w-fit" text="Add to cart" bgColor="gray-200" textColor="transparent" borderColor="gray-300" onClick={null} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ProductsOffersLoader;