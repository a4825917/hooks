import { useState } from 'react';

const Children = (props = {}) => {
    const { children = null } = props;
    const [visible, setVisible] = useState(false);



    if (children) {
        return children(visible, setVisible);
    }

    return { visible, setVisible };
}

export default Children;