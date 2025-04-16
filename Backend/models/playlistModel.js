import mongoose from "mongoose";

const playlistSchema = mongoose.Schema({
      userID: String,
        playlist: [
            {
                playlistID: String,
                playlistName: String,
                tracks: [
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
            }
        ]     
});

const Playlist = mongoose.model('Playlist', playlistSchema, 'playlist');

export default Playlist;