import { useLocation } from "react-router-dom";
import ProductsOffers from "../components/ProductsOffers";
import { fetchProducts } from "../services/products";
import { useEffect, useState } from "react";
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY } from "../constants";
import { useQuery } from "react-query";
import watch_banner from "../../assets/Shop-Products-Social-Media-Banner.png"
import sale_banner from "../../assets/mega-sale-banner.jpg"
import LeftArrowIcon from "../icons/LeftArrowIcon"
import RightArrowIcon from "../icons/RightArrowIcon"
import BestCategories from "../components/BestCategories";
import { fetchCategories } from "../services/categories";

function Home() {

    const location = useLocation()
    const [order] = useState("")
    const [current, setCurrent] = useState(0)
    const images = [watch_banner, sale_banner]


    const prevImage = () => {
        setCurrent((current) => current === 0 ? images.length - 1 : current - 1)
    }

    const nextImage = () => {
        setCurrent((current) => current === images.length - 1 ? 0 : current + 1)
    }
    let image: string = images[current]

    useEffect(() => {
        setTimeout(nextImage, 5000)
    }, [current])

    const products = useQuery([PRODUCTS_QUERY_KEY, { filter: location.search, order }], () => fetchProducts({ filter: location.search, order }))
    const categories = useQuery([CATEGORIES_QUERY_KEY], () => fetchCategories())    

    return (
        <div>
            <div className="w-full lg:h-82 md:h-72 h-48 bg-gray-300 rounded-lg overflow-hidden relative flex justify-between items-center">
                <div
                    className="rounded-md w-full h-96 ease-out duration-200 shadow"
                    style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                </div>
                {images.length > 1 && <div className="w-full flex justify-between absolute">
                    <button
                        className="z-10 h-10 w-10 ml-2 bg-gray-200 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200 flex justify-center items-center pr-[4px]"
                        onClick={prevImage}
                    >
                        <LeftArrowIcon size='20' />
                    </button>
                    <button
                        className="z-10 h-10 w-10 mr-2 bg-gray-200 cursor-pointer rounded-full shadow hover:bg-gray-400 duration-200 flex justify-center items-center pl-[4px]"
                        onClick={nextImage}
                    >
                        <RightArrowIcon size='20' />
                    </button>
                </div>}
            </div>
            <div className="w-full h-fit mt-8">
                <div className="w-full flex justify-between items-center">
                    <p className="inline-flex lg:text-xl md:text-lg text-md w-fit text-gray-500 lg:font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                        Todas las
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">ofertas</p>
                    </p>
                    <p className="text-md w-fit text-gray-500 cursor-pointer">Ver todo</p>
                </div>
                <ProductsOffers data={products?.data?.slice(0, 4)} status={products?.status} />
            </div>
            <div className="w-full h-fit mt-8">
                <div className="w-full flex justify-between items-center">
                    <p className="inline-flex lg:text-xl md:text-lg text-md w-fit text-gray-500 lg:font-medium border-b-2 border-turquoise rounded-b-sm py-1 h-fit">
                        Las mejores
                        <p className="text-transparent">-</p>
                        <p className="text-turquoise">categorías</p>
                    </p>
                    <p className="text-md w-fit text-gray-500 cursor-pointer">Ver todo</p>
                </div>
                <BestCategories data={categories?.data?.slice(0, 4)} status={categories?.status} />
            </div>
        </div>
    );
}

export default Home;