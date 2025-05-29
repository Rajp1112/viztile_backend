const User = require('../models/user-models');
const Contact = require('../models/contact-model');
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (users.length === 0) {
      res.status(404).json({ msg: 'No users found' });
    }
    return res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});

    if (contacts.length === 0) {
      res.status(404).json({ msg: 'No contacts found' });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    await User.deleteOne({ _id: id });
    res.status(200).json({ msg: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById({ _id: id }, { password: 0 });
    if (!user) {
      res.status(404).json({ msg: 'User not found' });
    }
    return res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedUserData = req.body;

    const updatedData = await User.updateOne(
      { _id: id },
      { $set: updatedUserData }
    );

    if (updatedData.matchedCount === 0) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (updatedData.modifiedCount === 0) {
      return res.status(400).json({ msg: 'No changes were made' });
    }

    return res
      .status(200)
      .json({ msg: 'User updated successfully', data: updatedData });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ msg: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  getAllContacts,
  deleteUserById,
  getUserById,
  updateUserById,
};
