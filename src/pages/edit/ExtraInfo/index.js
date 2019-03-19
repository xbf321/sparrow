import * as React from 'react';
import { observer } from 'mobx-react';
import { Input, Form, Col, Row, Button, Radio } from 'antd';

const RadioGroup = Radio.Group;

@observer
class ExtraInfo extends React.Component {
    handleSubmit = (e) => {
        const { onSubmit = () => {} } = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onSubmit(values);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            type,
            pathname,
            summary,
        } = this.props;
        return (
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="类型">
                        {getFieldDecorator('type', {
                            initialValue: type,
                        })(<RadioGroup>
                            <Radio value={0}>文章</Radio>
                            <Radio value={1}>页面</Radio>
                        </RadioGroup>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="路径">
                        {getFieldDecorator('pathname', {
                            initialValue: pathname,
                            rules: [{ required: true, message: '访问路径不能为空' }],
                        })(<Input />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="文章摘要">
                            {getFieldDecorator('summary', {
                                initialValue: summary,
                            })(<Input.TextArea rows={4} />)}
                        </Form.Item>
                    </Col>
                </Row>
                <Button onClick={this.handleSubmit} type="primary">
                    保存
                </Button>
            </Form>
        );
    }
}
export default Form.create()(ExtraInfo);