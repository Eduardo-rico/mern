import User from '../models/user.model';
import extend from 'lodash/extend';
import errorHandler from './error.controller';

const create = async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(200).json({ message: 'Satisfactoriamente creado' });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select('name email updated created');
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
};

const userById = (req, res, next, id) => {};
const read = (req, res) => {};
const update = (req, res, next) => {};
const remove = (req, res, next) => {};

export default { create, list, userById, read, update, remove };
