import * as React from 'react';
import { Affix, Row, Col, notification, Button } from 'antd';
import axios from 'utils/axios';
import { observable, action } from "mobx";
import { observer } from 'mobx-react';
import Form from './Form';
import ExtraInfo from './ExtraInfo';
import './style.scss';

@observer
class Create extends React.Component {
    @observable postInfo = {};
    @observable isLoadingForBtn = false;
    constructor(props) {
        super(props);
        const { uuid } = props.match.params;
        this.uuid = uuid;
        this.endpoint = `/posts/${this.uuid}`;
    }
    async componentWillMount () {
        await this.fetchData();
    }
    async fetchData() {
        this.postInfo = await axios.get(this.endpoint);
        if (!this.postInfo) {
            // 跳转到 404 错误页面
            this.props.history.push({
                pathname: `/pagesadmin/notFound`
            });
        }
    }
    @action
    async handleSave() {
        this.isLoadingForBtn = true;
        const result = await axios.put(this.endpoint, this.postInfo, {
            status: 1,
        });
        if (result) {
            notification.success({
                message: '更新成功。',
                duration: 2,
                description: `2秒跳转到「列表页」。`,
                onClose: () => {
                    this.props.history.push({
                        pathname: '/pagesadmin/',
                    });
                },
            });
        }
        this.isLoadingForBtn = false;
    }
    @action
    handleFormChange = async (info = {}) => {
        this.postInfo = Object.assign({}, this.postInfo, info);
        await axios.put(this.endpoint, this.postInfo);
    }
    render() {
        const {
            title = '',
            markdown_content = '',
            type,
            slug,
            summary,
        } = this.postInfo;
        const extraInfoProps = {
            type,
            slug,
            summary,
            onChange: this.handleFormChange.bind(this),
        };
        return (
            <div className="p-create">
                <Row gutter={[16]}>
                    <Col span={18}>
                        <Form
                            title={title}
                            markdown_content={markdown_content}
                            onChange={this.handleFormChange}
                        />
                    </Col>
                    <Col span={6}>
                        <Affix offsetTop={10}>
                            <ExtraInfo {...extraInfoProps} />
                            <Button
                                loading={this.isLoadingForBtn}
                                icon="cloud-upload"
                                type="primary"
                                onClick={this.handleSave}
                            >发布</Button>
                        </Affix>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Create;