import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SearchIcon from '../icons/SearchIcon';

function Searchbar({setPage}) {

    const location = useLocation()
    const navigate = useNavigate()
    const [inputText, setInputText] = useState("");
    const [search, setSearch] = useState(false);

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    }

    const handleInputSubmit = (e) => {
        setPage(1)
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
        <form className="bg-skyblue px-4 py-2 rounded-xl flex lg:gap-4 md:gap-4 w-fit"
            onSubmit={(e) => handleInputSubmit(e)}
        >
            {search ? (
                <button type="submit" onSubmit={() => setSearch(false)} onClick={() => setSearch(false)}>
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
                className={
                    search
                        ? "bg-skyblue w-14 text-gray-500 ease-in-out duration-500 outline-none focus:outline-none focus:w-full"
                        : "bg-skyblue lg:w-14 md:w-14 w-0 text-gray-500 ease-in-out duration-500 overflow-hidden outline-none focus:outline-none focus:w-full"
                }
                onChange={(e) => handleInputChange(e)}
            />
        </form>
    );
}

export default Searchbar;