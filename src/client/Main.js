import React from 'react';
import { Layout, Menu, Breadcrumb,Icon } from 'antd';
import { BrowserRouter, Switch, Route,Link } from "react-router-dom";
import App from './App'
import Recipe from './components/Recipe';
const { Header, Content, Footer } = Layout;
import LogoImg from '../assets/icon.png';
import CNRecipes from './pages/RecipesList';
import Login from './pages/Login';
import MyZone from './pages/MyZone';
import CreateRecipe from './pages/CreateRecipe';
import Single from './components/Steps';
import  './global.css'

const logoStyle={
  position:'relative',
  width: '41px',
  height: '41px',
  backgroundImage: `url(${LogoImg})`,
  backgroundSize:'contain',
  margin: '16px 24px 0px 0',
  float: 'left'
}
export default class Page extends React.Component{
    render(){
      return(
        <Layout className="layout">
        <Header style={{position:'fixed',width:'100vw',zIndex:5}}>
          <div className="logo" style={logoStyle} >
          <a href="/" style={{position:"absolute",top:0,bottom:0,left:0,right:0}}></a>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ lineHeight: '64px' }}
          >
            <Menu.Item key="1">搜菜谱
            <Link to="/"></Link>
            </Menu.Item>
            <Menu.Item key="2">
            写菜谱
            <Link to="/write">
            </Link>
            </Menu.Item>
            <Menu.Item key="3"> 分享菜谱
            <Link to="/social">
            </Link>
            </Menu.Item>
            <Menu.Item key="4"> 家常菜
            <Link to="/homely">
            </Link>
            </Menu.Item>
            <Menu.Item key="5"> 个人中心
            <Link to="/my">
            </Link>
            </Menu.Item>
          </Menu>
          <Link to="/login" style={{position:'absolute',right:'20px',top:5}}>
           <Icon type="user" style={{fontSize:'2rem',color:'#fff'}}></Icon>
          </Link>
        </Header>

        <Content style={{ padding: '0 50px',marginTop:60 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
            <Route path="/" component={App} exact />
            <Route path="/write" component={Single} />
            <Route path="/social" component={()=><h3>分享到你的社交平台</h3>} />
            <Route path="/homely" component={CNRecipes} />
            <Route path="/recipe/:id" component={Recipe} />
            <Route path="/login" component={Login} />
            <Route path="/my" component={MyZone} />
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
      )
    }
}
  