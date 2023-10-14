import CustomButton from "./CustomButton";

function ProductsOffersLoader({ length }) {

    const items = []
    for (let i = 0; i < length; i++) {
        items.push(i)
    }

    return (
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 grid-rows-1 justify-around gap-6 mt-10 h-full w-full">
                {
                    items.map((item) => (
                        <li                            
                            className={`
                                ${item == 4 && "lg:flex hidden"}
                                ${item == 3 && "md:flex hidden"}
                                ${item == 2 && "sm:flex hidden"}
                                animate-pulseFast relative z-0 flex flex-col mx-4 place-self-center justify-center items-center w-44 h-fit rounded-xl border-gray-300 overflow-hidden shadow shadow-slate-300 bg-gray-300 border-gray-200 border-[1px] hover:border-[1px] hover:border-turquoise
                            `}
                            key={item}
                        >
                            <div className="w-44 h-44"></div>
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