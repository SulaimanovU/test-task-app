const { validationResult } = require('express-validator');
const Device = require('../models/device');
const User = require('../models/user');


exports.createDevice = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error('Validation failed, entered data is incorrect.');
      next(error);
    }
    
    const userEmail = req.body.user_email;
    const mас = req.body.mас;
    const type = req.body.type;
    
    try {
      const user = await User.findOne({ where: { email: userEmail } });
        
      if(!user){
        throw new Error('Such user with passed email could not found.')
      }
      
      const { id } = await user.createDevice({
        mас: mас,
        type: type
      });
      
      
      res.status(200).json({ result: id });
    }
    catch(err) {
        next(err);
    }
    
}

exports.getDevice = async (req, res, next) => {

  const { params: { id } } = req;
  
  try {
    const deviceInstance = await Device.findByPk(id);
      
    if(!deviceInstance){
      throw new Error('Such device could not found.')
    }

    const { name, email } = await deviceInstance.getUser();
    const { mас, type } = deviceInstance;

    res.status(200).json({ name, email, mас, type, id });
  }
  catch(err) {
      next(err);
  }
  
}

exports.deleteDevice = async (req, res, next) => {

  const { params: { id } } = req;
  
  try {
    const deviceInstance = await Device.findByPk(id);;
      
    if(!deviceInstance){
      throw new Error('Such device could not found.');
    }

    const { dataValues } = await deviceInstance.destroy();

    res.status(200).json({ ...dataValues, status: 'deleted' });
  }
  catch(err) {
      next(err);
  }
  
}










