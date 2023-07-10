import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductsContext } from "../context/products/ProductsContext";
import { ProductsProvider } from "../context/products/ProductsProvider";
import { useNavigate } from "react-router-dom";


function Products() {
    const products = useContext(ProductsContext);
    const productsData = products?.data
    const navigate = useNavigate()

    return (        
        <div className="py-5 flex flex-col justify-center content-center">
            <p className="inline-flex text-xl w-fit text-gray-500 font-medium border-b-2 border-skyblue rounded-b-sm py-1 h-fit">
                Todos los
                <p className="text-transparent">-</p>
                <p className="text-skyblue">productos</p>
            </p>
            <ul className="flex flex-wrap justify-center gap-10 mt-10 h-full">
                {
                    productsData ? productsData.map((product) => (
                        <li className="flex flex-col justify-center align-center w-fit rounded-xl border-white overflow-hidden shadow cursor-pointer"
                            onClick={() => navigate(`/products/${product.id}`)}>                            
                            <div className="w-52 h-52">                                
                                <img className="w-52" src={product.images[0]} alt={product.title} />
                            </div>
                            <p className="w-full z-10 bg-white pl-2 text-gray-800 capitalize">{product.title}</p>                            
                            <p className="w-full z-10 bg-white pl-2 font-semibold text-gray-600">${product.price}</p>
                        </li>
                    )) : <p className="">Cargando...</p>
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