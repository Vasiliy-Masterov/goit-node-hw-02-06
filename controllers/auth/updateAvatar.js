const {User}=require('../../models/user');
const path=require('path');
const fs=require('fs/promises');
const Jimp=require('jimp');

const avatarDir=path.join(__dirname,"../../", "public", "avatars");

const updateAvatar=async(req,res)=>{
    const {path: tempUpload, originalname}=req.file;

try {  
    (await Jimp.read(tempUpload)).resize(250,250).write(tempUpload);
    const {_id} = req.user;
    const [extension] = originalname.split(".").reverse();
    const imageName = `${_id}.${extension}`;    
    const resultUpload=path.join(avatarDir, imageName);  
    await fs.rename(tempUpload, resultUpload);
    const avatarURL=path.join("public", "avatars", imageName);   
    await User.findByIdAndUpdate(_id,{avatarURL});
    res.json({avatarURL});   
    
} catch (error) {
    await fs.unlink(tempUpload);
    throw(error);
}
}

module.exports=updateAvatar;