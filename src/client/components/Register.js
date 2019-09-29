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
        // console.log('Received values of form: ', values);
        values.avatar='http://i2.chuimg.com/49be7bea872c11e6b87c0242ac110003_680w_453h.jpg?imageView2/2/w/660/interlace/1/q/90';
        axios.post('/api/users',values)
        .then(res=>res.data)
        .then(({token,user})=>{
            message.success('注册成功！');
            localStorage.setItem('user',JSON.stringify(user));
            document.cookie=`token=${token}`;
            // document.location.reload();
            setTimeout(()=>{
              document.location.hash='';
            },1000);
        })
        .catch(err=>{
            let data=err.response.data
           message.error(data.msg);
          })
        ;
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
    callback('前后密码不一致！');
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
        label="电子邮箱"
        >
        {getFieldDecorator('email', {
            rules: [{
            type: 'email', message: '输入邮箱格式不正确！',
            }, {
            required: true, message: '该项不能为空',
            }],
        })(
            <Input />
        )}
        </Form.Item>
        <Form.Item
        label="密码"
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
        label="确认密码"
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
