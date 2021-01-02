
/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import UseAsync from './UseAsync';
import CountDown from "./CountDown";
import HookDemo from "./HookDemo";
import UseEventListener from "./UseEventListener";

function App() {
  const [current, setCurrent] = useState('hooks')

  const handleClick = e => {
    setCurrent(e.key)
  };

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="hooks" >
          hooks 小知识
        </Menu.Item>
        <Menu.Item key="countDown" >
          倒计时
        </Menu.Item>
        <Menu.Item key="useAsync">
          useAsync
        </Menu.Item>
        <Menu.Item key="useEventListener" >
          UseEventListener
        </Menu.Item>
      </Menu>
      <div style={{ padding: '50px' }}>
        {current === 'useAsync' && <UseAsync />}
        {current === 'countDown' && <CountDown />}
        {current === 'hooks' && <HookDemo />}
        {current === 'useEventListener' && <UseEventListener />}
      </div>

    </div >
  );
}

export default App;
