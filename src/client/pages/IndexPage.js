import React from 'react';
import {
    Input,
    Button,
    Carousel,
    Card
} from 'antd';
import Recipe from '../components/RecipeModal';
const {Meta}=Card;


const data=['家常菜40076','快手菜40077', '下饭菜40078', '早餐40071', '猪肉731','鱼957','蔬菜178',
'鸡蛋394',
 '汤羹20130', '烘焙51761', '主食20130','面20133','素食51848',
'孕妇52333','产妇52333','婴儿30044','儿童30042'
];

const LeftPanel=(props)=>{
    return <div style={{float:'left',width:170,zIndex:2}}>
        <ul>
        {data.map((item,idx)=>{
           let info=item.match(/([\u4e00-\u9fff]+)(\d+)/);
           let posY=(-40)*parseInt(idx);
           return <li key={idx} style={{marginBottom:10,listStyle:'none'}}>
            <a href={`/#/category/${info[2]}/`} className="cat-link" >
            <i className="cat-icon" style={{backgroundPosition:`0px ${posY}px`,color:'#ddd'}} ></i>
             <span className="cat-name">{info[1]}</span>
           </a>
           </li>
        })}
        </ul>
        </div>
}
const MiddlePanel=(props)=>{
    let mylike=JSON.parse(localStorage.getItem('liked_recipes'));
    return  <div className="middle-panel">
    <Carousel autoplay style={{width:490,height:280}}>
    <div >
        <img src="http://i1.chuimg.com/d341ca4c45a511e7947d0242ac110002_1200w_800h.jpg@2o_50sh_1pr_1l_490w_260h_1c_1e_90q_1wh" alt=""/>
        <h3>玫瑰花馒头</h3>
    </div>
    <div>
      <img src="http://i2.chuimg.com/8a5834528ba011e6a9a10242ac110002_2000w_2000h.jpg?imageView2/1/w/490/h/260/interlace/1/q/90" alt=""/>
      <h3>牛奶椰蓉小方</h3>
    </div>
    <div>
      <img src="http://i2.chuimg.com/4689a7d68ab211e6a9a10242ac110002_1616w_1081h.jpg?imageView2/1/w/490/h/260/interlace/1/q/90" alt=""/>
      <h3>麻辣小龙虾--详细攻略</h3>
    </div>
    <div>
      <img src="http://i2.chuimg.com/a194ae4d414944acb9ad1169fa8d4acb_1436w_795h.jpg?imageView2/1/w/490/h/260/interlace/1/q/90" alt=""/>
      <h3>《向往的生活》 啫啫排骨</h3>
    </div>
    <div>
      <img src="http://i2.chuimg.com/638987e34c5e4de1a47d1c2f815d6110_2496w_1664h.jpg?imageView2/1/w/490/h/260/interlace/1/q/90" alt=""/>
      <h3>炸鲜奶</h3>
    </div>
  </Carousel>
  <div>
      <h2>为您推荐了以下菜谱</h2>
      <ul style={{minWidth:526}}>
          {
              mylike.map((item,idx)=>{

                return <li key={idx} style={{float:'left',listStyle:'none',width:'232',margin:'0 13px'}}>
                  {/* <Card
                  hoverable
                  style={{
                      
                  }}
                  >
                <Meta title={item.title} />  
                  </Card> */}
                  <div onClick={()=>props.handleFn(item,true)}>
                    <p style={{
                        width:235,
                        height:138,
                        background:`url(${item.cover}) center`  
                    }}
                    ></p>
                    <h3>{item.title}</h3>
                  </div>
                </li>
              })
          }
      </ul>
  </div>
  </div>
}
export default class Index extends React.Component{
    state={
      show_recipe:false,
      recipe:null
    }
    handleChild=(rcp,show)=>{
        console.log(rcp,show)
        this.setState({
            recipe:rcp,
            show_recipe:show
        })
    }
    callback=()=>{
        this.setState({
            show_recipe:false
        })
    }
    render(){
        return(
            <div style={{overflow:'hidden'}}>
                <LeftPanel />
                <MiddlePanel handleFn={this.handleChild} />
                <Recipe recipe={this.state.recipe} visible={this.state.show_recipe} cb={this.callback} />
            </div>
        )
    }
}
