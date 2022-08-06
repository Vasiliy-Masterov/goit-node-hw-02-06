const {User}=require('../../models/user');
const {createError}=require('../../helpers');

const verifyEmail=async(req,res)=>{
const {verificationToken}=req.param;
const result=await User.findOne(verificationToken);
if(!result){
    throw createError(404,"User not found");
}

await User.findByIdAndUpdate(result._id,{verify:true, verificationToken:null});

res.status(200).json=({
    message:"Verification successful"
})

}

module.exports=verifyEmail;