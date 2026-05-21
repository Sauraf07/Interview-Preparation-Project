const AppError = require('../utils/AppError');

const validateRegister = ({ name, email, password, role }) => {
  if (!name || !name.trim()) {
    throw new AppError('Name is required', 400);
  }

  if (!email || !email.trim()) {
    throw new AppError('Email is required', 400);
  }

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Please provide a valid email', 400);
  }

  if (!password || password.length < 6) {
    throw new AppError('Password must be at least 6 characters', 400);
  }

  if (role && !['user', 'admin'].includes(role)) {
    throw new AppError('Invalid role', 400);
  }
};

const validateLogin = ({ email, password }) => {
  if (!email || !email.trim()) {
    throw new AppError('Email is required', 400);
  }

  if (!password) {
    throw new AppError('Password is required', 400);
  }
};

module.exports = { validateRegister, validateLogin };
