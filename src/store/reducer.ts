

enum Type {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT"
}

enum Status {
    DRAFT = "DRAFT",
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

interface Site {
    id: number;
    url: string;
}
export type TestType = {
    id: number;
    name: string;
    type: string;
    status: string;
    siteId: number;
}
export type InitialStateType = {
    state:TestType[]
}
export type ActionType = ReturnType<typeof loadStateAC>

// actions
export const loadStateAC = () => ({ type: 'TODO/LOAD-STATE' } as const);


export function reducer(state: InitialStateType, action: ActionType) {

    switch (action.type) {
        case "TODO/LOAD-STATE":
            return state
        default:
            throw new Error();
    }
}

