import { useContext } from "react";
import { Context } from "../Context/Global";
import { Types } from "../const";

interface props {
    item: book,
    remove?: boolean
}
function Card({item, remove=false}:props) {
    const { dispatch } = useContext(Context);

    const { title, author, cover, ISBN, genre, pages, synopsis, year } = item.book
    const { reading } = item

    const isReading = (reading: boolean | undefined):string => reading ? "card-reading" : "group/item card-not-reading"

    const handlerBookReading = (item:book, remove:boolean) => {
        if(remove){
            dispatch({type:Types.RemoveBookReading, payload:{reading:item}})
        }else{
            item.reading ? dispatch({type:Types.RemoveBookReading, payload:{reading:item}}) : dispatch({type:Types.AddBookReading, payload:{reading:item}})
        }
    }

    return(
        <li key={ISBN}
            className={`${isReading(reading)} card`}
            onClick={()=>handlerBookReading(item, remove)}
        >
            <img src={cover} alt={title} loading="lazy"
                width={"196.22px"} height={"287.97px"}
                className="max-w-[13rem] max-h-72 bg-slate-400" />
            {
                reading ? 
                    <div className="card-details-reading"></div>
                    :
                    <div className="card-details">
                        <>
                            <h2 className="font-bold">{`Titulo: ${title}`}</h2>
                            <h3 className="text-sm">{author.name}</h3>
                            <p className="text-sm">{synopsis}</p>
                            <p className="text-sm">{`Paginas: ${pages} - Año: ${year}`}</p>
                            <p className="text-sm">{`Categoria: ${genre}`}</p>
                        </>
                    </div>
            }
        </li>
    )
}
export default Card
export { Card }