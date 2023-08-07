import { createContext, useReducer } from "react";
import { Texto, Types } from "../const";

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
    reading: [],
    filter:Types.All,
    view:Types.ViewBooks,
    numberPages:100
}

const getCategorys = (prev:genre[],next:book):genre[] => {
    const exist = prev.find( ({genre}:genre) => genre === next.book.genre)
    if(!exist){
        prev.push({
            genre: next.book.genre,
            quantity:1
        })
    } else {
        return prev.map( g => {
            return g.genre=== next.book.genre ? { ...g, quantity:g.quantity+1 } : g
        })
    }
    return prev
}

const setTotalBooks = (books:book[]):genre => {
    return {
        genre:Texto.Todos,
        quantity:books.length
    }
}

const Context = createContext<initial>({state:initialState,  dispatch:()=>null});

function reducer (state:library, action:Actions):library{
    switch (action.type) {
        case Types.setInitialData:
            return {
                ...state,
                ...action.payload,
                genre: action.payload.library.reduce(getCategorys,[setTotalBooks(action.payload.library)])
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
        case Types.AddBookReading:
            return {
                ...state,
                reading:[...state.reading, action.payload.reading],
            }
        case Types.RemoveBookReading:
            return {
                ...state,
                reading: state.reading.filter(item=> !(item.book.ISBN===action.payload.reading.book.ISBN) )
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