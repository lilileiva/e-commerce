import { useEffect } from "react";

function CategoriesLoader() {

    let length = 10;

    const items = []
    for (let i = 0; i < length; i++) {
        items.push(i)
    }

    useEffect(() => {
        if (window.innerWidth < 1024) length = 8;
        if (window.innerWidth < 770) length = 6;
        if (window.innerWidth < 640) length = 4;
    }, [location])

    return (
        <>
            {
                items.map((item) => (
                    <li
                        className="group"
                        key={item}
                    >
                        <div className="animate-pulseFast w-32 h-32 mx-auto rounded-full shadow-lg transform transition-transform bg-gray-100 mb-4"></div>
                    </li>
                ))
            }
        </ >
    );
}

export default CategoriesLoader;