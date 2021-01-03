import React, { useState, useCallback } from 'react';


// 可以搭配 React.memo 进行使用，此方法内会对 props 做一个浅层比较，如果如果 props 没有发生改变，则不会重新渲染此组件。
const Button = ({ onClickButton, children }) => {
    return (
        <>
            <button onClick={onClickButton}>{children}</button>
            <span>{Math.random()}</span>
        </>
    );
};

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


