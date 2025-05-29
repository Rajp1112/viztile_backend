const adminMiddleware = async (req, res, next) => {
  try {
    // console.log(req.user);
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res.status(403).json({ msg: 'Access Denied' });
    }
    // res.status(200).json({ msg: req.user.isAdmin });
    next();
  } catch (error) {
    // console.log(error);
    res.status(500).json({ msg: 'Access Denaied' });
  }
};

module.exports = adminMiddleware;
