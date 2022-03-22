const { validationResult } = require('express-validator');

const validatorResult = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      data: req.body,
      errors: errors.mapped(),
      success: false,
    });
  }

  next();
};

module.exports = { validatorResult };
