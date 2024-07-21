const express=require("express");
const router=express.Router({mergeParams:true});
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport=require("passport");

router.get("/signup",wrapAsync((req,res)=>{
  res.render("users/signup.ejs");
})
);

router.post("/signup",wrapAsync(async(req,res)=>{
  try{
     let {username,email,password}=req.body;
    const newUser= new User({email,username});
    const registeredUser=await User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err)=>{
      if(err){
        req.flash("error", err.message);
       return res.redirect("/signup");
      }
      req.flash("success","Welcome to GreenGuardians!");
      res.redirect("/blogs");
    });
}catch(e){
  req.flash("error",e.message);
  res.redirect("/signup");
}
})
);

router.get("/login",(req,res)=>{
  res.render("users/login.ejs");
});

router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),async(req,res)=>{ 
  req.flash("success","Welcome back to GreenGuardians!");
  res.redirect("/blogs");
});

router.get("/logout",(req,res)=>{
  req.logout((err)=>{
    if(err){
     return  next(err);
    }
    req.flash("success","You are Logged Out!");
    res.redirect("/blogs");
  });
})

module.exports=router;