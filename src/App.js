
/* eslint-disable */
import React, { useState, useEffect, useCallback } from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import UseAsync from './UseAsync';
import Hooks from "./Hooks";
import UseEventListener from "./UseEventListener";
import style from "./index.css";

function App() {
  const [current, setCurrent] = useState('useAsync')

  const handleClick = e => {
    setCurrent(e.key)
  };

  return (
    <div>
      <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="useAsync">
          useAsync
        </Menu.Item>
        <Menu.Item key="hooks" >
          hooks 小知识
        </Menu.Item>
        <Menu.Item key="useEventListener" >
          UseEventListener
        </Menu.Item>
      </Menu>
      <div style={{ padding: '50px' }}>
        {current === 'useAsync' && <UseAsync />}

        {current === 'hooks' && <Hooks />}
        {current === 'useEventListener' && <UseEventListener />}
      </div>

    </div >
  );
}

export default App;
