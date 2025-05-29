const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    next({
      status: 422,
      message: 'Fill all input fields',
      extraDetails: err.errors?.[0]?.message || err.message,
    });
  }
};

module.exports = validate;
