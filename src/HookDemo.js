import React, { useState, useMemo, useCallback, useEffect, useRef, } from 'react';
import { message, Menu } from 'antd';

export default function HookDemo() {
    const [current, setCurrent] = useState('useCallBack')

    const handleClick = e => {
        setCurrent(e.key)
    };

    return (
        <div>
            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="effect">
                    effect
                </Menu.Item>
                <Menu.Item key="useCallBack" >
                    userCallBack
                </Menu.Item>
                <Menu.Item key="userMemo" >
                    userMemo
                </Menu.Item>
            </Menu>

            <div style={{ padding: '50px' }}>
                {current === 'useEffect' && <Effect />}
                {current === 'useCallBack' && <Callback />}
                {current === 'userMemo' && <Memo />}
            </div>
        </div>
    );
}

function Effect() {



    return <div>123 </div>
}

function Callback() {
    const [count, setCount] = useState(0)
    const [text, setText] = useState('')

    const handleOnChange = useCallback((e) => {
        setText(e.target.value)
    }, [text])

    const handleOnChangeText = (e) => {

        setCount(count + 1)
    }

    return (
        <div>
            <div>count: {count}</div>
            <div>text: {text}</div>
            <button onClick={handleOnChange}>+1</button>

            <Child onChange={handleOnChangeText} />
        </div>
    )
}

function Child(props) {
    console.log(props);

    return (
        <div>
            <input type="text" onChange={props.onChange} />
        </div>
    )
}

/**
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