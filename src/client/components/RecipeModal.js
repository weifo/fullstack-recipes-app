import React from 'react';
import {Modal,Card,Button,List} from 'antd';
const {Meta}=Card;
export default class RecipeModal extends React.Component{
    state={
     visible:false
    }
    handleOk = e => {
        // this.setState({
        //   visible: false,
        // });
        this.props.cb();
      };
    
      handleCancel = e => {
        // this.setState({
        //   visible: false,
        // });
        this.props.cb()
      };
    render(){
        const {recipe,visible}=this.props;
        return <Modal
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
    }
} 
