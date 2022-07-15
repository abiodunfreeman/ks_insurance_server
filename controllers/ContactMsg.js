const ContactMsg = require('../models/ContactMsg');
const nodemailer = require('nodemailer');
// @desc    Create a new contact message
// @route   POST /contact-us
// @access  Public
exports.createContactMsg = async (req, res, next) => {
  try {
    const newMsg = await ContactMsg.create(req.body);
    const sendEmail = () => {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.email,
          pass: process.env.emailPassword,
        },
      });
      const mailOptions = {
        to: process.env.email,
        subject: `Contact Us - ${newMsg.name}`,
        html: `<h1 style="color:red;text-align:center;">${newMsg.name}</h1> <h1>${newMsg.email}</h1><p>${newMsg.msg}</p>`,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    };
    sendEmail();
    res.status(200).json(newMsg);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
