import * as React from 'react';
import { observable } from "mobx";
import { observer } from 'mobx-react';
import { Link } from "react-router-dom";
import { Table, Divider, Tag, Icon, Popconfirm, message} from 'antd';
import axios from 'utils/axios';
import './style.scss';

@observer
export default class Home extends React.Component {
    @observable list = {};
    @observable queryParam = {
        pageSize: 10,
        pageIndex: 1,
    };
    async componentWillMount () {
        await this.fetchData();
    }
    async fetchData(params = {}) {
        Object.assign(this.queryParam, params);
        this.list = (await axios.get('/api/posts', {
            params: this.queryParam
        }) || {});
    }
    async deletePost(item) {
        const result = await axios.delete(`/api/posts/${item.uuid}`);
        if (!result) {
            message.error('删除失败。');
            return;
        }
        this.fetchData();
    }
    render() {
        const columns = [{
            title: '标题',
            dataIndex: 'title',
            key: 'title',
            render: text => <a href="javascript:;">{text}</a>,
        }, {
            title: '类型',
            dataIndex: 'type',
            key: 'type',
            width: 80,
            render: type => {
                if (type === 0) {
                    return <Tag>文章</Tag>
                }
                return '';
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
                return '';
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
                    <Popconfirm
                        title="确定删除?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => {
                            this.deletePost(item);
                        }}
                    >
                        <Icon type="delete"/>
                    </Popconfirm>
                </React.Fragment>
            ),
        }];
          
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
                <Table
                    size={'middle'}
                    rowKey={'id'}
                    columns={columns}
                    dataSource={rows}
                    pagination={pagination}
                />
            </div>
        );
    }
}
