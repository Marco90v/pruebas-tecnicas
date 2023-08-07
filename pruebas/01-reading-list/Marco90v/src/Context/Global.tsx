import { createContext, useReducer } from "react";
import { Types } from "../const";
import { addLocalStorage, getLocalStorage } from "../utils/storage";
import { getCategorys, getTotalBooks } from "../utils/books";

type Payload = {
    [Types.setInitialData]: {
      library: book[],
      filter:string
    };
    [Types.changeCategoryFilter]: {
        filter: string
    };
    [Types.AddBookReading]:{
        reading: book
    };
    [Types.RemoveBookReading]:{
        reading: book
    };
    [Types.ChangeView]:{
        view: Types.ViewBooks | Types.ViewReading
    };
    [Types.ChangeNumbersPages]:{
        numberPages: number
    };
    [Types.UpdateReading]:{
        reading: book[]
    }
};
type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

interface initial {
    state:library,
    dispatch: React.Dispatch<Actions>
}

const initialState:library = {
    genre:[],
    library: [],
    reading: getLocalStorage(),
    filter:Types.All,
    view:Types.ViewBooks,
    numberPages:100
}

const Context = createContext<initial>({state:initialState,  dispatch:()=>null});

function reducer (state:library, action:Actions):library{
    switch (action.type) {
        case Types.setInitialData:
            return {
                ...state,
                ...action.payload,
                genre: action.payload.library.reduce(getCategorys,[getTotalBooks(action.payload.library)])
            }
        case Types.changeCategoryFilter:
            return { ...state, ...action.payload }
        case Types.ChangeView:
            return {...state, ...action.payload}
        case Types.ChangeNumbersPages:
            return {
                ...state,
                ...action.payload
            }
        case Types.AddBookReading: {
            const addReading = [...state.reading, action.payload.reading]
            addLocalStorage(addReading)
            return{
                ...state,
                reading:addReading,
            }
        }
        case Types.RemoveBookReading: {
            const removeReading = state.reading.filter( item=> !(item.book.ISBN===action.payload.reading.book.ISBN) )
            addLocalStorage(removeReading)
            return {
                ...state,
                reading: removeReading
            }
        }
        case Types.UpdateReading:{
            return {
                ...state,
                reading: action.payload.reading
            }
        }
        default:
            return state
    }
}

function GlobalContext({children}:{children:React.ReactNode}) {
    const [state, dispatch] = useReducer(reducer, initialState);
    return(
        <Context.Provider value={{state, dispatch}}>
            {children}
        </Context.Provider>
    );
}

export default GlobalContext
export { Context }