import * as React from 'react';
import { observable } from "mobx";
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";
import { Table, Divider, Button, Tag, Icon, Popconfirm, message} from 'antd';
import axios from 'utils/axios';
import './style.scss';

@observer
export default class Home extends React.Component {
    @observable list = {};
    @observable loading = true;
    @observable queryParam = {
        pageSize: 10,
        pageIndex: 1,
    };
    columns = [{
        title: '标题',
        dataIndex: 'title',
        key: 'title',
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 80,
        render: type => {
            if (type === 1) {
                return <Tag>页面</Tag>
            }
            return <Tag color="purple">文章</Tag>;
        }
    }, {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        render: status => {
            if (status === 0) {
                return <Tag>未发布</Tag>
            }
            return <Tag color="green">已发布</Tag>;
        },
    }, {
        title: '浏览数',
        dataIndex: 'view_num',
        key: 'view_num',
        width: 60,
    }, {
        title: '更新时间',
        dataIndex: 'updated_at_short',
        key: 'updated_at_short',
        width: 120,
    }, {
        title: '操作',
        key: 'action',
        width: 80,
        render: (item) => (
            <React.Fragment>
                <Link to={`/pagesadmin/posts/${item.uuid}`} >
                    <Icon type="edit" />
                </Link>
                <Divider type="vertical" />
                <a>
                    <Popconfirm
                        title="确定删除?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            this.handleDeletePost(item);
                        }}
                    >
                        <Icon type="delete"/>
                    </Popconfirm>
                </a>
            </React.Fragment>
        ),
    }];
    async componentWillMount () {
        await this.fetchData();
    }
    async fetchData(params = {}) {
        this.loading = true;
        Object.assign(this.queryParam, params);
        this.list = (await axios.get('/posts', {
            params: this.queryParam
        }) || {});
        this.loading = false;
    }
    async handleDeletePost(item) {
        const result = await axios.delete(`/posts/${item.uuid}`);
        if (!result) {
            message.error('删除失败。');
            return;
        }
        this.fetchData();
    }
    async handleNewPost() {
        const result = await axios.post('/posts');
        this.props.history.push({
            pathname: `/pagesadmin/posts/${result.uuid}`
        });
    }
    render() {
        const { rows = [], count = 0 } = this.list;
        const pagination = {
            pageSize: 10,
            total: count,
            onChange: pageIndex => {
                this.fetchData({
                    pageIndex,
                });
            }
        };
        return (
            <div className="p-home">
                <div className="action-bar">
                    <Button
                        icon="plus"
                        type="primary"
                        onClick={this.handleNewPost.bind(this)}
                    >新建</Button>
                </div>
                <Table
                    loading={this.loading}
                    size={'middle'}
                    rowKey={'id'}
                    columns={this.columns}
                    dataSource={rows}
                    pagination={pagination}
                />
            </div>
        );
    }
}
