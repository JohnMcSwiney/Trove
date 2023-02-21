const express = require('express');
const router = express.Router();
const {
  getAllPlaylist,
  getAPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist
} = require('../../admin controllers/playlist/playlistController');

router.get('/', getAllPlaylist)

router.get('/:id', getAPlaylist)

router.patch('/:id', updatePlaylist)

router.post('/', createPlaylist)

router.delete('/:id', deletePlaylist)
module.exports = router;