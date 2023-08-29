import { useState } from "react";
import { checkAvailableEmail, createUser } from "../services/user"
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { IS_AVAILABLE_QUERY_KEY } from "../constants";
import { validateRegister } from "../utils/validations";

import Loader from "../components/Loader";
import CustomButton from "../components/CustomButton";

function Register() {

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")
    const [error, setError] = useState(null);
    const [inputErrors, setInputErrors] = useState({})
    const [isRegistered, setIsRegistered] = useState(false)
    const token = window.localStorage.getItem("token");

    const { data, status } = useQuery([IS_AVAILABLE_QUERY_KEY, { email }], () => checkAvailableEmail({ email }), { retry: 10 })

    const handleInputChange = (e) => {
        if (e.target.name === "name") {
            validateRegister(e, data, status, inputErrors, setInputErrors)
            setName(e.target.value);
        }
        if (e.target.name === "email") {
            validateRegister(e, data, status, inputErrors, setInputErrors)
            setEmail(e.target.value);
        }
        if (e.target.name === "password") {
            validateRegister(e, data, status, inputErrors, setInputErrors)
            setPassword(e.target.value);
        }
    }

    const register = async () => {
        try {
            const response = await createUser({ name, email, password })
            if (response != undefined && response.status === 201) {
                setMessage("Cuenta creada exitosamente. Inicie sesión.")
                setIsRegistered(false)
            } else {
                setIsRegistered(false)
                setError("Could not sign up. Verify data is valid.")
            }
        } catch (error) {
            setIsRegistered(false)
            setError(error.toString());
        }
    }

    const handleInputSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(inputErrors).length === 0) {
            setIsRegistered(true)
            register();
        }
    }

    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center w-80 h-fit py-6 shadow shadow-md rounded-md">
                {
                    token ? <div className="px-6 flex flex-col items-center">
                        <p className="text-center mb-2">You cannot sign up because you are already logged in.</p>
                        <CustomButton width="56" text="Go to home" bgColor="turquoise" textColor="white" borderColor="turquoise" onClick={() => navigate("/")} />
                    </div> : <>
                        <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                            Create account
                        </h2>
                        <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-72 h-fit">
                            <div className="flex flex-col mb-8">
                                <label htmlFor="name" className="text-gray-500 font-light text-md text-left">Nombre</label>
                                <input
                                    required
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                                    name="name"
                                    type="text"
                                    onChange={(e) => handleInputChange(e)}
                                />
                                {inputErrors["name"] && <p className="text-turquoise text-sm text-center w-72 absolute mt-14">{inputErrors["name"]}</p>}
                            </div>
                            <div className="flex flex-col mb-8">
                                <label htmlFor="email" className="text-gray-500 font-light text-md text-left">
                                    Email
                                </label>
                                <input
                                    required
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                                    name="email"
                                    type="text"
                                    onChange={(e) => handleInputChange(e)}
                                />
                                {inputErrors["email"] && <p className="text-turquoise text-sm text-center w-72 absolute mt-14">{inputErrors["email"]}</p>}
                            </div>
                            <div className="flex flex-col mb-8">
                                <label htmlFor="password" className="text-gray-500 font-light text-md text-left">
                                    Password
                                </label>
                                <input
                                    required
                                    className="border-[1px] border-gray-200 pl-2 rounded-md hover:border-strong-skyblue focus:border-strong-skyblue focus:outline-none"
                                    name="password"
                                    type="password"
                                    onChange={(e) => handleInputChange(e)}
                                />
                                {inputErrors["password"] && <p className="text-turquoise text-sm text-center w-72 absolute mt-14">{inputErrors["password"]}</p>}
                            </div>
                            <button
                                type="submit"
                                className="text-white p-2 mt-4 rounded-md bg-turquoise cursor-pointer border-[1px] hover:bg-white hover:border-turquoise hover:text-turquoise transition duration-150 ease-out hover:ease-in"
                            >
                                {isRegistered ? <Loader /> : "Sign up"}
                            </button>
                        </form>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-turquoise w-72 mt-2 border-[1px] border-turquoise p-2 rounded-md bg-white cursor-pointer hover:bg-turquoise hover:text-white transition duration-150 ease-out hover:ease-in">
                            Sign in
                        </button>
                        {message && <p className="mt-4 text-green-500 font-semibold text-center w-72">{message}</p>}
                        {error && <p className="mt-4 text-gray-500 text-center w-72">{error}</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default Register;