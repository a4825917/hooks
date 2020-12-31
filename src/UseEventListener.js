
/* eslint-disable */
import React, { useState, useRef } from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';
import useEventListener from "./hooks/useEventListener";

const UseEventListener = () => {
    const [value, setValue] = useState(0);
    const [keyValue, setKeyValue] = useState(0);
    const clickHandler = () => {
        setValue(value + 1);
    };

    const keyDownHandler = ev => {
        setKeyValue(ev.code);
    };

    const ref = useRef();

    useEventListener('onclick', clickHandler, ref);

    useEventListener('keydown', keyDownHandler,)
    return (
        <>
            <Button ref={ref}>
                You click {value} times
            </Button>

            <p style={{ marginTop: "50px" }}>Your press key is {keyValue}</p>
        </>
    )
}

export default UseEventListener