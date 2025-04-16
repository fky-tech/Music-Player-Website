import express from 'express';
import { addToLibrary, addToPlaylist, createPlaylist, getAlbums, getAlbumTracks, getArtistAlbums, getArtistAlbumsTracks, getArtists, getTracks, login, registerUser, searchForAlbums, searchForArtists, searchForTracks } from '../controllers/controller.js';

const router = express.Router();

router.get('/login', login);
router.get('/register', registerUser);

router.get('/tracks', getTracks);
router.get('/tracks/:name', searchForTracks);
router.get('/albums', getAlbums);
router.get('/albumTracks', getAlbumTracks);
router.get('/albums/:name', searchForAlbums);
router.get('/artists', getArtists);
router.get('/getArtistAlbums', getArtistAlbums);
router.get('/getArtistAlbumTracks', getArtistAlbumsTracks);
router.get('/artists/:name', searchForArtists);

// Get userID from the frontend
router.post('/library/:userID', addToLibrary);
router.post('/createPlaylist', createPlaylist);
router.post('/addToplaylist/:playlistID', addToPlaylist);

export default router;