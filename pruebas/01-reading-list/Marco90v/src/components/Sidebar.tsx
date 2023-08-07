import { useContext } from "react";
import { Context } from "../Context/Global";
import { Types } from "../const";

function Sidebar() {
    const { state, dispatch } = useContext(Context);

    const changeCategoryFilter = (category:string) => {
        dispatch({type:Types.changeCategoryFilter, payload:{filter:category}})
    }

    const handlerChangeRangePages = (e:React.ChangeEvent<HTMLInputElement>) => {
        const numberPages = Number(e.target.value)
        dispatch({type:Types.ChangeNumbersPages, payload:{numberPages}})
    }
    
    return(
        <nav className="border-r-2 border-r-slate-200">
            <h1 className="text-center py-6 border-b-2 border-b-slate-200 text-lg font-black text-slate-600">Libros Digitales</h1>
            <div className="my-2 mb-4" >
                <p className="text-center text-sm py-2 text-slate-600">Numbero de Paginas</p>
                <div className="flex gap-1 justify-center">
                    <input
                        type="range" min={10} max={2000} step={10}
                        className="w-24"
                        value={state.numberPages}
                        onChange={handlerChangeRangePages}
                    />
                    <input
                        type="number" min={10} max={2000} step={10}
                        className="w-16 ml-2 border-2 border-slate-200"
                        value={state.numberPages}
                        onChange={handlerChangeRangePages}
                    />
                </div>
            </div>
            <ul className="flex flex-col justify-center">
                {
                    state.genre.map( ({genre, quantity})=> {
                        return(
                            <li
                                onClick={()=>changeCategoryFilter(genre)}
                                className="cursor-pointer pl-4 py-2 font-bold text-slate-500 transition-all duration-300 hover:bg-slate-300 hover:text-white"
                                key={genre}
                            >
                                {genre}
                                <span className="text-[10px] inline-flex items-center justify-center px-1 ml-2 rounded-full text-blue-800 bg-blue-200">{quantity}</span>
                            </li> 
                        )
                    })
                }
            </ul>
        </nav>
    )
}
export default Sidebar