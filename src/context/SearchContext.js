import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    city: undefined,
    dates: [{startDate:new Date(),endDate:new Date(), key: 'selection' }],
    options: {
        adult: undefined,
        child: undefined,
        room: undefined,
    }
}
export const SearchContext = createContext(INITIAL_STATE);
const SearchRuducer = (state, action) => {
    switch (action.type) {
        case "NEW_SEARCH":
            return action.payload;
        case "RESET_SEARCH":
            return INITIAL_STATE;

        default:
            return state;
    }
}
export const SearchContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(SearchRuducer, INITIAL_STATE)
    return (<SearchContext.Provider value={{
        // city: state.city,
        // date: state.date,
        // options: state.options,
        state,
        dispatch
    }}>
        {children}
    </SearchContext.Provider>)
}