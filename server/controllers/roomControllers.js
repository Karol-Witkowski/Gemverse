const Room = require('../models/Room');

export module {
  async findOne(request, response, next) {
  const findSlug = await Room.find({ request.param.slug })
  },
}