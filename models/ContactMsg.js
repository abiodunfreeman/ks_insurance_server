const mongoose = require('mongoose');
const ContactMsgSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please submit a name'],
    },
    email: {
      type: String,
      required: [true, 'please submit an email'],
    },
    msg: {
      type: String,
      required: [true, 'please submit a message'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact Message', ContactMsgSchema);
