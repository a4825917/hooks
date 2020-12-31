
/* eslint-disable */
import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';


function DefaultButton(props) {
    const { onClick, loading = false } = props

    const runClick = () => {
        if (loading) return

        onClick()
    }

    return (
        <Button type="primary" onClick={runClick}>
            123132
        </Button>
    );
}

export default DefaultButton;
