const {User, schemas}=require('../../models/user');
const {createError, sendEmail}=require('../../helpers');

const resendEmail=async(req,res)=>{
    const {error}=schemas.resendEmail.validate(req.body);
    if(error){
        throw createError(400, "missing required field email");
    }
    const {email,verificationToken}=req.body;
    const result=await User.findOne({email});
    if (result.verify){
        throw createError(400, "Verification has already been passed")
    }        
    
    const mail={
        to: email,
        subject:"Сonfirmation email",
        html:`<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Сonfirm email</a>`
    };
    
    await sendEmail(mail);

    res.status(200).json=({
        message: "Verification email sent"
    })
   
}
module.exports=resendEmail;