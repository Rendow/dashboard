import {InitialStateType, reducer, setSitesAC, setTestsAC} from "./reducer";

let defaultState:InitialStateType

beforeEach(() => {
     defaultState = {
        tests:  [
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

        ],
        sites:[],
    };
})
test('tests should be added', () => {

    let data = [
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
    // 1. test data
    let action = setTestsAC(data)

    // 2. action
    let newState = reducer(defaultState,action)

    // 3. expectation
    expect( newState.tests.length).toBe(3)
})
test('sites should be added', () => {

    let action = setSitesAC([{id:1, url:'games.company.com'}])
    let newState = reducer(defaultState,action)

    expect(newState.sites.length).toBe(1)
})
