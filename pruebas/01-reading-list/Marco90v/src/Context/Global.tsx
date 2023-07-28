import { createContext, useReducer } from "react";
import { Types } from "../const";

type Payload = {
    [Types.setInitialData]: {
      library: book[],
      filter:string
    },
    [Types.changeCategoryFilter]: {
        filter:string
    };
};
type Actions = ActionMap<Payload>[keyof ActionMap<Payload>];


const initialState:library = {
    library: [],
    filter:"All"
}

const Context = createContext<initial>({state:initialState,  dispatch:()=>null});

function reducer (state:library, action:Actions):library{
    switch (action.type) {
        case Types.setInitialData:
            return { ...state, ...action.payload }
        case Types.changeCategoryFilter:
            return { ...state, ...action.payload }
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