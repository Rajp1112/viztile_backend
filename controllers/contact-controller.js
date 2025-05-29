const Contact = require('../models/contact-model');

// Contact Logic

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);

    return res.status(200).json({
      msg: 'message Submitted Successfully',
    });
  } catch (error) {
    res.status(500).json('message not sent');
  }
};
module.exports = contactForm;
