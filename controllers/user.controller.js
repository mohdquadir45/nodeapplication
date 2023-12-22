const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { v4: uuidv4, validate: isUUID } = require('uuid');

const ObjectId = require('mongoose').Types.ObjectId

const User = require('../models/user.model')

router.get('/',async (req, res) => {
  
  try{
    const users=await User.find()
  return res.status(200).send({data:users});
}catch(err){
    return res.status(500).send({message: 'Internal Server Error'});
}

})
// GET user by ID
const validateUUID = (req, res, next) => {
  const userId = req.params.userId;
  if (!isUUID(userId, 4)) {
    return res.status(400).json({ message: 'Invalid userId format' });
  }
  next();
};
router.get('/:userId',validateUUID ,async (req, res) => {
    const userId = req.params.userId;
   
    try {
      const user = await User.findOne({id:userId});
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({data:user});
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
});
  
// POST create user
router.post('/', async (req, res) => {
   
    try {
      const { username, age, hobbies } = req.body;

      if (!username || !age) {
        return res.status(400).json({ message: 'Username and age are required fields' });
      }
      const newUser = {
        username,
        age,
        hobbies: hobbies || [], 
      };
      const user = await User.create(newUser);
      res.status(201).json({data:user});
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  
  // PUT update user by ID
  router.put('/:userId',validateUUID, async (req, res) => {
    const userId = req.params.userId;
    try {
      const user = await User.findOne({id:userId});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const { username, age, hobbies } = req.body;
  
      user.username = username || user.username;
      user.age = age || user.age;
      user.hobbies = hobbies || user.hobbies;
  
      const updatedUser = await user.save();
      res.status(200).json({data : updatedUser});
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  // DELETE user by ID
  router.delete('/:userId',validateUUID, async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const user = await User.findOne({id : userId});
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      let userDeleteById = await User.deleteOne({ id: req.params.userId })
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error', error:error.message });
    }
  });
  
  module.exports = router;
