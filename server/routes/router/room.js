const router = require('express').Router();
const passport = require('passport');
const {
  getAllRooms,
  getRoomBySlug,
  postRoom,
  verifyPassword,
  deleteRoomById,
  setUserOffline
} = require('../../controllers/roomController');

/** Get all rooms */
router.get('/', passport.authenticate('jwt', { session: false }), getAllRooms);

/** Get single room by slug */
router.get('/:slug', passport.authenticate('jwt', { session: false }), getRoomBySlug);

/** Save room */
router.post('/', passport.authenticate('jwt', { session: false }), postRoom);

/** Password verification */
router.post('/verification', passport.authenticate('jwt', { session: false }), verifyPassword);

/** Delete room */
router.delete('/:id', passport.authenticate('jwt', { session: false }), deleteRoomById);

/** Remove user on room leave event */
router.post('/remove/user', passport.authenticate('jwt', { session: false }), setUserOffline);

module.exports = router;
