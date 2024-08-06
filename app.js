const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Blogs=require("./models/blogs.js");
const path=require("path");
const bodyParser = require('body-parser');
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const wrapAsync=require("./utils/wrapAsync.js");
const ExpressError=require("./utils/ExpressError.js");
const {blogSchema}=require("./schema.js");
const MONGO_URL="mongodb://127.0.0.1:27017/sustainability";
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");
const session=require("express-session");
const userRouter=require("./routes/user.js");
const flash=require("connect-flash");
const {isLoggedIn}=require("./middlewares.js");

//creating middleware for blogschema
const validateBlog=(req,res,next)=>{
    let {error}=blogSchema.validate(req.body);
    // console.log(error);
    if(error){
        let errMsg=error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400,errMsg);
    }
    else{
        next();
    }
};

const sessionOptions = {
    secret: 'your_secret_key_here',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // in ms
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use('/includes', express.static(path.join(__dirname, 'includes')));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.use((req, res, next) => {
    res.locals.successMsg = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser=req.user;
    next();
});
app.use("/",userRouter);


//home page
app.get("/",(req,res)=>{
    res.render("blogs/homepage.ejs");
});

// app.get("/demouser",async(req,res)=>{
//   let fakeUser=new User({
//     email:"student@gmail.com",
//     username:"student",
//   });
//  let registeredUser=await User.register(fakeUser,"helloworld");
//  res.send(registeredUser);
// });
//blogs route
app.get("/blogs",async(req,res)=>{
    const allBlogs=await Blogs.find({});
    res.render("blogs/index.ejs",{allBlogs});
});

//new route
app.get("/blogs/new",isLoggedIn,(req,res)=>{
    res.render("blogs/new.ejs");
});

//show route
app.get("/blogs/:id",wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const blog=await Blogs.findById(id).populate("owner");
    if(!blog){
        req.flash("error","Blog you requested for does not exist!");
        res.redirect("/blogs");
    }
    res.render("blogs/show.ejs",{blog});
})
);

//create route
app.post("/blogs",validateBlog,wrapAsync(async(req,res,next)=>{
    const  newBlog=new Blogs(req.body.blog);
    await newBlog.save();
    req.flash("success","New Blog Created!");
    res.redirect("/blogs");
})
);

//edit route
app.get("/blogs/:id/edit",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    const blog=await Blogs.findById(id);
    res.render("blogs/edit.ejs",{blog});
})
);

//update route

app.put("/blogs/:id",validateBlog,isLoggedIn,wrapAsync(async(req,res)=>{
    if(!req.body.blog){
        throw new ExpressError(400,"send valid data for blog");
    }
  let {id}=req.params;
  await Blogs.findByIdAndUpdate(id,{...req.body.blog});
//   res.redirect("/blogs");
  res.redirect(`/blogs/${id}`);
})
);

//delete route
app.delete("/blogs/:id",isLoggedIn,wrapAsync(async(req,res)=>{
    let {id}=req.params;
    let deletedBlog=await Blogs.findByIdAndDelete(id);
    console.log(deletedBlog);
    res.redirect("/blogs");
})
);

app.get("/climateawareness",(req,res)=>{
    res.render("cards.ejs");
});

app.get("/faq",(req,res)=>{
    res.render("./includes/faq.ejs");
});

app.get("/cp",(req,res)=>{
    res.render("./blogs/communityProjects.ejs");
});

app.get("/fot",(req,res)=>{
    res.render("./blogs/vedang.ejs");
});

app.get("/educationalhubs",(req,res)=>{
    res.render("./blogs/education.ejs");
});

app.get("/sustain",(req,res)=>{
   const imagePath=path.join(__dirname,'.vscode\QUANTONS\views\blogs\sustain.jpeg');
   res.sendFile(imagePath);
});

app.get("/quiz",(req,res)=>{
    res.render("./quiz/index.ejs");
});

app.get("/result",(req,res)=>{
    res.render("./quiz/result.ejs");
});

app.get("/newsapi",(req,res)=>{
    res.render("./blogs/news.ejs");
});
app.get("/petition1",(req,res)=>{
    res.render("./petitions/petition1/index.ejs");
}
);
app.get("/petition2",(req,res)=>{
    res.render("./petitions/petition2/index.ejs");
}
);
app.get("/petition3",(req,res)=>{
    res.render("./petitions/petition3/index.ejs");
}
);

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"Route not found!"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500,message="Something went wrong!"}=err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{message});
});

app.listen(3000,()=>{
    console.log("server is running on port 8080");
});