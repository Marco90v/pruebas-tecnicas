import { useContext } from "react";
import { Context } from "../Context/Global";
import { Types } from "../const";

interface props{
    genre:string,
    quantity:number
}

function ButtonGenre({genre, quantity}:props) {
    const { dispatch } = useContext(Context);

    const changeCategoryFilter = (category:string) => {
        dispatch({type:Types.changeCategoryFilter, payload:{filter:category}})
    }
    return(
        <li className="text-sidebar"
            onClick={()=>changeCategoryFilter(genre)}
        >
            {genre}
            <span className="badge-sidebar">{quantity}</span>
        </li> 
    )
}
export default ButtonGenre
export { ButtonGenre }