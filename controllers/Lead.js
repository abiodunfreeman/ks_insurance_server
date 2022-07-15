const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');
// @desc    Generate new lead in db emails info
// @route   POST /quote
// @access  Public
exports.postNewLead = async (req, res, next) => {
  console.log('post route ran');
  try {
    const newLead = await Lead.create(req.body);
    res.status(200).json(newLead);
    console.log('New Lead added to database'.brightGreen);
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
        subject: `New Lead - ${newLead.name}`,
        html: `<h1 style="color:red;text-align:center;">${newLead.name}</h1> <h1>${newLead.phone}</h1><h1>${newLead.email}</h1><p>${newLead.insurance_intrest}</p><p>${newLead.message}</p>`,
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
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    grab all leads in db
// @route   GET /lead/all
// @access  Public *We Need to make it private*
exports.getAllLeads = async (req, res, next) => {
  try {
    const leads = await Lead.find();
    res.status(200).json(leads);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    deletes one lead based on req.params.id
// @route   DELETE /lead/:id
// @access  Public *We Need to make it private*
exports.deleteLead = async (req, res, next) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, deletedLead });
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    GET one lead based on req.params.id
// @route   GET /lead/:id
// @access  Public
exports.getOneLead = async (req, res, next) => {
  try {
    const oneLead = await Lead.findById(req.params.id);
    res.status(200).json(oneLead);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
// @desc    Update one lead based on req.params.id
// @route   PUT /lead/:id
// @access  Public
exports.updateLead = async (req, res, next) => {
  try {
    const findLead = await Lead.findById(req.params.id);
    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      {
        contacted: !findLead.contacted,
      },
      { new: true }
    );
    res.status(200).json(lead);
  } catch (err) {
    console.log(`${err}`.red);
    res.status(400).json({ success: false, err: err.message });
  }
};
