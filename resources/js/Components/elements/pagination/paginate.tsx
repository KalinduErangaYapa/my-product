import ReactPaginate from 'react-paginate'

export default function SimplePagination({
    total,
    perPage,
    page,
    handlePageClick,
}: any) {
    const pages = Math.ceil(total / perPage)
    return (
        <>
            {total > 0 && (
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="Next"
                    forcePage={page - 1}
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={2}
                    pageCount={pages}
                    previousLabel="Previous"
                    className="flex flex-wrap items-center justify-center gap-2"
                    pageLinkClassName="cursor-pointer border border-primary hover:bg-primary/80 text-black flex items-center text-[14px] px-5 py-2 rounded-md"
                    disabledLinkClassName="disabled cursor-not-allowed bg-primary/80 text-gray-700 hover:text-gray-700 cursor-default"
                    activeLinkClassName="bg-primary text-black border-primary"
                    nextLinkClassName="cursor-pointer bg-primary hover:bg-primary/80 hover:text-black text-black flex items-center text-[14px] px-5 py-2 rounded-md"
                    previousLinkClassName="cursor-pointer bg-primary hover:bg-primary/80 hover:text-black text-black flex items-center text-[14px] px-5 py-2 rounded-md"
                // renderOnZeroPageCount={false}
                />
            )}
        </>
    )
}
