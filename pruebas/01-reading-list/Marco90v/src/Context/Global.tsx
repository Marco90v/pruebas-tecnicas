import { createContext, useReducer } from "react";
import { Types } from "../const";

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
    }
};
type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];

interface initial {
    state:library,
    dispatch: React.Dispatch<Actions>
  }

const initialState:library = {
    library: [],
    reading: [],
    filter:"All"
}

const Context = createContext<initial>({state:initialState,  dispatch:()=>null});

function reducer (state:library, action:Actions):library{
    switch (action.type) {
        case Types.setInitialData:
            return { ...state, ...action.payload }
        case Types.changeCategoryFilter:
            return { ...state, ...action.payload }
        case Types.AddBookReading:
            return {
                ...state,
                reading:[...state.reading, action.payload.reading],
            }
        case Types.RemoveBookReading:
            // console.log(action.payload)
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