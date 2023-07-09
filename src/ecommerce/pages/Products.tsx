import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsContext } from "../context/products/ProductsContext";
import { ProductsProvider } from "../context/products/ProductsProvider";


function Products() {
    const products = useContext(ProductsContext);
    const productsData = products?.data

    return (
        <div>
            <p>Productos</p>
            <ul>
                {
                    productsData && productsData.map((product) => (
                        <li>
                            <p>{product.title}</p>
                            <p>{product.price}</p>
                            <p>{product.description}</p>
                            <img src={product.images[0]} alt={product.title} />
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

function ProductsWrapper() {

    const [param, setParam] = useState(null)
    const [searchParam] = useSearchParams();

    const value = searchParam.get('title');
    
    useEffect(() => {
        if (value) setParam(value)
    }, [value])

    return (
        <ProductsProvider category={param}>
            <Products />
        </ProductsProvider>
    );
}

export default ProductsWrapper;