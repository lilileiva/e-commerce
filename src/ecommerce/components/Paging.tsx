import LeftArrowIcon from "../icons/LeftArrowIcon";
import RightArrowIcon from "../icons/RightArrowIcon";

function Paging({ listLength, page, elementsPerPage, setPage, setPageTo }) {

    const currentPage = page
    const pages = []

    const createPages = (pages) => {
        for (let i = 1; i <= Math.ceil(listLength / elementsPerPage); i++) {
            pages.push(i);
        };
    }
    createPages(pages)

    const getPrevious = () => {
        if (page > 1) setPage(page - 1)
        window.scrollTo(0, 0);
    }

    const getNext = (pages) => {
        if (page < pages.length) setPage(page + 1)
        window.scrollTo(0, 0);
    }

    const setPageNumber = (page) => {
        setPageTo(page)
        window.scrollTo(0, 0);
    }

    let pagesSlice = pages.slice(0, 6)
    if (page >= 3 && page <= (pages.length - 3)) pagesSlice = pages.slice(page - 3, page + 3)
    if (page > (pages.length - 3)) pagesSlice = pages.slice(pages.length - 6, pages.length + 3)

    return (
        <>
            {
                pages.length > 1 && (
                    <div className="mt-10">
                        <div className='w-fit flex flex-row gap-4'>
                            <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md duration-200" onClick={() => getPrevious()}>
                                <LeftArrowIcon size='20' />
                            </button>
                            {pagesSlice.map(page => (
                                <a className={
                                    `hover:bg-gray-300 w-8 rounded-md flex justify-center items-center cursor-pointer duration-200 ${currentPage === page ? "bg-gray-400" : "bg-gray-200"}`
                                }
                                    key={page}
                                    onClick={() => setPageNumber(page)}>{page}</a>
                            ))}
                            <button className="p-2 bg-gray-200 hover:bg-gray-300 rounded-md duration-200" onClick={() => getNext(pages)}>
                                <RightArrowIcon size='20' />
                            </button>
                        </div>
                    </div >
                )
            }
        </>
    );
}

export default Paging;