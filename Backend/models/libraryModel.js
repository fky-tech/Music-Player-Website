// import express from 'express';
import mongoose from 'mongoose';

const librarySchema = mongoose.Schema({
    userID: String,
    favourites: {
        songs: [
            {
                trackID: String,
                trackName: String,
                artistName: String,
                albumName: String,
                albumImage: String,
                trackURL: String
            }
        ],
        albums: [
            {
                albumID: String,
                albumName: String,
                artistName: String,
                albumImage: String
            }
        ],
        artists: [
            {
                artistID: String,
                artistName: String,
                artistImage: String
            }
        ]
    }
});
const Library = mongoose.model('Library', librarySchema, 'library');

export default Library;
