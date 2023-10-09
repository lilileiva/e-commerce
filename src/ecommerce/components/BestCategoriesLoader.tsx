function BestCategoriesLoader({ length }) {

    const items = []
    for (let i = 0; i < length; i++) {
        items.push(i)
    }

    return (
        <div className="flex flex-col gap-10 justify-center w-full items-center">
            <ul className="flex flex-wrap justify-center gap-6 mt-10 h-full w-full">
                {
                    items.map((item) => (
                        <li
                            className="animate-pulseFast border-[1px] relative z-0 block justify-center items-center border-white"
                            key={item}
                        >
                            <div className="w-46 h-46 lg:w-52 lg:h-52 md:w-46 md:h-46 rounded-full bg-gray-300"></div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default BestCategoriesLoader;