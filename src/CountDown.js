
import React, { useState, useCallback, useEffect, useRef } from "react";

import { Button } from "antd";
import "antd/lib/button/style/css";

/**
 * 倒计时
 * 
 * @result count 秒
 * @result startCount 开始倒计时
 * @result stopCount 暂停倒计时
 * @result anginStart 再次启动
 */
function useCount() {
    const [count, setCount] = useState(0);
    const timer = useRef(null);

    useEffect(() => {
        timer.current = setTimeout(() => {
            if (count > 0) {
                setCount(count - 1);
            }
        }, 1000);

        return () => {
            clearTimeout(timer.current);
        };
    }, [count]);

    // 开始倒计时
    const startCount = count => {
        setCount(count);
    }

    const stopCount = () => {
        clearTimeout(timer.current);
    }

    const anginStart = () => {
        setCount(count - 1)
    }

    return [count, startCount, stopCount, anginStart];
}

export default function CountDown(props) {
    const [count, startCount, stopCount, anginStart] = useCount();

    const handleStart = useCallback(() => {
        startCount(60);
    }, [startCount]);

    const handleAnginStart = () => {
        anginStart()
    }

    const handleStop = () => {
        stopCount()
    }

    return <>
        <Button onClick={handleStart}>开始1分钟倒计时: {count}</Button>
        <div></div>
        <Button onClick={handleStop}>暂停倒计时</Button>
        <div></div>
        <Button onClick={handleAnginStart}>Angin</Button>
    </>
}
