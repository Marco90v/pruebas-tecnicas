import { useContext, useEffect, useState } from "react";
import { Context } from "../Context/Global";
import { Types } from "../const";

function Sidebar() {
    const { state, dispatch } = useContext(Context);
    const [categorys, setCategorys] = useState<string[]>([])
    useEffect(() => {
        if(state.library.length > 0){
            const getData:string[] = state.library.reduce(getCategorys,[])
            setCategorys(getData);
        }
    }, [state])

    const getCategorys = (prev:string[],next:book):string[] => {
        const genre = next.book.genre;
        const exist = prev.find(g => g === genre)
        if(!exist) prev.push(genre)
        return prev
    }

    const changeCategoryFilter = (category:string) => {
        // console.log(category)
        // dispatch({type:Types.changeCategoryFilter, filter:category})
        dispatch({type:Types.changeCategoryFilter, payload:{filter:category}})
    }
    
    return(
        <nav className="border-r-2 border-r-slate-200">
            <ul className="py-8 flex flex-col justify-center">
                <li
                    onClick={()=>changeCategoryFilter("All")}
                    className="cursor-pointer px-6 py-2 font-bold text-slate-500 transition-all duration-300 hover:bg-slate-300 hover:text-white"
                    key={"All"}>All</li>
                {
                    categorys.map( (category)=>
                        <li
                            onClick={()=>changeCategoryFilter(category)}
                            className="cursor-pointer px-6 py-2 font-bold text-slate-500 transition-all duration-300 hover:bg-slate-300 hover:text-white"
                            key={category}>{category}</li> )
                }
            </ul>
        </nav>
    )
}
export default Sidebar