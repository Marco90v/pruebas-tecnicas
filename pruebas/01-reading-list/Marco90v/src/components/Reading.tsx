import { useContext } from "react";
import { Context } from "../Context/Global";
import { Types } from "../const";

function Reading() {
    const { state, dispatch } = useContext(Context);

    const removeBookReading = (item:book) => {
        // console.log(item)
        dispatch({type:Types.RemoveBookReading, payload:{reading:item}})
    }

    return(
        <ul className="overflow-auto max-h-[93vh]" >
            {
                state.reading.map(item=>{
                    const { title, author, cover, ISBN, genre, pages, synopsis, year } = item.book

                    return(
                        <li key={ISBN}
                            className="group/item cursor-pointer relative overflow-hidden hover:>div>top-0"
                            onClick={()=>removeBookReading(item)}
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
                })
            }
        </ul>
    )
}
export default Reading
export { Reading }