import { useState } from "react"
import camera from "../../assets/camera-img.png";
import LeftArrowButton from "./buttons/LeftArrowButton";
import RightArrowButton from "./buttons/RightArrowButton";

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
                    style={{ backgroundImage: `url(${image})` }}>
                </div>
                {data.images.length > 1 && <div className="w-full flex justify-between absolute">
                    <LeftArrowButton size='10' onClick={prevImage} />
                    <RightArrowButton size='10' onClick={nextImage} />
                </div>}
            </div>
            <ul className="flex w-full h-fit overflow-x-scroll py-2 gap-2 roudned-md">
                {data?.images.map((image, i) => (
                    <li className={`"w-32 h-32 relative rounded-md ${current === i ? "border-2 border-strong-skyblue" : "border-2"} `} key={i}>
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