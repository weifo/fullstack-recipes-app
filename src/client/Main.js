import React from 'react';
import { Layout, Menu, Breadcrumb,Icon,Avatar,Popover } from 'antd';
import { BrowserRouter, Switch, Route,Link } from "react-router-dom";
// import App from './App'
import App from './pages/IndexPage';
import Recipe from './components/Recipe';
const { Header, Content, Footer } = Layout;
import LogoImg from '../assets/icon.png';
import CNRecipes from './pages/RecipesList';
import Login from './pages/Login';
import MyZone from './pages/MyZone';
import CreateRecipe from './pages/CreateRecipe';
import Single from './components/Steps';
import Category from './pages/Category';
import SingleCategory from './pages/SingleCategory';
import  './global.css'
// import './App.css';

const hoverData=['家常菜40076','快手菜40077', '下饭菜40078', '早餐40071', '减肥30048',
 '汤羹20130', '烘焙51761', '小吃40073', '猪肉731', '鸡肉1136', '牛肉1445', '鱼957', '鸡蛋394', '土豆206', '茄子178',
  '豆腐80', '小龙虾5322', '笋534', '椰子2819', '龙虾2918', '柠檬1299', '榴莲602' ,'山药524' ,'莴笋1010303'];
const HoverUl=(props)=>{
  return <ul style={{display:'flex',flexDirection:'column',lineHeight:2,padding:'5px 10px'}}>
    <h4>{props.title}</h4>
    {props.data.map((item,idx)=>{
      let info=item.match(/([\u4e00-\u9fff]+)(\d+)/);
      return <a key={idx} href={`#/category/${info[2]}/`}>
        {info[1]}
      </a>
    })}
  </ul>
}
class Hover extends React.Component{
  render(){
    return <div style={{background:'#f3f3f3',position:'absolute',padding:5,display:this.props.show,width:260,flexWrap:'wrap',top:55,left:-60}}>
      <HoverUl data={hoverData.slice(0,8)} title="常用主题" />
      <HoverUl data={hoverData.slice(8,16)} title="常见食材" />
      <HoverUl data={hoverData.slice(16,24)} title="时令食材" />
      <p style={{borderTop:'1px solid #fff',textAlign:'center',marginBottom:0,width:'100%'}}>
        <a href="/#/category">查看所有分类</a>
      </p>
    </div>
  }
}
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
  state={
    show:false,
    user:JSON.parse(localStorage.getItem('user'))||null
  }
  componentDidMount(){
    this.setState({
      user:JSON.parse(localStorage.getItem('user'))||null
    });
  }
  toggleHover=()=>{
   this.setState({
     show:!this.state.show
   });
  }
  logOut=()=>{
    this.setState({
      user:null
    });
    localStorage.removeItem('user');
    location.hash='/login';
  }
    render(){
      const {show,user}=this.state;
      const content=<ul style={{padding:0,listStyle:'none'}}>
                    <li>
                      <a href="/#/my" style={{textDecoration:'none'}} className="normal_link">个人中心</a>
                    </li>
                    <li onClick={this.logOut}>退出</li>
                  </ul>
      return(
        <Layout className="layout">
        <Header style={{position:'fixed',width:'100vw',zIndex:5}}>
          <div className="logo" style={logoStyle} >
          <a href="/" style={{position:"absolute",top:0,bottom:0,left:0,right:0}} className="normal_link"></a>
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
            <Menu.Item key="3" onMouseEnter={this.toggleHover} onMouseLeave={this.toggleHover}> 分类菜谱
            <Link to="/category">
            </Link>
            <Hover show={show?'flex':'none'} />
            </Menu.Item>
            <Menu.Item key="4"> 家常菜
            <Link to="/homely">
            </Link>
            </Menu.Item>
          </Menu>
          {
            user?(<div  style={{position:'absolute',right:20,top:5}}>
              <Popover content={content} placement="bottom" trigger="hover">
              <Avatar src={user.avatar} />
              </Popover>
               <span>{user.name}</span>
            </div>):
             (<Link to="/login" style={{position:'absolute',right:20,top:5}} className="normal_link">
             <Icon type="user" style={{fontSize:'2rem',color:'#fff'}}></Icon>
            </Link>)
          }
         
        </Header>

        <Content style={{ padding: '0 50px',marginTop:60 }}>
          <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
            <Switch>
            <Route path="/" component={App} exact />
            <Route path="/write" component={Single} />
            <Route path="/category" component={Category} exact />
            <Route path="/category/:category_id" component={SingleCategory} />
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
  