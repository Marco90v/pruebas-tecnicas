import { useContext } from "react";
import { Context } from "../Context/Global";
import { ActionFunction, Texto, Types } from "../const";
import Reading from "./Reading";
import Button from "./Button";
import TotalBooks from "./TotalBooks";
import { filterByGenre, filterByPages, filterByReading } from "../utils/books";

function Books() {
    const { state, dispatch } = useContext(Context);

    const getBooksByFilter = () => {
        const books:book[] = filterByPages(state.library, state.numberPages)
        const updateBooks:book[] = filterByReading(books, state.reading)
        if(state.filter === Types.All) return updateBooks
        return filterByGenre(updateBooks, state.filter)
    }

    const handlerBookReading = (item:book) => {
        item.reading ?
            dispatch({type:Types.RemoveBookReading, payload:{reading:item}})
            :
            dispatch({type:Types.AddBookReading, payload:{reading:item}})
    }

    const getMarginByView = (): string => {
        return state.view === Types.ViewReading ? "-ml-[100%]" : "m-0"
    }

    const isReading = (HTML:string, reading: boolean | undefined):string => {
        if(HTML==="li"){
            if(reading){
                return "before:w-10 before:h-16 before:border-red-500 before:border-b-transparent before:content-[''] before:absolute before:right-5 before:border-[1.3rem]"
            }else{
                return "group/item hover:scale-110 hover:z-10 hover:rounded-none hover:shadow-2xl hover:shadow-black transition-all duration-500"
            }
        }
        if(HTML==="div"){
            if(reading){
                return "absolute top-0 bottom-0 left-0 right-0 bg-black opacity-50"
            }else{
                return "group-hover/item:inset-0 group-hover/item:opacity-100  absolute top-full bottom-[-18rem] opacity-0 bg-white/80 p-2 flex flex-col gap-2"
            }
        }
        return ""
    }

    return(
        <>
        <section className="col-start-2 col-span-5">
            <header className="flex gap-12 justify-center text-center text-xl font-bold py-5 px-4 border-b-2 border-b-slate-200">
                <Button view={Types.ViewBooks} textButton={Texto.TextLecturaButton}/>
                <Button view={Types.ViewReading} textButton={Texto.TextLecturaButton}/>
            </header>
            <div className="relative flex overflow-hidden">
                <div className={`min-w-full max-w-5xl ${getMarginByView()} transition-all duration-500`}>
                    <TotalBooks TypeOfBooks={ActionFunction.BooksAvailable} />
                    <ul className= {`flex flex-wrap justify-center gap-8 p-8 overflow-auto max-h-[85vh] min-w-full max-w-5xl `} >
                        {
                            getBooksByFilter().map( (item) => {
                                const { title, author, cover, ISBN, genre, pages, synopsis, year } = item.book
                                const { reading } = item
                                return (
                                    <li key={ISBN}
                                        className={`${isReading("li", reading)} cursor-pointer relative overflow-hidden max-w-48 max-h-72 rounded-xl shadow-md`}
                                        onClick={()=>handlerBookReading(item)}
                                    >
                                        <img src={cover} alt={title} loading="lazy"
                                            width={"196.22px"} height={"287.97px"}
                                            className="max-w-48 max-h-72" />
                                        <div className={`${isReading("div", reading)} transition-all duration-500`}>
                                            {
                                                !reading && 
                                                    <>
                                                        <h2 className="font-bold">{`Titulo: ${title}`}</h2>
                                                        <h3 className="text-sm">{author.name}</h3>
                                                        <p className="text-sm">{synopsis}</p>
                                                        <p className="text-sm">{`Paginas: ${pages} - Año: ${year}`}</p>
                                                        <p className="text-sm">{`Categoria: ${genre}`}</p>
                                                    </>
                                            }
                                            
                                        </div>
                                    </li>
                                )
                            } )
                        }
                    </ul>
                </div>

                <div className="min-w-full max-w-5xl">
                    <Reading />
                </div>

            </div>

        </section>
        {/* <Reading /> */}
        </>
    )
}

export default Books
export { Books }