import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from 'react-query';
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY } from "../constants"
import { fetchCategories } from "../services/categories";
import { useLocation, useNavigate } from "react-router-dom";

import CloseIcon from "../icons/CloseIcon";
import MenuFoldIcon from "../icons/MenuFoldIcon";

function FilterBar({ setOrder }) {

    const location = useLocation()
    const navigate = useNavigate()
    const [showFilters, setShowFilters] = useState(true)
    const [filter, setFilter] = useState("")
    const [orderValue, setOrderValue] = useState("")
    const [category, setCategory] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    const [title, setTitle] = useState("")
    const queryClient = useQueryClient();

    const { data, status } = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)

    const handleInputChange = (e) => {
        if (location.search) {
            const search = location.search
            let splited = search.split('&')
            splited.map((item) => {
                if (item.split('=')[0] === 'title') {
                    setTitle(`&${item}`)
                }
            })
        }
        if (e.target.name === "categories") {
            setCategory(`&categoryId=${e.target.value}`)
        }
        if (e.target.name === "price_min") {
            if (e.target.value != "") {
                setMinPrice(`&price_min=${e.target.value}`)
            } else {
                setMinPrice("&price_min=1")
            }
            if (maxPrice == "") {
                setMaxPrice("&price_max=1000000")
            }
        }
        if (e.target.name === "price_max") {
            if (e.target.value != "") {
                setMaxPrice(`&price_max=${e.target.value}`)
            } else {
                setMaxPrice("&price_max=1000000")
            }
            if (minPrice == "") {
                setMinPrice("&price_min=1")
            }
        }
        if (e.target.name === "order") {
            setOrderValue(e.target.value)
        }
    }

    useEffect(() => {
        setFilter(title + category + minPrice + maxPrice)
    }, [title, category, minPrice, maxPrice])


    const handleInputSubmit = (e) => {
        e.preventDefault()
        setFilter(category + minPrice + maxPrice)
        setOrder(orderValue)
        queryClient.invalidateQueries([PRODUCTS_QUERY_KEY]);
        navigate(`/products/?${filter}`)
    }

    return (
        <>
            {showFilters ? <div className="h-80 w-80 flex flex-col justify-top align-left shadow shadow-slate-300 rounded-md p-4 h-fit transition duration-150">
                <div className="flex mb-4 justify-between items-center">
                    <h3 className="font-semibold text-gray-400">Filtros</h3>
                    <button onClick={() => setShowFilters(false)}>
                        <CloseIcon size='25' />
                    </button>
                </div>
                <div className="h-full flex flex-col justify-around align-left">
                    <div className="flex flex-col mb-6">
                        <label htmlFor="order" className="font-semibold text-lg text-gray-500">
                            Ordenar
                        </label>
                        <select name="order" className="w-full cursor-pointer border-[1px] border-gray-200 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none" onChange={(e) => handleInputChange(e)}>
                            <option value="">-----</option>
                            <option value="title_asc">
                                Alfabéticamente: A a Z
                            </option>
                            <option value="title_desc">
                                Alfabéticamente: Z a A
                            </option>
                            <option value="price_desc">
                                Precio: Mayor a menor
                            </option>
                            <option value="price_asc">
                                Precio: Menor a mayor
                            </option>
                        </select>
                    </div>
                    <div className="flex flex-col mb-6">
                        <label htmlFor="categories" className="font-semibold text-lg text-gray-500">
                            Categorías
                        </label>
                        <select name="categories" className="w-full cursor-pointer border-[1px] border-gray-200 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none" onChange={(e) => handleInputChange(e)}>
                            <option value="">Todas las categorías</option>
                            {
                                data && status == "success" && data.map((category) => (
                                    <option value={category.id} className="capitalize">
                                        {category.name}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="flex flex-col mb-6">
                        <h2 className="font-semibold text-lg text-gray-500">Rango de precios</h2>
                        <div className="inline-flex justify-left gap-2 w-full">
                            <input
                                name="price_min"
                                type="text"
                                placeholder="Min"
                                onChange={(e) => handleInputChange(e)}
                                className="w-full border-[1px] border-gray-200 rounded-sm pl-2 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                            />
                            <input
                                name="price_max"
                                type="text"
                                placeholder="Max"
                                onChange={(e) => handleInputChange(e)}
                                className="w-full border-[1px] border-gray-200 rounded-sm pl-2 hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                            />
                        </div>
                    </div>
                    <button
                        onClick={(e) => handleInputSubmit(e)}
                        className="w-fit self-center border-2 border-turquoise font-bold text-turquoise p-4 rounded-md cursor-pointer hover:bg-turquoise hover:text-white transition duration-150 ease-out hover:ease-in"
                    >
                        Buscar
                    </button>
                </div>
            </div> : <div className="w-fit">
                <button
                    className="bg-skyblue rounded-md p-2"
                    onClick={() => setShowFilters(true)}>
                    <MenuFoldIcon size='30' />
                </button>
            </div>
            }
        </>
    );
}

export default FilterBar;