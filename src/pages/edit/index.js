import * as React from 'react';
import { Button, notification, Drawer } from 'antd';
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
    @observable isShowDrawer = false;
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
    async handleSaveMetaInfo (meta = {}) {
        const url = `${this.endpoint}/meta`;
        await axios.put(url, meta);
        this.isShowDrawer = false;
    }
    @action
    async handleSave() {
        this.isLoadingForBtn = true;
        const result = await axios.put(this.endpoint, this.postInfo);
        if (result) {
            notification.success({
                message: '更新成功。',
                description: `4秒跳转到「列表页」。`,
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
    handleFormChange = (info = {}) => {
        this.postInfo = Object.assign({}, this.postInfo, info);
    }
    @action
    handelDrawerVisible = (visible = false) => {
        this.isShowDrawer = visible;
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
            onSubmit: this.handleSaveMetaInfo.bind(this),
        };
        return (
            <div className="p-create">
                <div className="action-bar">
                    <Button
                        icon="setting"
                        onClick={() => {
                            this.handelDrawerVisible(true);
                        }}>其他信息</Button>
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
                <Drawer
                    title="编辑扩展信息"
                    width={420}
                    onClose={() => {
                        this.handelDrawerVisible(false);
                    }}
                    visible={this.isShowDrawer}
                    style={{
                        overflow: 'auto',
                        height: 'calc(100% - 108px)',
                        paddingBottom: '108px',
                    }}
                    >
                    <ExtraInfo {...extraInfoProps} />
                </Drawer>
            </div>
        );
    }
}

export default Create;