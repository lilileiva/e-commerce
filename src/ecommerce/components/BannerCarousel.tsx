import { useEffect, useState } from "react"
import LeftArrowIcon from "../icons/LeftArrowIcon"
import RightArrowIcon from "../icons/RightArrowIcon"
import { useNavigate } from "react-router-dom"

function BannerCarousel({ images }) {

    const navigate = useNavigate()
    const [current, setCurrent] = useState(0)

    const prevImage = () => {
        setCurrent((current) => current === 0 ? images.length - 1 : current - 1)
    }

    const nextImage = () => {
        setCurrent((current) => current === images.length - 1 ? 0 : current + 1)
    }    

    useEffect(() => {
        const timer = setTimeout(nextImage, 5000)
        return () => {
            clearTimeout(timer);
        };
    }, [current])

    return (
        <div
            className="w-full h-fit bg-gray-300 rounded-lg overflow-hidden relative flex justify-between items-center cursor-pointer"
            onClick={() => navigate("/products")}
        >
            <div
                className="rounded-md w-full h-fit ease-out duration-200 shadow flex flex-row"                
                style={{ transform: `translateX(-${current * 100}%)` }}>
                {images.map((image) => (
                    <img src={image} alt="banner" className="w-max object-cover" />
                ))}
            </div>
            {images.length > 1 && <div className="w-full flex justify-between absolute">
                <button
                    className="z-10 h-10 w-10 ml-2 bg-gray-200 opacity-60 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200 flex justify-center items-center pr-[4px]"
                    onClick={(e) => {
                        e.stopPropagation()
                        prevImage()
                    }}
                >
                    <LeftArrowIcon size='20' />
                </button>
                <button
                    className="z-10 h-10 w-10 mr-2 bg-gray-200 opacity-60 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200 flex justify-center items-center pl-[4px]"
                    onClick={(e) => {
                        e.stopPropagation()
                        nextImage()
                    }}
                >
                    <RightArrowIcon size='20' />
                </button>
            </div>}
            <ul className="flex w-full h-full gap-2 justify-center items-end mb-4 opacity-50 rounded-md absolute right-0 left-0">
                {images.map((_, i) => (
                    <li className={`w-8 h-2 relative rounded-md cursor-pointer ${current === i ? "bg-gray-400" : "bg-gray-200"} `}
                        key={i}
                        onClick={(e) => {
                            e.stopPropagation()
                            setCurrent(i)
                        }}
                    >
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BannerCarousel;