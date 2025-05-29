const User = require('../models/user-models');
const bcrypt = require('bcryptjs');

// Home Logic

const home = async (req, res) => {
  try {
    res.status(200).send('Welcome To world Best code By router');
  } catch (error) {
    console.log(error);
  }
};

// Register Logic

const register = async (req, res) => {
  try {
    console.log(req.body);
    const {
      username,
      email,
      phone,
      password,
      postal_code,
      address,
      city,
      country,
    } = req.body;

    const userExist = await User.findOne({ email });
    console.log('User Exist:', userExist);
    if (userExist) {
      return res.status(201).json({ msg: 'email Already exists' });
    }

    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
      postal_code,
      address,
      city,
      country,
    });
    res.status(201).send({
      msg: 'Registration Successful',
      token: await userCreated.genrateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    res.status(500).json('internal server error');
  }
};

// Login Logic

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).send({
        msg: 'Login Successfull',
        token: await userExist.genrateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json('Invalid email or password');
    }
  } catch (error) {
    res.status(500).json('internal server error');
  }
};

const user = async (req, res) => {
  try {
    console.log(req, res);

    const userData = req.user;
    console.log('User:', userData);

    // if (!userData) {
    //   return res.status(404).json({ msg: 'User not found' });
    // }

    return res.status(200).json({ userData: userData });
  } catch (error) {
    console.error('Internal Server Error:', error);
    // res.status(500).json({ msg: 'Internal Server Error' });
  }
};

module.exports = { home, register, login, user };
