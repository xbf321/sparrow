import * as React from 'react';
import { observable } from "mobx";
import { observer, inject } from 'mobx-react';

import axios from 'utils/axios';
import { Input, Form, Col, Row, Button } from 'antd';

@inject("rootStore")
@observer
class Settings extends React.Component {
    @observable config = {};
    @observable isSendRequest = false;
    async componentWillMount () {
        const { settings } = this.props.rootStore;
        this.config = settings || {};
    }
    async handleUpdate(info = {}) {
        this.isSendRequest = true;
        await axios.put('/settings', info);
        this.isSendRequest = false;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.handleUpdate(values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            desc = '',
            about = '',
            title = '',
        } = this.config;
        return (
            <Form>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="网站标题">
                        {getFieldDecorator('title', {
                            initialValue: title,
                            rules: [{ required: true, message: '不能为空' }],
                        })(<Input />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="网站子标题">
                        {getFieldDecorator('desc', {
                            initialValue: desc,
                            rules: [{ required: true, message: '不能为空' }],
                        })(<Input />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="关于站点">
                            {getFieldDecorator('about', {
                                initialValue: about,
                            })(<Input.TextArea rows={4} />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Button
                    loading={this.isSendRequest}
                    onClick={this.handleSubmit}
                    type="primary">
                    更新
                </Button>
            </Form>
        );
    }
}

export default Form.create()(Settings);