import { useState } from "react";
import { checkAvailableEmail, createUser } from "../services/user"
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useQuery } from "react-query";
import { IS_AVAILABLE_QUERY_KEY } from "../constants";

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

    const { data, status } = useQuery([IS_AVAILABLE_QUERY_KEY, { email }], () => checkAvailableEmail({ email }), {retry: 10})

    const validate = (e) => {
        if (e.target.name === "name") {
            if (!e.target.value.match(/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/)) {
                setInputErrors({ ...inputErrors, name: "El nombre no es válido." })
            } else {
                delete inputErrors["name"]
            }
        }
        if (e.target.name === "email") {
            if (!e.target.value.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i)) {
                return setInputErrors({ ...inputErrors, email: "El correo electrónico no es válido." })
            }            
            if (data && status === "success" && data["isAvailable"] === false) {             
                return setInputErrors({ ...inputErrors, email: "El correo electrónico ya está en uso." })
            } else {
                delete inputErrors["email"]
            }
        }
        if (e.target.name === "password") {
            if (e.target.value.length < 4) {
                setInputErrors({ ...inputErrors, password: "La contraseña debe tener al menos 4 caracteres." })
            } else {
                delete inputErrors["password"]
            }
        }
    }

    const handleInputChange = (e) => {
        if (e.target.name === "name") {
            validate(e)
            setName(e.target.value);
        }
        if (e.target.name === "email") {
            validate(e)
            setEmail(e.target.value);
        }
        if (e.target.name === "password") {
            validate(e)
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
                setError("No se pudo registrar la cuenta. Verifique que los datos ingresados sean correctos.")
            }
        } catch (error) {
            console.log(error)
            setIsRegistered(false)
            setError(error);
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
            <div className="flex flex-col justify-center items-center w-80 h-fit py-6 shadow shadow-slate-300 rounded-md">
                {
                    token ? <>
                        <p>No podés registrarte ni loguearte porque has iniciado sesión</p>
                        <button
                            onClick={() => navigate("/")}
                            className="text-white p-2 w-56 mt-2 rounded-md bg-turquoise cursor-pointer hover:bg-white hover:border-[1px] hover:border-turquoise hover:text-turquoise transition duration-150 ease-out hover:ease-in">
                            Ir a la página principal
                        </button>
                    </> : <>
                        <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                            Crea tu cuenta
                        </h2>
                        <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-72 h-fit">
                            <div className="flex flex-col mb-8">
                                <label htmlFor="name" className="text-gray-500 font-light text-md text-left">Name</label>
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
                                <label htmlFor="email" className="text-gray-500 font-light text-md text-left">Email</label>
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
                                <label htmlFor="password" className="text-gray-500 font-light text-md text-left">Password</label>
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
                                {isRegistered ? <Loader /> : "Registrarse"}
                            </button>
                        </form>
                        <button
                            onClick={() => navigate("/login")}
                            className="text-turquoise w-72 mt-2 border-[1px] border-turquoise p-2 rounded-md bg-white cursor-pointer hover:bg-turquoise hover:text-white transition duration-150 ease-out hover:ease-in">
                            Iniciar sesión
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