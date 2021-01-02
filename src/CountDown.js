import React, { useState, useCallback, useEffect, useRef } from "react";

import { Button } from "antd";
import "antd/lib/button/style/css";

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

    const startCount = useCallback(count => {
        setCount(count);
    }, []);

    const stopCount = useCallback(() => {
        clearTimeout(timer.current);
    }, []);

    return [count, startCount, stopCount];
}

export default function CountDown(props) {
    const [count, startCount] = useCount();

    const handleStart = useCallback(() => {
        startCount(60);
    }, [startCount]);

    return <Button onClick={handleStart}>开始1分钟倒计时: {count}</Button>;
}
