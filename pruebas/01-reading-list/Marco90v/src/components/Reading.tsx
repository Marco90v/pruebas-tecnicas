import { useContext } from "react";
import { Context } from "../Context/Global";
import { ActionFunction } from "../const";
import TotalBooks from "./TotalBooks";
import Card from "./Card";

function Reading() {
    const { state } = useContext(Context);

    return(
        <div className="min-w-full max-w-5xl">
            <TotalBooks TypeOfBooks={ActionFunction.BooksReading} />
            <ul className="content-cards" >
                {
                    state.reading.map( item => <Card key={item.book.ISBN} item={item} remove={true}/> )
                }
            </ul>
        </div>
    )
}
export default Reading
export { Reading }