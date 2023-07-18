import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from '../icons/SearchIcon';

function Searchbar() {

    const location = useLocation()
    const navigate = useNavigate()
    const [inputText, setInputText] = useState("");    

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    const handleInputSubmit = (e) => {
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

    return (
        <form className="bg-skyblue px-4 py-2 rounded-xl flex gap-4" onSubmit={(e) => handleInputSubmit(e)}>
            <button type="submit">
                <SearchIcon size='27' />
            </button>
            <input className="bg-skyblue focus:outline-none text-gray-500" type="text" placeholder="Buscar un producto..." onChange={(e) => handleInputChange(e)} />
        </form>
    );
}

export default Searchbar;