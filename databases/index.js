const mongoose=require("mongoose");
const initData=require("./blogsdata.js");
const Blogs=require("../models/blogs.js");

const MONGO_URL="mongodb://127.0.0.1:27017/sustainability";

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Blogs.deleteMany({});
    await Blogs.insertMany(initData.data1);
    console.log("data was initialised");
};

initDB();