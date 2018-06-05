const express =require('express');
const router=express.Router();//创建路由对象
const fs=require('fs');
const path = require('path');



router.get("*",(req,res)=>{
    const html=fs.readFileSync(path.resolve(__dirname,'../view/trip/edit/index.html'),'utf-8');
    //console.log('1111111111111',html)
    res.send(html);
})
module.exports=router;
