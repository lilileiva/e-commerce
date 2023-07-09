import { useContext } from "react";
import { CategoriesContext } from "../context/categories/CategoriesContext";
import { useNavigate } from "react-router-dom";


function Categories() {

    const categories = useContext(CategoriesContext);
    const categoriesData = categories?.data
    const navigate = useNavigate()

    return (
        <div>
            <p>Categories</p>
            <ul>
                {
                    categoriesData && categoriesData.map((category) => (
                        <li onClick={() => navigate(`/products/?categoryId=${category.id}`)}>
                            <p>{category.name}</p>
                            <img src={category.image} alt={category.name} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Categories;