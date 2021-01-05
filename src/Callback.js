import React, { useState, useCallback } from 'react';


// 可以搭配 React.memo 进行使用，此方法内会对 props 做一个浅层比较，如果如果 props 没有发生改变，则不会重新渲染此组件。
const Button = React.memo(({ onClickButton, children }) => {
    return (
        <>
            <button onClick={onClickButton}>{children}</button>
            <span>{Math.random()}</span>
        </>
    );
});

/**
 * 简单来说就是返回一个函数，只有在依赖项发生变化的时候才会更新（返回一个新的函数）。
 */
export default function Callback() {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);
    const [count3, setCount3] = useState(0);

    const handleClickButton1 = () => {
        setCount1(count1 + 1);
    };

    // 这里 useCallback 就会根据 count2 是否发生变化，从而决定是否返回一个新的函数，函数内部作用域也随之更新。
    // 如果 将 useCallback 依赖的第二个参数变成了一个空的数组
    // 这也就意味着这个方法没有依赖值，将不会被更新。且由于 JS 的静态作用域导致此函数内 count2 永远都 0
    const handleClickButton2 = useCallback(() => {
        setCount2(count2 + 1);
    }, [count2]);

    return (
        <div>
            <div>
                <Button onClickButton={handleClickButton1}>Button1</Button>
            </div>
            <div>
                <Button onClickButton={handleClickButton2}>Button2</Button>
            </div>
            <div>
                <Button
                    onClickButton={() => {
                        setCount3(count3 + 1);
                    }}
                >
                    Button3
        </Button>
            </div>
        </div>
    );
}


