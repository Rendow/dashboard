import {createContext, ReactNode, useContext, useReducer} from "react";
import {ActionType, InitialStateType, reducer} from "./reducer";


const defaultState = {
    state: [
        {
            id: 1,
            name: "Prototype of the new map",
            type: "CLASSIC",
            status: "PAUSED",
            siteId: 2
        },
        {
            id: 2,
            name: "Dark theme test",
            type: "MVT",
            status: "DRAFT",
            siteId: 3
        },
        {
            id: 3,
            name: "New Year's Sale",
            type: "MVT",
            status: "STOPPED",
            siteId: 1
        },

    ]
};

export const Context = createContext <(InitialStateType &
    { dispatch: (action: ActionType) => void }) | null >(null);


export const StateProvider = ({ children }: { children?: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, defaultState )
    return (
        <Context.Provider value={{...state,dispatch}}>
            {children}
        </Context.Provider>
    )
}

export const StateContext = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error(
            'Hook should only be used inside StateProvider',
        );
    }

    return context;
};