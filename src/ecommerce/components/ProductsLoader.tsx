import { useEffect } from "react";

function ProductsLoader({ showFilters = false }) {

    let length = showFilters ? 6 : 8;

    const items = []
    for (let i = 0; i < length; i++) {
        items.push(i)
    }

    useEffect(() => {
        if (window.innerWidth < 1024) length = 6;
        if (window.innerWidth < 640) length = 4;
    }, [location])

    return (
        <>
            {
                items.map((item) => (
                    <li
                        className="rounded-lg animate-pulseFast shadow-lg transform transition-transform bg-gray-100 transition-shadow group"
                        key={item}
                    >
                        <div className="w-44 h-44"></div>
                        <div className="flex flex-col w-full h-36 justify-center items-center"></div>
                    </li>
                ))
            }
        </>
    );
}

export default ProductsLoader;