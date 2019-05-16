import React from 'react';

export default class CustomInput extends React.Component{
    state={
        focused:false
    }
    toggleInput=()=>{
        this.setState({
            focused:!this.state.focused
        });
    }
    render(){
        const {focused} =this.state;
        return (
            <div style={{position:'relative',width:'100%',overflow:'hidden'}}>
            这是
            <input className={focused?'show':'hidden'} type="text" onClick={this.toggleInput} />
            <span className={focused?'hidden':'show'} style={{position:'absolute',top:0,left:0,height:60,color:'#888',background:'#fffce9'}}>
            我是文字模板！
            </span>
            </div>
        )
    }
}