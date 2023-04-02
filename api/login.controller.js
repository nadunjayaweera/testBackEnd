const { getUserByEmailAndPassword } = require('../dao/loginDAO');

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await getUserByEmailAndPassword(email, password);
    if (user) {
      res.status(200).json({
        id: user.id,
        email: user.email,
      });
    } else {
      res.status(401).json({
        message: 'Invalid email or password',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'An error occurred while logging in',
    });
  }
};

module.exports = {
  login,
};
