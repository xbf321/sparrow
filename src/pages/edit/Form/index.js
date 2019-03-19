import * as React from 'react';
import { Input } from 'antd';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { observer } from 'mobx-react';
require('codemirror/mode/markdown/markdown');
import './style.scss';

@observer
class Form extends React.Component {
    render() {
        const { title, markdown_content, onChange = () => {} } = this.props;
        return (
            <div className="p-create-form">
                <div className="title-wrapper">
                    <div className="title-wrapper__line">
                        <Input
                            value={title}
                            className="title-wrapper__input"
                            placeholder="无标题"
                            onChange={(e) => {
                                onChange({
                                    title: e.target.value,
                                });
                        }} />
                    </div>
                </div>
                <CodeMirror
                    className="content-wrapper"
                    options={{
                        mode: 'markdown',
                    }}
                    value={markdown_content}
                    onBeforeChange={(editor, data, value) => {
                        onChange({
                            markdown_content: value,
                        });
                    }}
                />
            </div>
        );
    }
}
export default Form;