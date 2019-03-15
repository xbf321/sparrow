import * as React from 'react';
import { Button } from 'antd';

import { observable, toJS } from "mobx";
import { observer } from 'mobx-react';
import Form from './Form';
// import ReactMarkdown from 'react-markdown';
import './style.scss';

@observer
class Create extends React.Component {
    @observable postInfo = {};
    constructor(props) {
        super(props);
        const { uuid } = props.match.params;
        this.uuid = uuid;
    }
    async componentWillMount () {
        await this.fetchData();
    }
    async fetchData() {
        console.info(this.uuid);
        // Object.assign(this.queryParam, params);
        // this.list = (await axios.get('/api/posts', {
        //     params: this.queryParam
        // }) || {});
    }
    handleSave = () => {
        console.info('save',toJS(this.postInfo));
    }
    handleFormChange = (info = {}) => {
        this.postInfo = Object.assign({}, this.postInfo, info);
    }
    render() {
        const { title = '', content = ''} = this.postInfo;
        return (
            <div className="p-create">
                <div className="save-bar">
                    <Button type="primary" onClick={this.handleSave}>发布</Button>
                </div>
                <div className="editor-wrapper">
                    <Form
                        title={title}
                        content={content}
                        onChange={this.handleFormChange}
                    />
                </div>
            
                {/* <ReactMarkdown source={input} /> */}
            </div>
        );
    }
}

export default Create;