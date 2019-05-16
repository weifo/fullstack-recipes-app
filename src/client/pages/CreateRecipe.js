import React from 'react';
import {
    Upload
} from 'antd';
import CustomInput from '../components/CustomInput';
import Cover from '../components/Cover';
import PicturesWall from '../components/ImageWall';
import Steps from '../components/Steps';

class CreateRecipe extends React.Component{
    state={
    }
    render(){
        return(
         <div>
         <h2>创建你的第一个菜谱</h2>
         <Cover />
         <PicturesWall />
        <Steps />
         </div>
        )
    }
}

export default CreateRecipe;