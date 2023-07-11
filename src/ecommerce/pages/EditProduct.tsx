import { useParams } from "react-router-dom";


function EditProduct() {
    
    const {productId} = useParams()
    
    return (
        <div>Edit product {productId}</div>
    );
}

export default EditProduct;