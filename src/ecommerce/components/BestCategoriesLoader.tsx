function BestCategoriesLoader({ length }) {

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
                                ${item == 4 && "lg:block hidden"}
                                ${item == 3 && "md:block hidden"}
                                ${item == 2 && "sm:block hidden"}
                                rounded-full animate-pulseFast border-[1px] relative z-0 block justify-center place-self-center items-center w-44 h-44 overflow-hidden shadow shadow-slate-300 bg-gray-300
                            `}   
                            key={item}
                        >
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default BestCategoriesLoader;