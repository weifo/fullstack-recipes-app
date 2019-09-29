import React from 'react';
import { Tabs,Avatar } from 'antd';

const TabPane = Tabs.TabPane;

export default class MyZone extends React.Component{
    state={
      likedRecipes:JSON.parse(localStorage.getItem('liked_recipes'))||[],
      user:JSON.parse(localStorage.getItem('user'))||null
    }
    callback(key){
        // console.log(key);
    }
    render(){
        const {user}=this.state;
        return(
            <div>
            <h1>用户<span>
                {user&&user.name}
                </span>的个人厨房</h1>
            <Tabs onChange={this.callback} type="card">
                <TabPane tab="概况" key="1">
                <h3>用户昵称</h3>
                <h3>{user&&user.name}</h3>
                <h3>用户头像</h3>
                <img src={user&&user.avatar} alt="头像" />
                </TabPane>
                <TabPane tab="菜谱" key="2">
                {
                   this.state.likedRecipes.map(recipe=>(
                       <div key={recipe._id}>
                       <h2>{recipe.title}</h2>
                       <img src={recipe.cover} />
                       <span>{recipe.rating}</span>
                       <span>{recipe.cooked}</span>
                       </div>
                   ))
                }
                </TabPane>
                <TabPane tab="作品" key="3">
                <h2>暂无作品</h2>
                </TabPane>
            </Tabs>
            </div>
        )
    }
}