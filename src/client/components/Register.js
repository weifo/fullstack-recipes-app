import React from 'react';
import {
    Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
  } from 'antd';
import axios from 'axios';
import {message} from 'antd';
  

const style1={
    background:'#fff',
    width:'450px',
    borderRadius:'20px 20px 80px 100px',
    padding:'20px',
    textAlign:'center'
}
class RegistrationForm extends React.Component {
state = {
    confirmDirty: false,
    autoCompleteResult: [],
};

handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
    if (!err) {
        console.log('Received values of form: ', values);
        axios.post('/api/users',values)
        .then(res=>console.log(res));
    }
    });
}

handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
}

compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
    callback('Two passwords that you enter is inconsistent!');
    } else {
    callback();
    }
}

validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
    form.validateFields(['confirm'], { force: true });
    }
    callback();
}

handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
    autoCompleteResult = [];
    } else {
    autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
}

render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
    };
    const tailFormItemLayout = {
    wrapperCol: {
        xs: {
        span: 24,
        offset: 0,
        },
        sm: {
        span: 16,
        offset: 8,
        },
    },
    };

    return (
    <Form {...formItemLayout} onSubmit={this.handleSubmit} style={style1}>
       <h2>开始你的美味之旅</h2>
        <Form.Item
        label="E-mail"
        >
        {getFieldDecorator('email', {
            rules: [{
            type: 'email', message: 'The input is not valid E-mail!',
            }, {
            required: true, message: 'Please input your E-mail!',
            }],
        })(
            <Input />
        )}
        </Form.Item>
        <Form.Item
        label="Password"
        >
        {getFieldDecorator('password', {
            rules: [{
            required: true, message: 'Please input your password!',
            }, {
            validator: this.validateToNextPassword,
            }],
        })(
            <Input type="password" />
        )}
        </Form.Item>
        <Form.Item
        label="Confirm Password"
        >
        {getFieldDecorator('confirm', {
            rules: [{
            required: true, message: 'Please confirm your password!',
            }, {
            validator: this.compareToFirstPassword,
            }],
        })(
            <Input type="password" onBlur={this.handleConfirmBlur} />
        )}
        </Form.Item>
        <Form.Item
        label={(
            <span>
            昵称&nbsp;
            <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
            </Tooltip>
            </span>
        )}
        >
        {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
        })(
            <Input />
        )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
        {getFieldDecorator('agreement', {
            valuePropName: 'checked',
        })(
            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
        )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">Register</Button>
        </Form.Item>
    </Form>
    );
}
}

const registrationForm = Form.create({ name: 'register' })(RegistrationForm);
export default registrationForm;
