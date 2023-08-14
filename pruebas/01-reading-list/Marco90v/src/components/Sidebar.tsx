import { useContext } from "react";
import { Context } from "../Context/Global";
import RangePages from "./RangePages";
import ButtonGenre from "./ButtonGenre";

function Sidebar() {
    const { state } = useContext(Context);
    
    return(
        <nav className="border-r-2 border-r-slate-200">
            <h1 className="title">Libros Digitales</h1>
            <RangePages />
            <ul className="flex flex-col justify-center">
                {
                    state.genre.map( ({genre, quantity}) => <ButtonGenre key={genre} genre={genre} quantity={quantity} /> )
                }
            </ul>
        </nav>
    )
}
export default Sidebar