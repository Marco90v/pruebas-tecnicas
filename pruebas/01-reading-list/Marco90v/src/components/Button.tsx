import { useContext } from "react";
import { Texto, Types } from "../const"
import { Context } from "../Context/Global";

interface props {
    view: Types.ViewBooks | Types.ViewReading,
    textButton: Texto.TextLibrosButton | Texto.TextLecturaButton
}

function Button( { view, textButton }:props ) {
    const { state, dispatch } = useContext(Context);

    const getColorByView = (view:Types.ViewBooks | Types.ViewReading):string => {
        return state.view === view ? "text-green-400" : "text-slate-200"
    }

    const handlerChangeView = (view:Types.ViewBooks | Types.ViewReading) => {
        dispatch({type:Types.ChangeView, payload:{view}})
    }

    return(
        <button
            className= {`px-4 py-1 bg-slate-800 rounded-md hover:bg-slate-600 transition-all duration-300 ${getColorByView(view)}`}
            onClick={()=>handlerChangeView(view)}
        >
            {textButton}
        </button>
    )
}
export default Button
export { Button }