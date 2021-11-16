
export type Site = {
    id: number,
    url: string
}
export type TestType = {
    id: number;
    name: string;
    type: string;
    status: string;
    siteId: number;
}

export type InitialStateType =  {
        tests:TestType[],
        sites:Site[],
}
export type ActionType = ReturnType<typeof setTestsAC> | ReturnType<typeof setSitesAC>

// actions
export const setTestsAC = (data:TestType[]) => ({ type: 'SET-TESTS',data } as const);
export const setSitesAC = (data:Site[]) => ({ type: 'SET-SITES',data } as const);


export function reducer(state: InitialStateType, action: ActionType):InitialStateType {

    switch (action.type) {
        case "SET-TESTS":
            return {
                ...state,
                tests: action.data
            }
        case "SET-SITES":
            return {
                ...state,
                   sites:action.data
            }

        default:
            throw new Error();
    }
}

