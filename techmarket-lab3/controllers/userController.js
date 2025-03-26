const User = require('../models/User');

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'username', 'email', 'first_name', 'last_name']
    });
    res.status(200).json({ status: 'success', count: users.length, data: users });
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'username', 'email', 'first_name', 'last_name']
    });

    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

exports.createUser = async (req, res, next) => {
  try {
    const { username, email, password_hash, first_name, last_name } = req.body;
    const newUser = await User.create({ username, email, password_hash, first_name, last_name });

    res.status(201).json({ status: 'success', data: newUser });
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    await user.update(req.body);
    res.status(200).json({ status: 'success', data: user });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });

    await user.destroy();
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.getUserReviews = async (req, res, next) => {
    try {
      const user = await User.findByPk(req.params.id, {
        include: [
          {
            model: Review,
            as: 'reviews',
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'name']
              }
            ],
            attributes: ['id', 'rating', 'comment', 'createdAt']
          }
        ]
      });
  
      if (!user) return res.status(404).json({ status: 'error', message: 'User not found' });
  
      res.status(200).json({ status: 'success', data: user });
    } catch (error) {
      next(error);
    }
  };
  
