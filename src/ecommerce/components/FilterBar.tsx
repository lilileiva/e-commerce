import { useEffect, useState } from "react";
import { useQuery } from 'react-query';
import { CATEGORIES_QUERY_KEY } from "../constants"
import { fetchCategories } from "../actions/categoriesActions";
import { useNavigate } from "react-router-dom";


function FilterBar() {
    
    const navigate = useNavigate()
    const [params, setParams] = useState("")
    const [category, setCategory] = useState("")
    const [minPrice, setMinPrice] = useState("")
    const [maxPrice, setMaxPrice] = useState("")
    
    const { data, status } = useQuery(CATEGORIES_QUERY_KEY, fetchCategories)

    const handleInputChange = (e) => {
        if (e.target.name == "categories") {
            setCategory(`&categoryId=${e.target.value}`)
        }
        if (e.target.name == "price_min") {
            setMinPrice(`&price_min=${e.target.value}`)
            maxPrice == "" ? setMaxPrice("&price_mmax=1000000") : null
        }
        if (e.target.name == "price_max") {
            minPrice == "" ? setMinPrice("&price_min=1") : null
            setMaxPrice(`&price_max=${e.target.value}`)
        }
    }

    useEffect(() => {
        setParams(category + minPrice + maxPrice)
    }, [category, minPrice, maxPrice])

    const handleInputSubmit = (e) => {
        e.preventDefault()
        setParams(category + minPrice + maxPrice)
        navigate(`/products/?${params}`)
    }

    return (
        <div className="h-80 flex flex-col justify-top align-left shadow p-4">
            <h3 className="font-semibold text-gray-400">Filtros</h3>
            <div className="h-full flex flex-col justify-around align-left">
                <div className="flex flex-col">
                    <label htmlFor="categories" className="font-semibold text-lg text-gray-500">
                        Categorías
                    </label>
                    <select name="categories" className="w-11/12 cursor-pointer focus:border-strong-skyblue focus:outline-none" onChange={(e) => handleInputChange(e)}>
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
                <div>
                    <h2 className="font-semibold text-lg text-gray-500">Rango de precios</h2>
                    <div className="inline-flex justify-left gap-2">
                        <input
                            name="price_min"
                            type="text"
                            placeholder="Min"
                            onChange={(e) => handleInputChange(e)}
                            className="w-5/12 border-[1px] border-gray-100 rounded-sm pl-2 focus:border-2 focus:border-strong-skyblue focus:outline-none"
                        />
                        <input
                            name="price_max"
                            type="text"
                            placeholder="Max"
                            onChange={(e) => handleInputChange(e)}
                            className="w-5/12 border-[1px] border-gray-100 rounded-sm pl-2 focus:border-2 focus:border-strong-skyblue focus:outline-none"
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
        </div>
    );
}

export default FilterBar;