import React, { useReducer, useContext, createContext } from 'react';


//useContext(MyContext) 只是让你能够读取 context 的值以及订阅 context 的变化。你仍然需要在上层组件树中使用 <MyContext.Provider> 来为下层组件提供 context

const CounterContext = createContext();
const initialState = 0;
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD':
            return { number: state.number + 1 };
        default:
            break;
    }
}

function SubCounter() {
    const { state, dispatch } = useContext(CounterContext);
    return (
        <>
            <p>{state.number}</p>
            <button onClick={() => dispatch({ type: 'ADD' })}>+</button>
        </>
    )
}

function UseContext() {
    const [state, dispatch] = useReducer((reducer), initialState, () => ({ number: initialState }));
    return (
        <CounterContext.Provider value={{ state, dispatch }}>
            <SubCounter />
        </CounterContext.Provider>
    )
}

export default UseContext