const { requireAuth } = require("../../middlewares/authMiddlewares");
const router = require('express').Router();
const {
  getAllRooms,
  getRoom,
  postRoom,
  verify,
  deleteRoom,
  setUserOffline
} = require('../../controllers/roomController');

/** Get all rooms */
router.get('/', requireAuth, getAllRooms);

/** Get single room by slug */
router.get('/:slug', requireAuth, getRoom);

/** Save room */
router.post('/', requireAuth, postRoom);

/** Password verification */
router.post('/verification', requireAuth, verify);

/** Delete room */
router.delete('/:id', requireAuth, deleteRoom);

/** Remove user on room leave event */
router.post('/remove/user', requireAuth, setUserOffline);

module.exports = router;
