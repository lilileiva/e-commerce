import { useParams } from "react-router-dom";
import { PRODUCT_QUERY_KEY } from "../constants";
import { fetchProduct } from "../services/products";
import { useQuery } from "react-query";
import camera from "../../assets/camera-img.png";
import { useState } from "react";


function Product() {

    const { productId } = useParams()
    const { data, status } = useQuery([PRODUCT_QUERY_KEY, productId], () => fetchProduct({ productId }))
    const [current, setCurrent] = useState(0)

    const prevImage = () => {
        setCurrent((current) => current === 0 ? data?.images.length - 1 : current - 1)
    }

    const nextImage = () => {
        setCurrent((current) => current === data?.images.length - 1 ? 0 : current + 1)
    }
    let image: string = data?.images[current]

    return (
        <div className="w-full flex justify-center">
            {data && status === 'success' && <div className="w-10/12 flex justify-center gap-8 grid grid-cols-2">
                <div className="relative w-full h-fit rounded-md">
                    <div className="overflow-hidden relative w-full h-max flex justify-between items-center">
                        <div
                            className="rounded-md w-full h-96 ease-out duration-200 shadow"
                            style={{ backgroundImage: `url(${image})` }}>
                        </div>
                        {data.images.length > 1 && <div className="w-full flex justify-between absolute">
                            <button
                                className="z-10 h-10 w-10 ml-2 bg-gray-200 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200"
                                onClick={prevImage}
                            >
                                {'<'}
                            </button>
                            <button
                                className="z-10 h-10 w-10 mr-2 bg-gray-200 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200"
                                onClick={nextImage}
                            >
                                {'>'}
                            </button>
                        </div>}
                    </div>
                    <ul className="flex w-full h-fit overflow-x-scroll py-2 gap-2 roudned-md">
                        {data?.images.map((image, i) => (
                            <li className={`"w-32 h-32 relative rounded-md ${current === i ? "border-2 border-strong-skyblue" : "border-2"} `} key={i}>
                                <img src={image} alt="product image"
                                    className="w-32 h-32 object-cover rounded-md p-2" onError={(e) => { e.target.src = camera }}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col gap-4 mt-6">
                    <h1 className="text-gray-700 text-2xl">{data.title}</h1>
                    <h2 className="text-gray-700 text-3xl">${data.price}</h2>
                    <p className="text-gray-700">{data.description}</p>
                    <p className="text-gray-500">Categoría: {data.category.name}</p>
                    <button
                        className="w-56 font-bold bg-turquoise text-white p-2 m-2 self-center rounded-md cursor-pointer border-2 hover:bg-white hover:text-turquoise hover:border-turquoise transition duration-150 ease-out hover:ease-in"
                    >
                        Comprar
                    </button>
                    <button
                        className="w-56 font-bold bg-white text-turquoise border-turquoise p-2 m-2 self-center rounded-md cursor-pointer border-2 hover:bg-turquoise hover:text-white hover:border-turquoise transition duration-150 ease-out hover:ease-in"
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>}
        </div>
    );
}

export default Product;