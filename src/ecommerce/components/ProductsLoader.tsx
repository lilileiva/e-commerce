import CustomButton from "./CustomButton";

function ProductsLoader({ length, showFilters }) {

    const items = []
    for (let i = 0; i < length; i++) {
        items.push(i)
    }

    return (
        <div className="flex flex-col justify-center w-full h-full items-center">
            <ul
                className={
                    `grid ${showFilters ? "lg:grid-cols-3" : "lg:grid-cols-4"} md:grid-cols-3 sm:grid-cols-3 grid-cols-2 justify-center gap-6 mt-10 h-full w-full`
                }>
                {
                    items.map((item) => (
                        <li
                            className="animate-pulseFast relative z-0 flex flex-col place-self-center justify-center items-center lg:w-56 md:w-52 w-44 h-fit rounded-xl overflow-hidden shadow shadow-slate-300 bg-gray-300 border-[1px]"
                            key={item}
                        >
                            <div className="w-full lg:h-56 md:h-52 h-40"></div>
                            <div className="flex flex-col w-full h-20 justify-center items-center"></div>
                            <CustomButton width="w-fit" text="Add to cart" bgColor="gray-200" textColor="transparent" borderColor="gray-300" onClick={null} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ProductsLoader;