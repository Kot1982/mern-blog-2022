import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isUsed = await User.findOne({ username });
    if (isUsed) {
      return res.json({
        message: 'Цей користувач вже існує',
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = new User({
      username,
      password: hash,
    });
    await newUser.save();
    res.json({
      newUser,
      message: 'Реєстрація пройшла успішно',
    });
  } catch (error) {
    res.json({ message: 'Помилка при створенні користувача' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.json({
        message: 'Такого користувача не існує',
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.json({
        message: 'Введено неправильний пароль',
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({
      token,
      user,
      message: 'Ви успішно увійшли в систему',
    });
  } catch (error) {
    res.json({ message: 'Помилка при авторизації' });
  }
};

// Get Me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({
        message: 'Такого користувача не існує',
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );
    res.json({
      user,
      token,
    });
  } catch (error) {
    res.json({ message: 'Немає доступу' });
  }
};
