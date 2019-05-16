import React from 'react';
import {
    Input,
    Empty,
    Carousel,
    List,
    Card,
    Button,
    message
} from 'antd';
const Search=Input.Search;
import Tags from '../components/Tags';
import Rating from '../components/Rating';


export default class Recipes extends React.Component{
    state={
        recipes:JSON.parse(localStorage.getItem('mongodb_recipes'))||[],
        loading:false
    }
    handleSearch=(value)=>{
        fetch( `http://localhost:5000/api/recipes/${value}`,{
            method:'GET',
            headers:{
                'x-auth-token':document.cookie.split('=')[1]
            }
        })
            .then(res=>res.json())
            .then(data=>{
                this.setState({
                    recipes:data
                });
                localStorage.setItem('mongodb_recipes',JSON.stringify(data));
            });
    }
    addToLike(recipe){
      let oldRecipes=JSON.parse(localStorage.getItem('liked_recipes'))||[];
      oldRecipes.push(recipe);
      localStorage.setItem('liked_recipes',JSON.stringify(oldRecipes));
      message.success('收藏成功！');
    }
    render(){
        const {recipes}=this.state;
        return(
            <div style={{background:'#8ac',width:'90%',margin:'0 auto',padding:10}}>
                <Search
                    placeholder="搜索家常菜"
                    onSearch={value=>this.handleSearch(value)}
                    enterButton
                    style={{maxWidth:500}}
                />
                <br /><br />
                {
                    recipes.length>=1?
                    <Carousel  effect="fade" arrows={true}>
                    {
                        recipes.map((recipe,idx)=>
                            <div key={idx}>
                             <h1 style={{fontSize:30,textAlign:'center'}}>{recipe.title}</h1>
                             <img src={recipe.cover} referrerPolicy ="never" />
                             <p className='info'>
                             <span className='number'>{recipe.rating}</span>
                             <span className='title'>综合评分</span>
                             <span className='number'>{recipe.cooked}</span>
                             <span className='title'>人做过这道菜</span>
                             <Button type="primary" style={{marginLeft:'40%'}} onClick={this.addToLike.bind(null,recipe)}>收藏</Button>
                             </p>
                             <hr></hr>
                             <p style={{fontSize:20}}>{recipe.description}</p>
                            <List 
                            size="small"
                            header={<div>具体步骤</div>}
                            footer={<div>仅供参考哦！</div>}
                            bordered
                            dataSource={recipe.text}
                            renderItem={(item,idx) => (<List.Item key={idx}>
                            <Card title={`步骤${idx}`}>
                            {recipe.pictures&&recipe.pictures[idx]&&<img src={recipe.pictures[idx]} referrerPolicy ="never"/>}
                            {item}
                            </Card>
                            </List.Item>)}
                            />
                           
                    <br /><br />
                    <h2>小提示</h2>
                    <p>{recipe.tips}</p>
                    <Tags />
                    <Rating />
                     </div>)
                    }
                    </Carousel>
                    :
                    <Empty imageStyle={{width:300,height:300}} description={<span>"还没有这种菜谱哦！" <a href="/#/write">去创建菜谱</a> </span>} />
                }
            </div>
        )
    }
}