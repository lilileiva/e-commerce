function CategoriesLoader({ length }) {

    const items = []
    for (let i = 0; i < length; i++) {
        items.push(i)
    }

    return (
        <ul className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 justify-center gap-8 mt-10 overflow-y-scroll overflow-x-hidden">
            {
                items.map((item) => (
                    <li className="animate-pulseFast flex flex-col justify-center items-center place-self-center w-44 h-44 rounded-xl border-white overflow-hidden shadow shadow-slate-300 cursor-pointer border-gray-200 border-[1px] hover:border-[1px] hover:border-turquoise"
                        key={item}>
                        <div className="w-full h-full bg-gray-300 relative">
                        </div>
                        <p className="w-full z-10 bg-gray-200 pl-2 text-gray-700 capitalize truncate">
                        </p>
                    </li>
                ))
            }
        </ul>
    );
}

export default CategoriesLoader;