const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');
const {User, schemas} = require('../../models/user');
const { createError, sendEmail } = require('../../helpers');
const {nanoid}=require('nanoid');


const signup=async(req,res)=>{
const {error}=schemas.register.validate(req.body);
if(error){
    throw createError(400, error.message);
}
const {email, password}=req.body;

const user = await User.findOne({email});

if(user){
    throw createError(409, "Email in use");
}
const verificationToken=nanoid();
const avatarURL=gravatar.url(email);
const hashPassword=await bcrypt.hash(password, 10);
const result=await User.create({...req.body, password:hashPassword, avatarURL, verificationToken});

const mail={
    to: email,
    subject:"Сonfirmation email",
    html:`<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Сonfirm email</a>`
}

await sendEmail(mail);

res.status(201).json({
     user:{
        email:result.email,
        subscription:result.subscription,
        avatarURL,
        verificationToken

    }
    })
}

module.exports=signup;