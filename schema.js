const Joi=require("joi");

module.exports.blogSchema=Joi.object({
    blog:Joi.object({
        title:Joi.string().required(),
        blogs:Joi.string().required(),
        author:Joi.string().required(),
        image:Joi.string().allow("",null),
    }).required(),
});

// module.exports.reviewSchema=Joi.object({
//     review:Joi.object({
//         rating:Joi.number().required().min(1).max(5),
//         comment:Joi.string().required(),
//     }).required(),
// })

