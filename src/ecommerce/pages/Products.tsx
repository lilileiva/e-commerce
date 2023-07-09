import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsContext } from "../context/products/ProductsContext";
import { ProductsProvider } from "../context/products/ProductsProvider";
import { useNavigate } from "react-router-dom";


function Products() {
    const products = useContext(ProductsContext);
    const productsData = products?.data
    const navigate = useNavigate()

    return (
        <div className="p-10 flex flex-col justify-center align-center">
            <p className="text-lg w-fit">Productos</p>
            <ul className="w-fit flex flex-wrap justify-center gap-10">
                {
                    productsData && productsData.map((product) => (
                        <li className="flex flex-col justify-center align-center w-fit"
                            onClick={() => navigate(`/products/${product.id}`)}>
                            <p className="w-fit">{product.title}</p>
                            <p className="w-fit">{product.price}</p>
                            <img className="w-60" src={product.images[0]} alt={product.title} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

function ProductsWrapper() {

    const [searchParam] = useSearchParams();
    const categoryId = searchParam.get('categoryId');

    return (
        <ProductsProvider categoryId={categoryId}>
            <Products />
        </ProductsProvider>
    );
}

export default ProductsWrapper;