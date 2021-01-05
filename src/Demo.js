import React, { Component } from 'react';
import BaseHOC from './components/BaseHOC';
import { Modal } from 'antd';
import Children from "./components/Children";

// Class 中使用 Hooks
class Demo extends Component {
    constructor(props) {
        super(props);

        console.log(props)
        this.state = {};
    }

    handleGet() {

    }

    render() {
        const { changeVisible, visible: hocVisible } = this.props;

        return (<Children>
            {(visible, setVisible) => <>
                <Modal
                    title="Modal"
                    visible={visible}
                    onOk={() => setVisible(false)}
                    onCancel={() => setVisible(false)}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>

                <button onClick={() => setVisible(!visible)}>打开Modal</button>
            </>
            }
        </Children>
        );
    }
}
export default BaseHOC(Demo)