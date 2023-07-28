import { useNavigate } from "react-router-dom";
import EditIcon from "../../icons/EditIcon";

function EditButton({ endpoint }) {

    const navigate = useNavigate()

    return (
        <button
            onClick={() => navigate(endpoint)}
            className="text-white pl-[2.5px] bg-turquoise w-6 h-6 rounded-md absolute right-0"
        >
            <EditIcon size='20' />
        </button>
    );
}

export default EditButton;