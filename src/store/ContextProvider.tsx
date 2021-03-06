import {createContext, ReactNode, useContext, useReducer} from "react";
import {ActionType, InitialStateType, reducer} from "./reducer";


const defaultState = {
    tests:  [
        {
            "id": 1,
            "name": "Prototype of the new map",
            "type": "CLASSIC",
            "status": "PAUSED",
            "siteId": 2
        },
        {
            "id": 2,
            "name": "Dark theme test",
            "type": "MVT",
            "status": "DRAFT",
            "siteId": 3
        },
        {
            "id": 3,
            "name": "New Year's Sale",
            "type": "MVT",
            "status": "STOPPED",
            "siteId": 1
        },
        {
            "id": 4,
            "name": "Order basket redesing",
            "type": "CLASSIC",
            "status": "ONLINE",
            "siteId": 1
        },
        {
            "id": 5,
            "name": "Spring promotion",
            "type": "SERVER_SIDE",
            "status": "DRAFT",
            "siteId": 2
        },
        {
            "id": 6,
            "name": "Prototype of a new header",
            "type": "SERVER_SIDE",
            "status": "ONLINE",
            "siteId": 3
        },
        {
            "id": 7,
            "name": "New Year's Sale Copy 1",
            "type": "MVT",
            "status": "DRAFT",
            "siteId": 1
        }
    ],
    sites:[
        {
            "id": 1,
            "url": "https://market.company.com"
        },
        {
            "id": 2,
            "url": "https://www.delivery.company.com"
        },
        {
            "id": 3,
            "url": "http://games.company.com"
        }
    ],

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