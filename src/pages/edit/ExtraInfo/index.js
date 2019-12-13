import * as React from 'react';
import { observer } from 'mobx-react';
import { Input, Form, Col, Row, Radio } from 'antd';

const RadioGroup = Radio.Group;

@observer
class ExtraInfo extends React.Component {
    // handleSubmit = (e) => {
    //     const { onSubmit = () => {} } = this.props;
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             onSubmit(values);
    //         }
    //     });
    // }
    onChange = (data = {}) => {
        this.props.onChange(data);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const {
            type,
            slug,
            summary,
        } = this.props;
        return (
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="类型">
                        {getFieldDecorator('type', {
                            initialValue: type,
                        })(<RadioGroup onChange={(e) => {
                            this.onChange({
                                type: e.target.value
                            });
                        }}>
                            <Radio value={0}>文章</Radio>
                            <Radio value={1}>页面</Radio>
                        </RadioGroup>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="路径">
                        {getFieldDecorator('slug', {
                            initialValue: slug,
                            rules: [{ required: true, message: '访问路径不能为空' }],
                        })(<Input onChange={(e) => {
                            const value = e.target.value;
                            if (!value) { return; }
                            this.onChange({
                                slug: value,
                            });
                        }}/>)}
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <Form.Item label="文章摘要">
                            {getFieldDecorator('summary', {
                                initialValue: summary,
                            })(<Input.TextArea
                                rows={4}
                                onChange={(e) => {
                                    this.onChange({
                                        summary: e.target.value
                                    });
                                }} />)}
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        );
    }
}
export default Form.create()(ExtraInfo);