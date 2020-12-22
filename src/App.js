/*
 * @Author: your name
 * @Date: 2020-12-22 15:37:22
 * @LastEditTime: 2020-12-22 18:10:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hooks\src\App.js
 */
import { useAsync } from './hooks';
import Mock from 'mockjs';
import React, { useState, useEffect, useCallback } from 'react';
import 'antd/dist/antd.css';

import { Button, Card, Col, Row, Spin } from 'antd';

function getUsername(isSuccess = 1) {
  return new Promise((resolve, reject) => {
    const val = Mock.mock('@name');
    console.log(val, 'valvalval');

    setTimeout(() => {
      if (isSuccess) {
        resolve(val);
      }
      reject(val);
    }, 1000);
  });
}

function App() {
  const [flag, setFlag] = useState();
  const { data, error, run, loading } = useAsync(getUsername, {
    onSuccess: (data, params) => {
      console.log(data, '----------------------onSuccess');
    },
  });
  const [first, setFirst] = useState(1);
  const {
    data: failData,
    error: failErr,
    run: failRun,
    loading: failLoad,
  } = useAsync(getUsername);

  useEffect(() => {
    if (first) return;

    flag && run(flag);
    !flag && failRun(flag);
  }, [flag]);

  useEffect(() => {
    setFirst(0);
  }, []);

  return (
    <div>
      <>
        <Button
          type="primary"
          onClick={() => setFlag(Math.floor(Math.random() * (100 - 1)) + 1)}
          // loading={loading}
        >
          成功
        </Button>
        <Button type="primary" loading={failLoad} onClick={() => setFlag(0)}>
          失败
        </Button>
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

export default App;
