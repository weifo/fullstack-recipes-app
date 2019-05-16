import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';
  // import request from  '../../utils/request';
import axios from 'axios';
import {message} from 'antd';
import Login from '../components/Login';
import Register from '../components/Register';
import loginBG from '../../assets/fullscreen.jpg';
  
const loginStyle={
  backgroundImage:`url(${loginBG})`,
  height:'100%',
  position:'fixed',
  zIndex:10,
  top:0,
  left:0,
  width:'100%',
  backgroundSize:'cover',
  display:'flex',
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column'
}
const style1={
  color:'#fff',
  fontSize:'1.5rem',
  cursor:'pointer'
}
  class NormalLoginForm extends React.Component {
    state={
      isLogin:true
    }
    render(){
      const {isLogin} =this.state;
      return (
        <div style={loginStyle}>
         {
           isLogin?
           <Login />
           :<Register />
         }
         {
           isLogin?
           <p style={style1} onClick={()=>this.setState({isLogin:!isLogin})}>还没有账号？免费去拿一个</p>
           :<p style={style1}  onClick={()=>this.setState({isLogin:!isLogin})}>去登录！</p>
         }
        </div>
      )
    }
  }
  
  const LoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);
  export default LoginForm; 