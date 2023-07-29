import { useContext } from "react";
import { Context } from "../Context/Global";
import { Types } from "../const";
import Reading from "./Reading";

function Books() {
    const { state, dispatch } = useContext(Context);
    // console.log(state)

    const filterBookReading = (item:book) => {
        return !state.reading.find( (book:book) => book.book.ISBN === item.book.ISBN )
    }

    const getBooksByFilter = () => {
        const newLibrary = state.library.filter( (book:book) => filterBookReading(book) )
        if(state.filter === Types.All) return newLibrary
        return newLibrary.filter( (book:book) => book.book.genre === state.filter )

        // if(state.filter === Types.All) return state.library.filter( (book:book) => filterBookReading(book) )
        // return state.library.filter( (book:book) => book.book.genre === state.filter ).filter( (book:book) => filterBookReading(book) )
    }

    const addBookReading = (item:book) => {
        dispatch({type:Types.AddBookReading, payload:{reading:item}})
    }

    const handlerColSpan = () => {
        return state.reading.length > 0 ? "col-span-4" : "col-span-5"
    }

    return(
        <>
            <ul className={`${handlerColSpan()} flex flex-wrap justify-center gap-8 p-8 overflow-auto max-h-[93vh]`}>
                {
                    getBooksByFilter().map( (item) => {
                        const { title, author, cover, ISBN, genre, pages, synopsis, year } = item.book
                        return (
                            <li key={ISBN}
                                className="group/item cursor-pointer relative overflow-hidden hover:>div>top-0 max-w-48 max-h-72"
                                onClick={()=>addBookReading(item)}
                            >
                                <img src={cover} alt={title} loading="lazy"
                                    width={"196.22px"} height={"287.97px"}
                                    className="max-w-48 max-h-72" />
                                <div className="group-hover/item:inset-0 group-hover/item:opacity-100 transition-all duration-500 absolute top-full bottom-[-18rem] opacity-0 bg-white/80 p-2 flex flex-col gap-2">
                                    <h2 className="font-bold">{`Titulo: ${title}`}</h2>
                                    <h3 className="text-sm">{author.name}</h3>
                                    <p className="text-sm">{synopsis}</p>
                                    <p className="text-sm">{`Paginas: ${pages} - Año: ${year}`}</p>
                                    <p className="text-sm">{`Categoria: ${genre}`}</p>
                                </div>
                            </li>
                        )
                    } )
                }
            </ul>
            <Reading />
        </>
    )
}

export default Books
export { Books }