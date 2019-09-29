const express=require('express');
var cors=require('cors');

const app=express();
app.use(express.json());
const router=app.router();

app.get('/:name',(req,res)=>{
    let reqInfo={
        name:req.params.name,
        age:'unkonwn'
    }
    res.cookie('user','weifo');
   res.json(reqInfo);
   
})

app.listen(3000,(err)=>console.log(err));