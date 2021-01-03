import React, { useState, useRef, useEffect, useCallback } from 'react';

const baseHoc = (Component) => {

  return (props) => {
    const [visible, setVisible] = useState(false);

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

    const obj = { count, startCount, stopCount }


    return (
      <React.Fragment>
        <button onClick={() => setVisible(true)}>
          showChild
        </button>
        {visible && <Component {...obj} changeVisible={setVisible} visible={visible} />}
      </React.Fragment>
    );
  };
};
export default baseHoc;