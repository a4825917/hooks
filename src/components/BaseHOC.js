import React, { useState } from 'react';

const baseHoc = (Component) => {

  return (props) => {
    const [visible, setVisible] = useState(false);

    return (
      <React.Fragment>
        <Component changeVisible={setVisible} visible={visible} />
      </React.Fragment>
    );
  };
};


export default baseHoc;