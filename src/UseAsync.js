
/* eslint-disable */
/**
 * useAsync -> 比如连续发送了 5 个网络请求，我们要保证总是最后一次网络请求有效从而来进行时序控制。
 * 
 * 比如 TAB 页、按钮重复点击请求数据
 */
import useAsync from './hooks/useAsync';
import Mock from 'mockjs';
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Button, Card, Col, Row, Spin } from 'antd';
import DefaultButton from "./DefaultButton";

function getUsername({ flag = 1 }) {
    return new Promise((resolve, reject) => {
        const val = Mock.mock('@name');

        console.log(val, 'val-------------------params---', flag);

        setTimeout(() => {
            if (flag > 0) {
                resolve(val);
            }

            reject(val);
        }, 1000);
    });
}

function UseAsync() {
    const [flag, setFlag] = useState();
    const { data, error, run, loading } = useAsync(getUsername, {

        onSuccess: (data, params) => {
            console.log(data, 'onSuccess----------------------params', params.flag);
        },
    });
    const [first, setFirst] = useState(1); // 防止第一次执行
    const {
        data: failData,
        error: failErr,
        run: failRun,
        loading: failLoad,
    } = useAsync(getUsername, { manual: false, });

    useEffect(() => {
        if (first) return;

        if (flag > 0) {
            run({ flag })

            return
        }

        failRun({ flag })
    }, [flag]);

    useEffect(() => {
        setFirst(0);
    }, []);

    return (
        <div>
            <>
                <Button
                    type="primary"
                    // DefaultButton
                    // loading={loading}
                    onClick={() => setFlag(Math.floor(Math.random() * (100 - 1)) + 1)}
                > 成功</Button>
                <Button type="primary" onClick={() => setFlag(Math.random() - 1)}>失败</Button>
            </>
            <div className="site-card-wrapper">
                <Row gutter={16}>
                    <Col span={8}>
                        <Spin tip="Loading..." spinning={loading}>
                            <Card title="成功" bordered={false}>
                                {data}
                            </Card>
                        </Spin>
                    </Col>

                    <Col span={8}>
                        <Spin tip="Loading..." spinning={failLoad}>
                            <Card title="失败" bordered={false}>
                                {failErr}
                            </Card>
                        </Spin>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default UseAsync;
