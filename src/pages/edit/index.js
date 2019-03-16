import * as React from 'react';
import { Button, message, Icon } from 'antd';
import axios from 'utils/axios';
import { observable, action } from "mobx";
import { observer } from 'mobx-react';
import Form from './Form';
import './style.scss';

@observer
class Create extends React.Component {
    @observable postInfo = {};
    @observable isLoadingForBtn = false;
    constructor(props) {
        super(props);
        const { uuid } = props.match.params;
        this.uuid = uuid;
        this.endpoint = `/api/posts/${this.uuid}`;
    }
    async componentWillMount () {
        await this.fetchData();
    }
    async fetchData() {
        this.postInfo = await axios.get(this.endpoint);
        if (!this.postInfo) {
            // 跳转到错误页面
        }
    }
    @action
    async handleSave() {
        this.isLoadingForBtn = true;
        const result = await axios.put(this.endpoint, this.postInfo);
        if (result) {
            message.success('更新成功。');
        }
        this.isLoadingForBtn = false;
    }
    @action
    handleFormChange = (info = {}) => {
        this.postInfo = Object.assign({}, this.postInfo, info);
    }
    render() {
        const { title = '', markdown_content = ''} = this.postInfo;
        return (
            <div className="p-create">
                <div className="action-bar">
                    <Icon type="setting" />
                    <Button
                        loading={this.isLoadingForBtn}
                        icon="cloud-upload"
                        type="primary"
                        onClick={this.handleSave.bind(this)}
                    >发布</Button>
                </div>
                <div className="editor-wrapper">
                    <Form
                        title={title}
                        markdown_content={markdown_content}
                        onChange={this.handleFormChange}
                    />
                </div>
            </div>
        );
    }
}

export default Create;