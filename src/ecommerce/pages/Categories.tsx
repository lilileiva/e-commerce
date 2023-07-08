import { useContext } from "react";
import { CategoriesContext } from "../context/categories/CategoriesContext";


function Categories() {

    const categories = useContext(CategoriesContext);
    const categoriesData = categories?.data

    return (
        <div>
            <p>Categories</p>
            <ul>
                {
                    categoriesData && categoriesData.map((category) => (
                        <li>
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