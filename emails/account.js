const sgMail = require('@sendgrid/mail');
const sendgridAPIkey = process.env.SEND_GRID_API;

sgMail.setApiKey(sendgridAPIkey);

const sendContactEmail = (name, email, subject, message) => {
  const msg = {
    to: 'holidayninjastaff@gmail.com',
    from: 'contact@fpd.pw',
    subject: 'Contact Request',
    templateId: 'd-7d3b7e94cb8148088a525908562bedb1',
    dynamicTemplateData: {
      Sender_Subject: subject,
      Sender_Name: name,
      Sender_Email: email,
      Sender_Message: message,
    },
  };

  sgMail.send(msg);
};

const sendWelcomeEmail = (name, email) => {
  const msg = {
    to: 'holidayninjastaff@gmail.com',
    from: 'contact@fpd.pw',
    subject: 'Welcome to Newbsanity!',
    templateId: 'd-15900cebb7684f42a479d0ce59749f8f',
    dynamicTemplateData: {
      User_Name: name,
      User_Email: email,
    },
  };

  sgMail.send(msg);
};

module.exports = {
  sendContactEmail,
  sendWelcomeEmail,
};
