const Service = require('../models/service-model');

const createService = async (req, res) => {
  try {
    const response = await Service.find();

    return res.status(200).json({
      msg: response,
    });
  } catch (error) {
    res.status(500).json('Service not created');
  }
};
module.exports = createService;
