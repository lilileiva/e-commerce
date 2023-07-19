import { useNavigate } from "react-router";

function CreateProduct() {

    const navigate = useNavigate()

    return (
        <div className="h-80 w-80 flex flex-col justify-top align-left shadow shadow-slate-300 rounded-md p-4 h-fit duration-150 my-4">
            Creat products
        </div>
    );
}

export default CreateProduct;