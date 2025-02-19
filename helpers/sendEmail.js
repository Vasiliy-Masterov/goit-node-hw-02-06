const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data)=> {
  
    const email = {...data, from: "vasiliy.masterov@gmail.com"};
  
    await sgMail.send(email)
    .then(()=> {console.log("Email send success")})
    .catch(error => console.log(error.message)); 
}

module.exports=sendEmail;
