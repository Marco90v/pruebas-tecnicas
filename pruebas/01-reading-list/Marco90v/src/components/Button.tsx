import { useContext } from "react";
import { StyleCss, Texto, Types } from "../const"
import { Context } from "../Context/Global";

interface props {
    view: Types.ViewBooks | Types.ViewReading,
    textButton: Texto.TextLibrosButton | Texto.TextLecturaButton
}

function Button( { view, textButton }:props ) {
    const { state, dispatch } = useContext(Context);

    const getColorByView = (view:Types.ViewBooks | Types.ViewReading):string => {
        return state.view === view ? StyleCss.ButtonTextActive : StyleCss.ButtonTextInActive
    }

    const handlerChangeView = (view:Types.ViewBooks | Types.ViewReading) => {
        dispatch({type:Types.ChangeView, payload:{view}})
    }

    return(
        <button
            className= {`btn-base ${getColorByView(view)}`}
            onClick={()=>handlerChangeView(view)}
        >
            {textButton}
        </button>
    )
}
export default Button
export { Button }