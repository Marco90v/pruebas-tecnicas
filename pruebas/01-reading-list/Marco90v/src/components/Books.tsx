import { useContext } from "react";
import { Context } from "../Context/Global";
import { ActionFunction, Texto, Types } from "../const";
import Reading from "./Reading";
import Button from "./Button";
import TotalBooks from "./TotalBooks";
import { filterByGenre, filterByPages, filterByReading } from "../utils/books";
import Card from "./Card";

function Books() {
    const { state } = useContext(Context);

    const getBooksByFilter = ():book[] => {
        const books:book[] = filterByPages(state.library, state.numberPages)
        const updateBooks:book[] = filterByReading(books, state.reading)
        if(state.filter === Types.All) return updateBooks
        return filterByGenre(updateBooks, state.filter)
    }

    const getMarginByView = ():string => state.view === Types.ViewReading ? "-ml-[100%]" : "m-0"

    return(
        <section className="col-start-2 col-span-5">
            <header className="header">
                <Button view={Types.ViewBooks} textButton={Texto.TextLecturaButton}/>
                <Button view={Types.ViewReading} textButton={Texto.TextLecturaButton}/>
            </header>
            <div className="relative flex overflow-hidden">
                <div className={`${getMarginByView()} min-w-full max-w-5xl transition-all duration-500`}>
                    <TotalBooks TypeOfBooks={ActionFunction.BooksAvailable} />
                    <ul className= "content-cards" >
                        {
                            getBooksByFilter().map( (item) => <Card key={item.book.ISBN} item={item} /> )
                        }
                    </ul>
                </div>
                <div className="min-w-full max-w-5xl">
                    <Reading />
                </div>
            </div>

        </section>
    )
}

export default Books
export { Books }