// import mongoose from 'mongoose';
import axios from "axios";
import Library from "../models/libraryModel.js";
import Playlist from "../models/playlistModel.js";
import bcrypt from 'bcrypt';
import mySqlConnection from "../config/db.js";
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res) => {
    const { firstName, lastName, userName, email, password } = req.body;
    const hashedPwd = await bcrypt.hash(password);

    mySqlConnection.query('INSERT INTO users (firstName, lastName, userName, email, password) VALUES (?, ?, ?, ?, ?)',
        [firstName, lastName, userName, email, hashedPwd], (err) => {
            if (err) return res.status(500).json({ message: "Internal Server Error" });
            res.status(201).json({ success: true, message: "User registered" });
        }
    )
}

export const login = async (req, res) => {
    const { userName, password } = req.body;

    mySqlConnection.query('SELECT * FROM users WHERE userName = ?', [userName], async (err, results) => {
        if (err) return res.status(500).json({ message: "Internal Server Error" });
        if (results.length === 0) return res.status(400).json({ message: 'User not found' });

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid Key' });

        const token = jwt.sign({ userId: user.userID }, 'secret_key');
        res.json({ token });
    })
}

export const getTracks = async (req, res, next) => {
    try {
        const tracks = await axios.get('https://api.jamendo.com/v3.0/tracks?client_id=f0bf4a27&limit=10&include=musicinfo');
        // console.log(tracks.data);
        if (!tracks.data || tracks.data.length === 0) {
            const error = new Error("Tracks not found");
            error.status = 404;
            return next(error);
        }
        res.status(200).json({success: true, data: tracks.data});
    } catch(error) {
        console.error(`Error: ${error.message}`);

        const serverError = new Error("Internal Server Error");
        serverError.status = 500;
        next(serverError);
        // error.status = 500;
        // error.message = "Internal Server Error";
        // next(error);
        // res.status(500).json({ message: "Internal Server Error" });
    }
}

export const searchForTracks = async (req, res) => {
    try {
        const { name } = req.params;
        const response = await axios.get(`https://api.jamendo.com/v3.0/tracks/?client_id=f0bf4a27&format=json&search=${name}`);
        const tracks = response.data.results.filter((track) => track.name.toLowerCase().includes(name.toLowerCase()));
        res.status(200).json({success: true, data: tracks});
    } catch(error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAlbums = async (req, res) => {
    try {
        const albums = await axios.get('https://api.jamendo.com/v3.0/albums?client_id=f0bf4a27&limit=10');
        // console.log(tracks.data);
        res.status(200).json({success: true, data: albums.data});
    } catch(error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getAlbumTracks = async (req, res, next) => {
    try {
        const { id } = req.query;
        if(!id) {
            const error = new Error("Not Found");
            error.status = 400;
            return next(error);
        }
        const albumTracks = await axios.get(`https://api.jamendo.com/v3.0/tracks?client_id=f0bf4a27&album_id=${id}`);
        if (!albumTracks.data || albumTracks.data.length === 0) {
            const error = new Error("Tracks not found");
            error.status = 404;
            return next(error);
        }
        res.status(200).json({success: true, data: albumTracks.data});

    } catch(error) {
        console.error(`Error: ${error.message}`);
        const serverError = new Error("Internal Server Error");
        serverError.status = 500;
        next(serverError);
    }
}

export const searchForAlbums = async (req, res) => {
    try {
        const { name } = req.params;
        const album = await axios.get(`https://api.jamendo.com/v3.0/albums/?client_id=f0bf4a27&format=json&namesearch=${name}`);
        res.status(200).json({success: true, data: album.data});
    } catch(error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getArtists = async (req, res) => {
    try {
        const artists = await axios.get('https://api.jamendo.com/v3.0/artists?client_id=f0bf4a27&limit=10');
        // console.log(tracks.data);
        res.status(200).json({success: true, data: artists.data});
    } catch(error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getArtistAlbums = async (req, res, next) => {
    try {
        const { id } = req.query;
        if(!id) {
            const error = new Error("Not Found");
            error.status = 400;
            return next(error);
        }
        const artistAlbums = await axios.get(`https://api.jamendo.com/v3.0/albums?client_id=f0bf4a27&artist_id=${id}`);
        if (!artistAlbums.data || artistAlbums.data.length === 0) {
            const error = new Error("Tracks not found");
            error.status = 404;
            return next(error);
        }
        res.status(200).json({success: true, data: artistAlbums.data});
    } catch(error) {
        console.error("Error: ", error.message);
        const serverError = new Error("Internal Server Error");
        serverError.status = 500;
        next(serverError);
    }
}

export const getArtistAlbumsTracks = async (req, res, next) => {
    try {
        const { id } = req.query;
        if(!id) {
            const error = new Error("Not Found");
            error.status = 400;
            return next(error);
        }
        const artistAlbumsTracks = await axios.get(`https://api.jamendo.com/v3.0/tracks?client_id=f0bf4a27&album_id=${id}`);
        if (!artistAlbumsTracks.data || artistAlbumsTracks.data.length === 0) {
            const error = new Error("Tracks not found");
            error.status = 404;
            return next(error);
        }
        res.status(200).json({success: true, data: artistAlbumsTracks.data});
    } catch(error) {
        console.error("Error: ", error.message);
        const serverError = new Error("Internal Server Error");
        serverError.status = 500;
        next(serverError);
    }
}

export const searchForArtists = async (req, res) => {
    try {
        const { name } = req.params;
        const artist = await axios.get(`https://api.jamendo.com/v3.0/artists/?client_id=f0bf4a27&format=json&namesearch=${name}`);
        res.status(200).json({success: true, data: artist.data});
    } catch(error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addToLibrary = async (req, res) => {
    const {type, id} = req.body;

    let apiUrl;
    if (type === 'track') {
        apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=f0bf4a27&format=json&id=${id}`;
    } else if (type === 'album') {
        apiUrl = `https://api.jamendo.com/v3.0/albums/?client_id=f0bf4a27&format=json&id=${id}`;
    } else if (type === 'artist') {
        apiUrl = `https://api.jamendo.com/v3.0/artists/?client_id=f0bf4a27&format=json&id=${id}`;
    } else {
        res.status(400).json({ message: "Invalid type" });
    }

    try {
        const response = await axios.get(apiUrl);
        const data = response.data.results[0];

        let libraryData = await Library.findOne({ userID: req.params.userID });
        if (!libraryData) {
            libraryData = new Library({
                userID: req.params.userID,
                favourites: {
                    songs: [],
                    albums: [],
                    artists: []
                }
            });
        }

        if (type === 'track') {
            const track = {
                trackID: data.id,
                trackName: data.name,
                artistName: data.artist_name,
                albumName: data.album_name,
                albumImage: data.album_image,
                trackURL: data.audio
            }
            libraryData.favourites.songs.push(track);
        } else if (type === 'album') {
            const album = {
                albumID: data.id,
                albumName: data.name,
                artistName: data.artist_name,
                albumImage: data.image
            }
            libraryData.favourites.albums.push(album);
        } else if (type === 'artist') {
            const artist = {
                artistID: data.id,
                artistName: data.name,
                artistImage: data.image
            }
            libraryData.favourites.artists.push(artist);
        }

        await libraryData.save();
        res.status(200).json({success: true, data: libraryData});
        // res.status(200).json({success: true, data: data});
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const createPlaylist = async (req, res) => {
    const {userID, playlistID, playlistName} = req.body;

    try {
        let playListData = await Playlist.findOne({ userID });
        if (!playListData) {
            playListData = new Playlist({
                userID: userID,
                playlist: []
            });
        }

        const existingPlaylist = playListData.playlist.find((pl) => pl.playlistID === playlistID);
        if (existingPlaylist) {
            res.status(400).json({ message: "Playlist already exists" });
        } else {
            const newPlaylist = {
                playlistID: playlistID,
                playlistName: playlistName,
                tracks: [],
                albums: []
            };
            playListData.playlist.push(newPlaylist);
        }

        await playListData.save();
        res.status(200).json({success: true, data: playListData});
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const addToPlaylist = async (req, res) => {
    const {userID, playlistName, trackID} = req.body;
    let apiUrl = `https://api.jamendo.com/v3.0/tracks/?client_id=f0bf4a27&format=json&id=${trackID}`;

    try {
        const response = await axios.get(apiUrl);
        const data = response.data.results[0];

        let playListData = await Playlist.findOne({ userID: userID });
        if (!playListData) {
            playListData = new Playlist({
                userID: userID,
                playlist: []
            });
        }

        const existingPlaylist = playListData.playlist.find((pl) => pl.playlistID === req.params.playlistID);
        const track = {
            trackID: data.id,
            trackName: data.name,
            artistName: data.artist_name,
            albumName: data.album_name,
            albumImage: data.album_image,
            trackURL: data.audio
        }
        
        if (existingPlaylist) {
            existingPlaylist.tracks.push(track);
        } else {
            const newPlaylist = {
                playlistID: req.params.playlistID,
                playlistName: playlistName,
                tracks: [
                    {track}
                ],
                albums: []
            };
            playListData.playlist.push(newPlaylist);
        }

        await playListData.save();
        res.status(200).json({success: true, data: playListData});
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: "Internal Server Error" });
    }
}