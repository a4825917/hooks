import React, { useState, Fragment } from 'react';
import useAsync from "./../hooks/useAsync";

const baseHoc = (Component) => {

  return (props) => {
    const [visible, setVisible] = useState(false);

    return (
      <React.Fragment>
        <button onClick={() => setVisible(true)}>
          showChild
        </button>
        {visible && <Component changeVisible={setVisible} visible={visible} />}
      </React.Fragment>
    );
  };
};
export default baseHoc;