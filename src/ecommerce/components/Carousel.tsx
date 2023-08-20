import { useState } from "react"
import camera from "../../assets/camera-img.png";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

function Carousel({ data }) {

    const [current, setCurrent] = useState(0)

    const prevImage = () => {
        setCurrent((current) => current === 0 ? data?.images.length - 1 : current - 1)
    }

    const nextImage = () => {
        setCurrent((current) => current === data?.images.length - 1 ? 0 : current + 1)
    }
    let image: string = data?.images[current]

    return (
        <div className="relative w-full h-fit rounded-md">
            <div className="overflow-hidden relative w-full h-max flex justify-between items-center">
                <div
                    className="rounded-md w-full h-96 ease-out duration-200 shadow"
                    style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}>
                </div>
                {data.images.length > 1 && <div className="w-full flex justify-between absolute">
                    <button
                        className="z-10 h-10 w-10 ml-2 bg-gray-200 opacity-60 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200 flex justify-center items-center pr-[4px]"
                        onClick={prevImage}
                    >
                        <LeftArrowIcon size='20' />
                    </button>
                    <button
                        className="z-10 h-10 w-10 mr-2 bg-gray-200 opacity-60 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200 flex justify-center items-center pl-[4px]"
                        onClick={nextImage}
                    >
                        <RightArrowIcon size='20' />
                    </button>
                </div>}
            </div>
            <ul className="flex w-full h-fit overflow-x-scroll py-2 gap-2 roudned-md">
                {data?.images.map((image, i) => (
                    <li className={`"w-32 h-32 relative rounded-md cursor-pointer ${current === i ? "border-2 border-strong-skyblue" : "border-2"} `}
                        key={i}
                        onClick={() => setCurrent(i)}
                        onMouseEnter={() => setCurrent(i)}
                    >
                        <img src={image} alt="product image"
                            className="w-32 h-32 object-cover rounded-md p-2" onError={(e) => { e.target["src"] = camera }}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Carousel;