import { useQuery, useQueryClient } from "react-query";
import { USERS_QUERY_KEY } from "../constants";
import { getUser } from "../services/user";
import camera from "../../assets/camera-img.png";
import { useNavigate } from "react-router";
import CustomButton from "../components/CustomButton";
import Loader from "../components/Loader";

function UserDetails() {

    const navigate = useNavigate()
    const email = window.localStorage.getItem("userEmail");
    const token = window.localStorage.getItem("token");
    const queryClient = useQueryClient();

    const { data, status } = useQuery([USERS_QUERY_KEY, { email }], () => getUser({ email }))

    const closeSession = () => {
        window.localStorage.clear();
        queryClient.invalidateQueries([USERS_QUERY_KEY, { email }]);
        navigate("/");
    }

    return (
        <div className="flex flex-col items-center">
            <div className="w-96 flex flex-col justify-center items-center shadow-md rounded-md p-8">
                {data && status === 'success' && token && <>
                    <h2 className="text-2xl font-bold mb-4 text-gray-500">User details</h2>
                    <p className="text-gray-800">Email: {data.email}</p>
                    <p className="text-gray-800">Name: {data.name}</p>
                    <img
                        className="my-2 object-cover w-52 h-52 rounded-md"
                        src={data.avatar}
                        alt="avatar"
                        onError={(e) => { e.target["src"] = camera }}
                    />
                    <p className="text-gray-500 mb-4">Rol: {data.role}</p>
                    <CustomButton width="56" text="Products cart" bgColor="turquoise" textColor="white" borderColor="turquoise" onClick={() => navigate("/cart-detail")} />
                    <CustomButton width="56" text="Sign out" bgColor="white" textColor="turquoise" borderColor="turquoise" onClick={() => closeSession()} />
                </>}
                {status === 'loading' && <Loader />}   
                {status === 'success' && !token && <>
                    <p>Parece que no has ingresado aún...</p>
                    <CustomButton width="56" text="Sign in" bgColor="turquoise" textColor="white" borderColor="turquoise" onClick={() => navigate("/login")} />
                </>}
            </div>
        </div>
    );
}

export default UserDetails;