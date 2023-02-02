require('dotenv').config();
const {google} = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');

const sendEmail = async (req, res) => {
  main(req.body)
  .then((messageId) => res.json({message: 'Message sent successfully:', messageId: messageId}))
  .catch((err) => console.error(err));
}

const main = async (body) => {
  const options = {
    to: 'ronh7707@gmail.com',
    replyTo: 'ronh7707@gmail.com',
    subject: body.subject,
    text: body.message,
    textEncoding: 'base64',
    headers: [
      { key: 'X-Application-Developer', value: 'Rohan Harnale' },
      { key: 'X-Application-Version', value: 'v1.0.0.2' },
    ],
  };

  const messageId = await sendMail(options);
  return messageId;
};

const sendMail = async (options) => {
  const gmail = getGmailService();
  const rawMessage = await createMail(options);
  const { data: { id } = {} } = gmail.users.messages.send({
    userId: 'me',
    resource: {
      raw: rawMessage,
    },
  });
  return id;
};

const getGmailService = () => {
  const oAuth2Client = new google.auth.OAuth2(process.env.ID, process.env.SECRET);
  oAuth2Client.setCredentials({ refresh_token: process.env.RTOKEN });
  const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
  return gmail;
};

const encodeMessage = (message) => {
  return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

const createMail = async (options) => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};

module.exports = {
  sendEmail
};