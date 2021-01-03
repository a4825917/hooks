import React, { Component } from 'react';
import BaseHOC from './components/BaseHOC';
import Mock from 'mockjs';
import { Modal } from 'antd';

function getUsername({ flag = 1 }) {
    return new Promise((resolve, reject) => {
        const val = Mock.mock('@name');

        setTimeout(() => {
            if (flag > 0) {
                resolve(val);
            }

            reject(val);
        }, 1000);
    });
}


class Demo extends Component {
    constructor(props) {
        super(props);

        console.log(props)
        this.state = {};
    }

    handleGet() {

    }

    render() {
        const { changeVisible, visible } = this.props;
        return (
            <Modal
                title="Basic Modal"
                visible={visible}
                onOk={this.handleGet}
                onCancel={() => changeVisible(false)}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        );
    }
}
export default BaseHOC(Demo)