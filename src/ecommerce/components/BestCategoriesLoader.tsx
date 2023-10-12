function BestCategoriesLoader({ length }) {

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
                            className="rounded-full animate-pulseFast border-[1px] relative z-0 block justify-center items-center lg:w-52 lg:h-52 w-44 h-44 overflow-hidden shadow shadow-slate-300 bg-gray-300"
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