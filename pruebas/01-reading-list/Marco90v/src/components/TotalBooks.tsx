import { useContext } from "react";
import { Context } from "../Context/Global";
import { ActionFunction, Texto } from "../const";
import { booksAvailable, booksReading } from "../utils/books";

interface props {
    TypeOfBooks: ActionFunction.BooksAvailable | ActionFunction.BooksReading
}

const Available = {
    [ActionFunction.BooksAvailable]:booksAvailable,
    [ActionFunction.BooksReading]:booksReading
}

function TotalBooks( {TypeOfBooks}:props ) {
    const { state } = useContext(Context);

    return(
        <p className="block text-center mt-4">
            { Texto[TypeOfBooks] }
            <span className="bg-blue-400 text-blue-800 font-black text-sm ml-2 p-1 rounded-full">
                { Available[TypeOfBooks](state) }
            </span>
        </p>
    )
}
export default TotalBooks
export { TotalBooks }