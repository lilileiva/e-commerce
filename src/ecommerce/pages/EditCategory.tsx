import { useParams } from "react-router";

function EditCategory() {

    const { categoryId } = useParams();

    return (
        <div>Edit category {categoryId}</div>
    );
}

export default EditCategory;