import React, { useState, useMemo, useReducer } from 'react';
import { message, Menu } from 'antd';
import Callback from "./Callback";
import Effect from "./Effect";
import UseContext from "./UseContext";


export default function HookDemo() {
    const [current, setCurrent] = useState('useEffect')

    const handleClick = e => {
        setCurrent(e.key)
    };

    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="useEffect">
                    effect
                </Menu.Item>
                <Menu.Item key="useCallBack" >
                    userCallBack
                </Menu.Item>
                {/* <Menu.Item key="userMemo" >
                    userMemo
                </Menu.Item> */}
            </Menu>

            <div style={{ padding: '50px' }}>
                {current === 'useEffect' && <Effect />}
                {current === 'useCallBack' && <Callback />}
                {/* {current === 'userMemo' && <Memo />} */}
            </div>
        </div>
    );
}






/**
 *  若第二个参数为空数组，则只会在渲染组件时执行一次，传入的属性值的更新也不会有作用。
 * 
    在业务中，我们可以用 useMemo 来处理计算结果的缓存或引入组件的防止重复挂载优化。其接受两个参数，第一个参数为一个 Getter 方法，返回值为要缓存的数据或组件，第二个参数为该返回值相关联的状态，当其中任何一个状态发生变化时就会重新调用 Getter 方法生成新的返回值。
*/
function Memo() {
    const [count1, changeCount1] = useState(0);
    const [count2, changeCount2] = useState(10);

    const child = useMemo(() => {
        message.info('重新生成Child组件');
        return <MemoChild count={count1} />;
    }, [count1]);

    return (
        <div>
            {child}
            <button onClick={() => { changeCount1(count1 + 1); }}>改变count1</button>
            <button onClick={() => { changeCount2(count2 + 1); }}>改变count2</button>
        </div>
    );
}

function MemoChild({ count }) {
    return <p>当前传递的count为:{count}</p>;
}


/**
    useReducer 和 redux 中 reducer 很像
    useState 内部就是靠 useReducer 来实现的
    在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等
*/
const initialState = 0;
function reducer(state, action) {
    state = {
        ...state,
        xxx: 123
    }

    switch (action.type) {
        case 'increment':
            return { ...state, number: state.number + 1 };
        case 'decrement':
            return { ...state, number: state.number - 1 };
        default:
            throw new Error();
    }
}

function init(initialState) {
    return { number: initialState + 5 };
}

function Counter() {
    const [state, dispatch] = useReducer(reducer, initialState, init);
    return (
        <>
            Count: {state.number}
            {state.xxx}
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        </>
    )
}