import { useQuery } from "react-query";
import { USERS_QUERY_KEY } from "../constants";
import { getUser } from "../services/user";
import camera from "../../assets/camera-img.png";
import { useNavigate } from "react-router";

function UserDetails() {

    const navigate = useNavigate()
    const email = window.localStorage.getItem("userEmail")

    const { data, status } = useQuery([USERS_QUERY_KEY, { email }], () => getUser({ email }))

    return (
        <div>
            {
                data && status === 'success' && <>
                    <p>{data.email}</p>
                    <p>{data.name}</p>
                    <p>{data.role}</p>
                    <img
                        className="object-cover w-52 h-52"
                        src={data.avatar}
                        alt="avatar"
                        onError={(e) => { e.target.src = camera }}
                    />                    
                </>
            }

        </div>
    );
}

export default UserDetails;