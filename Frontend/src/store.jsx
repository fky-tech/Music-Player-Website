import { configureStore, createSlice } from "@reduxjs/toolkit";

const musicSlice = createSlice({
    name: 'music',
    initialState:{
        selectedTrack: null,
        selectedAlbum: null,
        selectedAlbumTracks: [],
        selectedArtist: null,
        selectedArtistAlbums: [],
    },
    reducers: {
        setSelectedTrack: (state, action) => {
            state.selectedTrack = action.payload;
        },
        setSelectedAlbum: (state, action) => {
          state.selectedAlbum = action.payload;
        },
        setSelectedAlbumTracks: (state, action) => {
          state.selectedAlbumTracks = action.payload;
        },
        setSelectedArtist: (state, action) => {
          state.selectedArtist = action.payload;
        },
        setSelectedArtistAlbums: (state, action) => {
          state.selectedArtistAlbums = action.payload;
        },
    }
})

export const { setSelectedTrack } = musicSlice.actions
export const { setSelectedAlbum } = musicSlice.actions
export const { setSelectedAlbumTracks } = musicSlice.actions
export const { setSelectedArtist } = musicSlice.actions
export const { setSelectedArtistAlbums } = musicSlice.actions
export const musicReducer = musicSlice.reducer


const store = configureStore({
  reducer: {
    music: musicReducer,
  },
})

export default store