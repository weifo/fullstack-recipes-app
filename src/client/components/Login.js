import React from 'react';
import {
    Form, Icon, Input, Button
  } from 'antd';
import axios from 'axios';
import {message} from 'antd';

const formStyle={
  padding:'30px 28px 0',
  borderRadius:'5%',
  boxShadow:'0 3px 5px #ccc',
  background:'#fff',
  textAlign:'center',
  width:'350px'
}
  class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          axios({
            method:'post',
            url:'/api/auth',
            data:values
          })
          .then(res=>res.data)
          .then(({token,user})=>{
            message.success('登录成功');
            document.cookie=`token=${token}`;
            localStorage.setItem('user',JSON.stringify(user));
            // document.location.reload();
            setTimeout(()=>{
              document.location.hash='';
            },1000);
          })
          .catch(err=>{
            let data=err.response.data
           message.error(data.msg);
          })
         }
        });
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form" style={formStyle}>
          <h2>登录</h2>
          <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}  placeholder="邮箱" />
            )}
          </Form.Item>
          <Form.Item style={{marginBottom:0}}>
            <Button type="primary" htmlType="submit" className="login-form-button">
              登录
            </Button>
            <span style={{display:'block',textAlign:'right'}}>
            或者 <a href="">现在去提个账号</a>
            </span>
          </Form.Item>
        </Form>
      );
    }
  }
  
  const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
  export default LoginForm; 