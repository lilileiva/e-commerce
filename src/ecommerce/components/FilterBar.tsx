import { GET_CATEGORY } from "../constants"
import { useQuery } from 'react-query';
import { GET_ALL_CATEGORIES } from "../constants"
import { fetchCategories } from "../actions/categoriesActions";
import { fetchCategory } from "../actions/categoriesActions";


function FilterBar({ searchParams }) {

    const { data } = useQuery(GET_ALL_CATEGORIES, fetchCategories)

    const expectedKeys = [
        "price", "price_min", "price_max", "categoryId"
    ]
    const foundKeys = {}

    searchParams.forEach((value: string, key: string) => {
        if (expectedKeys.includes(key)) {
            if (key == "categoryId") {
                const categoryId = value
                const { data, status } = useQuery(GET_CATEGORY, () => fetchCategory({ categoryId }))
                if (data && status === "success") {
                    value = data?.name
                    return foundKeys["Categoría"] = value
                }
            }
            if (key == "price") foundKeys["Precio"] = value
            if (key == "price_min") foundKeys["Precio mínimo"] = value
            if (key == "price_max") foundKeys["Precio máximo"] = value
        }
    })

    return (
        <div className="h-72 flex flex-col justify-top align-left">
            <h3 className="font-semibold text-gray-400">Filtros</h3>
            <div className="h-full flex flex-col justify-around align-left">
                <div className="flex flex-col">
                    <label for="categories" className="font-semibold text-lg text-gray-500">
                        Categorías
                    </label>
                    <select name="categories" className="w-11/12 cursor-pointer focus:border-skyblue">
                        <option value="">Todas las categorías</option>
                        {
                            data && data.map((category) => (
                                <option value={category.name} className="capitalize">
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <div>
                    <h2 className="font-semibold text-lg text-gray-500">Rango de precios</h2>
                    <div className="inline-flex justify-left gap-2">
                        <input type="text" placeholder="Min" className="w-5/12 border-[1px] border-gray-100 rounded-sm pl-2 focus:border-skyblue" />
                        <input type="text" placeholder="Max" className="w-5/12 border-[1px] border-gray-100 rounded-sm pl-2 focus:border-skyblue" />
                    </div>
                </div>
                <input
                    type="submit"
                    value="Buscar"
                    className="w-fit bg-skyblue font-bold text-white p-4 rounded-md cursor-pointer"
                />
            </div>
        </div>
    );
}

export default FilterBar;