import { useContext } from "react";
import { CategoriesContext } from "../context/categories/CategoriesContext";
import { useNavigate } from "react-router-dom";


function Categories() {

    const categories = useContext(CategoriesContext);
    const categoriesData = categories?.data
    const navigate = useNavigate()

    return (
        <div className="p-10 flex flex-col justify-center align-center">
            <p className="text-lg w-fit">Categories</p>
            <ul className="w-fit flex flex-wrap justify-center gap-10">
                {
                    categoriesData && categoriesData.map((category) => (
                        <li className="flex flex-col justify-center align-center w-fit"
                            onClick={() => navigate(`/products/?categoryId=${category.id}`)}>
                            <p className="w-fit">{category.name}</p>
                            <img className="w-60" src={category.image} alt={category.name} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;