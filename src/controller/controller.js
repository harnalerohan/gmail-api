require('dotenv').config();
const {google} = require('googleapis');
const nodemailer = require('nodemailer');

const sendMail = async (req, res) => {
  const client_secret = process.env.SECRET
  const client_id = process.env.ID
  const redirect_uris = process.env.URIS
  const refresh_token = process.env.TOKEN

  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris);
  oAuth2Client.setCredentials({refresh_token: refresh_token});
  
  try{
    const access_token = oAuth2Client.getAccessToken();
    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAUTH2',
        user: process.env.USER,
        clientId: process.env.ID,
        clientSecret: process.env.SECRET,
        refreshToken: refresh_token,
        accessToken: access_token
      }
    });

    const mailOptions = {
      from: `${req.body.name}`,
      to: req.body.to ? req.body.to : process.env.TO,
      subject: req.body.subject,
      text: req.body.message
    }
    const result = await transport.sendMail(mailOptions);
    if(result.accepted.length > 0){
      res.status(200).json({
        status: "success",
        message: "email is sent succesfully."
      });
    }else{
      res.status(400).json({
        status: "failed",
        messgae: "failed to send email."
      })
    }
  }catch(e){
    console.log("error", e)
    res.status(400).json({
      status: "failed",
      message: e
    })
  }
}

module.exports = sendMail;