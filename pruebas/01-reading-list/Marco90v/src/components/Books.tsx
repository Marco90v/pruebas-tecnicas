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
        // const newLibrary = state.library.filter( (book:book) => filterBookReading(book) )
        const newLibrary = state.library.map( (book:book) => {
            return state.reading.find( b => b.book.ISBN === book.book.ISBN) ? {...book, reading:true} : book
        } )
        if(state.filter === Types.All) return newLibrary
        return newLibrary.filter( (book:book) => book.book.genre === state.filter )

        // if(state.filter === Types.All) return state.library.filter( (book:book) => filterBookReading(book) )
        // return state.library.filter( (book:book) => book.book.genre === state.filter ).filter( (book:book) => filterBookReading(book) )
    }

    const handlerBookReading = (item:book) => {
        item.reading ?
            dispatch({type:Types.RemoveBookReading, payload:{reading:item}})
            :
            dispatch({type:Types.AddBookReading, payload:{reading:item}})
    }

    const handlerChangeView = (view:Types.ViewBooks | Types.ViewReading) => {
        dispatch({type:Types.ChangeView, payload:{view}})
    }

    const getMarginByView = (): string => {
        return state.view === Types.ViewReading ? "-ml-[100%]" : "m-0"
    }
    const getColorByView = (view:Types.ViewBooks | Types.ViewReading):string => {
        return state.view === view ? "text-green-400" : "text-slate-200"

    }

    const isReading = (HTML:string, reading: boolean | undefined):string => {
        if(HTML==="li" && !reading){
            return "group/item hover:scale-110 hover:z-10 hover:rounded-none hover:shadow-2xl hover:shadow-black transition-all duration-500"
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
                <button className= {`px-4 py-1 bg-slate-800 rounded-md hover:bg-slate-600 transition-all duration-300 ${getColorByView(Types.ViewBooks)}`}
                    onClick={()=>handlerChangeView(Types.ViewBooks)}
                >Libros</button>
                <button className= {`px-4 py-1 bg-slate-800 rounded-md hover:bg-slate-600 transition-all duration-300 ${getColorByView(Types.ViewReading)}`}
                    onClick={()=>handlerChangeView(Types.ViewReading)}
                >Lectura</button>
            </header>
            <div className="relative flex overflow-hidden">
                <ul className= {`flex flex-wrap justify-center gap-8 p-8 overflow-auto max-h-[85vh] min-w-full max-w-5xl ${getMarginByView()} transition-all duration-500`} >
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

                <Reading />

            </div>

        </section>
        {/* <Reading /> */}
        </>
    )
}

export default Books
export { Books }