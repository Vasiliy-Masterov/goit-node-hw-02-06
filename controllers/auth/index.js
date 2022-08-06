const signup=require('./signup');
const login=require('./login');
const getCurrent=require('./getCurrent');
const logout=require('./logout');
const verifyEmail=require('./verifyEmail');
const resendEmail=require('./resendEmail');

module.exports={
    signup,
    login,
    getCurrent,
    logout,
    verifyEmail,
    resendEmail
}