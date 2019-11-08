import * as React from 'react';
import { observable } from "mobx";
import { observer, inject } from 'mobx-react';

import axios from 'utils/axios';
import { Input, Form, Col, Row, Button, message} from 'antd';

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
        const result = await axios.put('/settings', info);
        message[result ? 'success' : 'error'](result ? '更新成功。' : '更新失败，请重试。');
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
            keywords = '',
            site_url = '',
            footer_html = '',
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
                        <Form.Item label="网站关键词">
                        {getFieldDecorator('keywords', {
                            initialValue: keywords,
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
                        <Form.Item label="站点地址">
                        {getFieldDecorator('site_url', {
                            initialValue: site_url,
                        })(<Input placeholder="如果是根域名，留空即可，不要后边的反斜杠「/」"/>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="页脚HTML">
                        {getFieldDecorator('footer_html', {
                            initialValue: footer_html,
                        })(<Input.TextArea rows={4} />)}
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