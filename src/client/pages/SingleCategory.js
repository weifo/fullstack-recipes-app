import React from 'react';
import {
    Input,
    Button,
    message,
    Card,
    Modal,
    List
} from 'antd';
const {Meta} =Card;
import request from '../../utils/request'
const hoverData=['家常菜40076','快手菜40077', '下饭菜40078', '早餐40071', '减肥30048',
 '汤羹20130', '烘焙51761', '小吃40073', '猪肉731', '鸡肉1136', '牛肉1445', '鱼957', '鸡蛋394', '土豆206', '茄子178',
  '豆腐80', '小龙虾5322', '笋534', '椰子2819', '龙虾2918', '柠檬1299', '榴莲602' ,'山药524' ,'莴笋1010303'
];
let grid_imgs=[
    'http://i2.chuimg.com/fa7e385c885911e6a9a10242ac110002_1000w_732h.jpg?imageView2/1/w/140/h/140/interlace/1',
    'http://i2.chuimg.com/d77dbb608a1711e6a9a10242ac110002_1172w_824h.jpg?imageView2/1/w/140/h/140/interlace/1',
    'http://i1.chuimg.com/af2a5c56872711e6b87c0242ac110003_690w_458h.jpg@2o_50sh_1pr_1l_140w_140h_1c_1e_1wh',
    'http://i2.chuimg.com/b1509d44888311e6b87c0242ac110003_640w_480h.jpg?imageView2/1/w/140/h/140/interlace/1',
    'http://i2.chuimg.com/bfda128888eb11e6a9a10242ac110002_800w_531h.jpg?imageView2/1/w/140/h/140/interlace/1',
    'http://i2.chuimg.com/a6afc512885c11e6b87c0242ac110003_620w_465h.jpg?imageView2/1/w/140/h/140/interlace/1'
  ]
let grid_names=[
  '水馒头','生煎','煎饼果子','肠粉','烧饼','双皮奶'
]
const Side=(props)=>{
    return<div>
        <ul>
        {
            props.data.map((item,idx)=>{
                let info=item.match(/([\u4e00-\u9fff]+)(\d+)/);
                return<li key={idx}>
                  <a href={`category/${info[2]}/`}>{info[1]}</a>
                </li>
            })
        }
        </ul>
    </div>
}
const Grid=(props)=>{
  return <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gridGap:10,
  gridAutoColumns:'minmax(100px,auto)'
//   : 'repeat(3, 1fr)'
//   grid-gap: 10,
//   grid-auto-rows: 'minmax(100px, auto)''
}}>
      {
        props.data.map((item,idx)=><div key={idx} >
            <p style={{background:`url(${grid_imgs[idx]}) center/cover no-repeat `,width:98,height:98}}></p>
            <h4>{item}</h4>
            </div>
            )
      }
  </div>
}
export default class Single extends React.Component{
   state={
     category:this.props.match.params.category_id,
     recipes:[],
     title:"",
     recipe:null,
     visible:false,
     
   }
   componentDidMount(){
     request(`/category/${this.state.category}`)
      .then(res=>{
          if(res.length>=1){
              message.success('为您找到了20条相关菜谱！');
              this.setState({
                  recipes:res[0].data,
                  title:res[0].title
              })
          }else{
           message.info('数据还未入库，抱歉！');   
          }
      })
    // .then(res=>console.log(res))
   }
   handleOk = e => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
   render(){
     const {recipe,recipes,visible}=this.state;
       return <div>
           <h2>{this.state.title}</h2>
           {/* <Side data={hoverData} /> */}
           <h2>相关菜谱推荐</h2>
           <Grid data={grid_names} />
           <div>
           {
               recipes.map((item,idx)=>{
                 return <div style={{display:'flex',width:'50%',float:'left'}} key={idx}>
                <p style={{width:215,height:138,overflow:'hidden'}}>
                <img alt="example" src={item.cover} style={{width:215,height:'auto'}} 
                 onClick={()=>this.setState({visible:true,recipe:recipes[idx]})}
                title={item.title} />
                </p>
                <ul className="recipe_desc">
                <h3 style={{fontWeight:800}}>{item.title}</h3>
                <li>综合评分<span>{item.rating}</span></li>
                <li><span>{item.cooked}</span> 人做过这道菜</li>
                <li>{item.author}</li>
                </ul>

                 </div>
               })
           }
           <Modal
          title={recipe?recipe.title:" "}
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {
            recipe&&<div >
            <h1 style={{fontSize:30,textAlign:'center'}}>{recipe.title}</h1>
            <div style={{height:420,background:`url(${recipe.cover}) center/cover no-repeat`,overflow:'hidden'}}></div>
            {/* <img src={recipe.cover} referrerPolicy ="never" /> */}
            <p className='info'>
            <span className='number'>{recipe.rating}</span>
            <span className='title'>综合评分</span>
            <span className='number'>{recipe.cooked}</span>
            <span className='title'>人做过这道菜</span>
            <Button type="primary" style={{marginLeft:'40%'}} >收藏</Button>
            </p>
            <hr></hr>
            <p style={{fontSize:20}}>{recipe.description}</p>
           <List 
           size="small"
           header={<div>具体步骤</div>}
           footer={<div>仅供参考哦！</div>}
          //  bordered
           dataSource={recipe.text}
           renderItem={(item,idx) => (<List.Item key={idx}>
           <Card title={recipe.title}
           hoverable
           cover={
             recipe.pictures&&recipe.pictures[idx]
             &&<img src={recipe.pictures[idx]} style={{width:300,float:'right'}} referrerPolicy ="never"/>
            }
            style={{width:'100%'}}
           >
           <Meta title={`步骤${idx+1}`} description={item} />
           </Card>
           </List.Item>)}
           />
          
   <br /><br />
   <h2>小提示</h2>
   <p>{recipe.tips}</p>
    </div>
          }
        </Modal>
           </div>
       </div>
   }
}