const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const blogSchema=new Schema({
    title:{type:String,required:true},
    blogs:{
        type:String,
        required:true
    },
    image:{
        type:String,
        set:(v)=>v===""?"https://tse3.mm.bing.net/th?id=OIP.NWnITLblx9ipLhmWID3ovQHaE8&pid=Api&P=0&h=180":v,
    },
    author:{
        type:String,
        required:true,
    }
});

const Blogs=mongoose.model('Blogs',blogSchema);
module.exports=Blogs;