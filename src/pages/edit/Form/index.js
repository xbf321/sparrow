import * as React from 'react';
import { Input } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { observable } from "mobx";
import { observer } from 'mobx-react';
require('codemirror/mode/markdown/markdown');
import './style.scss';

@observer
class Form extends React.Component {
    @observable title = this.props.title;
    @observable content = this.props.content;
    handleChange = () => {
        const { onChange = () => {} } = this.props;
        onChange({
            title: this.title,
            content: this.content,
        });
    }
    render() {
        return (
            <div className="p-create-form">
                <div className="title-wrapper">
                    <div className="title-wrapper__line">
                        <Input
                            defaultValue={this.title}
                            className="title-wrapper__input"
                            placeholder="无标题"
                            onChange={(e) => {
                                this.title = e.target.value;
                                this.handleChange();
                        }} />
                    </div>
                </div>
                <CodeMirror
                    className="content-wrapper"
                    options={{
                        mode: 'markdown',
                    }}
                    value={this.content}
                    onBeforeChange={(editor, data, value) => {
                        this.content = value;
                    }}
                    onChange={(editor, data, value) => {
                        this.content = value;
                        this.handleChange();
                    }}
                />
            </div>
        );
    }
}
export default Form;