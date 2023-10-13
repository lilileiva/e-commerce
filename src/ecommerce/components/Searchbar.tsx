import { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from '../icons/SearchIcon';
import GlobalStateContext from "../context/globalStateContext";

function Searchbar({search, setSearch}) {

    const location = useLocation()
    const navigate = useNavigate()
    const [inputText, setInputText] = useState("");

    const { dispatch } = useContext(GlobalStateContext);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    const handleInputSubmit = (e) => {
        dispatch({ type: 'SET_PAGE', payload: 1 });
        e.preventDefault();
        if (location.search) {
            let found = false
            const search = location.search
            let splited = search.split('&')
            splited.map((item, index) => {
                if (item.split('=')[0] === 'title') {
                    splited[index] = `title=${inputText}`
                    found = true
                }
            })
            if (!found) splited.push(`title=${inputText}`)
            navigate(`products/${splited.join('&')}`)
        } else {
            navigate(`products/?&title=${inputText}`);
        }
    }
    console.log(search)
    return (
        <form className={
            `bg-skyblue px-4 py-2 rounded-xl flex lg:gap-4 md:gap-4 ease-in-out duration-500 overflow-hidden ${search ? "lg:w-52 md:w-52 w-full" : "lg:w-32 md:w-32 w-14"} `
        }
            onSubmit={(e) => handleInputSubmit(e)}
            onClick={() => setSearch(true)}
        >
            {search ? (
                <button type="submit" onSubmit={() => setSearch(false)}>
                    <SearchIcon size='27' />
                </button>
            ) : (
                <button onClick={() => setSearch(true)}>
                    <SearchIcon size='27' />
                </button>
            )}
            <input
                type="text"
                placeholder="Search product..."
                className="bg-skyblue text-gray-500 outline-none overflow-hidden focus:outline-none focus:w-full"
                onChange={(e) => handleInputChange(e)}
            />
        </form>
    );
}

export default Searchbar;