import { useContext } from "react";
import GlobalStateContext from "../context/globalStateContext";
import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

function Paging({ listLength, elementsPerPage }) {

    const { state, dispatch } = useContext(GlobalStateContext);    
    const currentPage = state.currentPage
    const pages = []

    const createPages = (pages) => {
        for (let i = 1; i <= Math.ceil(listLength / elementsPerPage); i++) {
            pages.push(i);
        };
    }
    createPages(pages)

    const setPageTo = (page) => {
        dispatch({ type: 'SET_PAGE', payload: page });
    }

    const getPrevious = () => {
        if (currentPage > 1) setPageTo(currentPage - 1 );
        window.scrollTo(0, 0);
    }

    const getNext = (pages) => {
        if (currentPage < pages.length) setPageTo(currentPage + 1 );
        window.scrollTo(0, 0);
    }

    const setPageNumber = (page) => {
        setPageTo(page)
        window.scrollTo(0, 0);
    }

    let pagesSlice = pages.slice(0, 6)
    if (currentPage >= 3 && currentPage <= (pages.length - 3)) pagesSlice = pages.slice(currentPage - 3, currentPage + 3)
    if (currentPage > (pages.length - 3)) pagesSlice = pages.slice(pages.length - 6, pages.length + 3)

    return (
        <>
            {
                pages.length > 1 && (
                    <div className="mt-10">
                        <div className='w-fit flex flex-row gap-4'>
                            <button className="p-2 bg-gray-100 hover:bg-gray-300 rounded-md duration-200" onClick={() => getPrevious()}>
                                <LeftArrowIcon size='20' color="#1ABCFE" />
                            </button>
                            {pagesSlice.map(page => (
                                <a className={
                                    `hover:bg-gray-300 w-8 rounded-md flex justify-center items-center cursor-pointer duration-200 ${currentPage === page ? "bg-gray-300" : "bg-gray-100"}`
                                }
                                    key={page}
                                    onClick={() => setPageNumber(page)}>{page}</a>
                            ))}
                            <button className="p-2 bg-gray-100 hover:bg-gray-300 rounded-md duration-200" onClick={() => getNext(pages)}>
                                <RightArrowIcon size='20' color="#1ABCFE" />
                            </button>
                        </div>
                    </div >
                )
            }
        </>
    );
}

export default Paging;