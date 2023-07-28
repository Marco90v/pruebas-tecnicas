import { useContext } from "react";
import { Context } from "../Context/Global";
import { Types } from "../const";

function Books() {
    const { state } = useContext(Context);

    const getBooksByFilter = () => {
        if(state.filter === Types.All) return state.library
        return state.library.filter( (book:book) => book.book.genre === state.filter )
    }

    return(
        <ul className="col-span-5 flex flex-wrap justify-center gap-8 p-8 overflow-auto max-h-[93vh]">
            {
                getBooksByFilter().map( (item) => {
                    const { title, author, cover, ISBN, genre, pages, synopsis, year } = item.book
                    return (
                        <li key={ISBN} className="cursor-pointer ">
                            <img src={cover} alt={title} className="max-w-48 max-h-72" />
                        </li>
                    )
                } )
            }
        </ul>
    )
}

export default Books
export { Books }