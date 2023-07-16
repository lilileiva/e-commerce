import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/user";
import Loader from "../components/Loader";

function Login() {

    const navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLogged, setIsLogged] = useState(false)
    const token = window.localStorage.getItem("token");

    const handleInputChange = (e) => {
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    }

    const login = async () => {
        try {
            let response = await loginUser({ email, password })
            if (response != undefined && response.status === 201) {
                response = await response.json()
                const token = await response["access_token"];                
                window.localStorage.setItem("token", token);
                navigate("/");
            } else {
                setIsLogged(false)                
                setError("No se pudo iniciar sesión. Verifique que los datos ingresados sean correctos.")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleInputSubmit = (e) => {
        e.preventDefault();
        setIsLogged(true)
        login();
    }

    return (
        <div className="mt-4 flex flex-col justify-top items-center h-full">
            <div className="flex flex-col justify-center items-center w-72 h-fit py-6 shadow shadow-slate-300 rounded-md">
                {
                    token ? <>
                        <p>Ya has iniciado sesión</p>
                        <button
                            onClick={() => navigate("/")}
                            className="text-white p-2 w-56 mt-2 rounded-md bg-turquoise cursor-pointer hover:bg-white hover:border-[1px] hover:border-turquoise hover:text-turquoise transition duration-150 ease-out hover:ease-in">
                            Ir a la página principal
                        </button>
                    </> : <>
                        <h2 className="mb-6 text-gray-500 font-semibold text-lg text-left">
                            Iniciá sesión
                        </h2>
                        <form onSubmit={(e) => handleInputSubmit(e)} className="flex flex-col justify-center align-center w-56 h-fit">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="email">Email</label>
                                <input
                                    className="border-[1px] border-gray-200 focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    required name="email" type="text" onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label htmlFor="password">Password</label>
                                <input
                                    className="border-[1px] border-gray-200 focus:border-[1px] focus:border-strong-skyblue focus:outline-none"
                                    required name="password" type="password" onChange={(e) => handleInputChange(e)}
                                />
                            </div>
                            <button
                                type="submit"                                
                                className="text-turquoise w-56 mt-2 border-[1px] border-turquoise p-2 rounded-md bg-white cursor-pointer hover:bg-turquoise hover:text-white transition duration-150 ease-out hover:ease-in"
                            >
                                {isLogged ? <Loader /> : "Iniciar sesión"}
                            </button>                                                            
                        </form>
                        <button
                            onClick={() => navigate("/register")}
                            className="text-white p-2 w-56 mt-2 rounded-md bg-turquoise cursor-pointer hover:bg-white hover:border-[1px] hover:border-turquoise hover:text-turquoise transition duration-150 ease-out hover:ease-in">
                            Registrarse
                        </button>
                        {error && <p className="mt-4 text-gray-500 text-center w-52">{error}</p>}
                    </>
                }
            </div>
        </div>
    );
}

export default Login;