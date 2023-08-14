import { useContext } from "react";
import { Context } from "../Context/Global";
import { Types } from "../const";

function RangePages() {
    const { state, dispatch } = useContext(Context);

    const handlerChangeRangePages = (e:React.ChangeEvent<HTMLInputElement>) => {
        const numberPages = Number(e.target.value)
        dispatch({type:Types.ChangeNumbersPages, payload:{numberPages}})
    }

    return(
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
    )
}
export default RangePages
export { RangePages }