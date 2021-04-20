const { requireAuth } = require("../../middlewares/authMiddlewares");
const router = require('express').Router();
const {
  getAllRooms,
  getRoomBySlug,
  postRoom,
  verify,
  deleteRoomById,
  setUserOffline
} = require('../../controllers/roomController');

/** Get all rooms */
router.get('/', requireAuth, getAllRooms);

/** Get single room by slug */
router.get('/:slug', requireAuth, getRoomBySlug);

/** Save room */
router.post('/', requireAuth, postRoom);

/** Password verification */
router.post('/verification', requireAuth, verify);

/** Delete room */
router.delete('/:id', requireAuth, deleteRoomById);

/** Remove user on room leave event */
router.post('/remove/user', requireAuth, setUserOffline);

module.exports = router;
