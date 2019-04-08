import 'babel-polyfill';
import "antd/dist/antd.css";
import * as React from 'react';
import * as ReactDOM from "react-dom";
import { observer } from 'mobx-react';

import axios from 'utils/axios';
import { Input, Form, Col, Row, Button, message, Icon} from 'antd';

import './style.scss';

@observer
class Login extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                const result = await axios.post('login' , values);
                if (result) {
                    window.location.href = '/pagesadmin';
                }
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form
                onSubmit={this.handleSubmit}
                className="login-form"
            >
                <Form.Item>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}
const WrappedNormalLoginForm = Form.create()(Login);

ReactDOM.render(<WrappedNormalLoginForm />, document.getElementById("app"));
