// import { configureStore, createSlice } from "@reduxjs/toolkit";

// // Create a slice for music state
// const musicSlice = createSlice({
//   name: "music",
//   initialState: {
//     selectedMusic: null, // Initial state for the selected music
//   },
//   reducers: {
//     setSelectedMusic: (state, action) => {
//       state.selectedMusic = action.payload; // Update the selected music
//     },
//   },
// });

// // Export actions and reducer
// export const { setSelectedMusic } = musicSlice.actions;
// export const musicReducer = musicSlice.reducer;

// // Configure the Redux store
// const store = configureStore({
//   reducer: {
//     music: musicReducer,
//   },
// });

// export default store;



// import React from "react";
// import { Provider } from "react-redux";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Home from "./Home";
// import Tracks from "./Tracks";
// import store from "./store"; // Import Redux store

// const App = () => {
//   return (
//     <Provider store={store}>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/tracks" element={<Tracks />} />
//         </Routes>
//       </Router>
//     </Provider>
//   );
// };

// export default App;



// import React from "react";
// import DiscoverMusic from "./DiscoverMusic";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setSelectedMusic } from "./store";

// const Home = () => {
//   const dispatch = useDispatch(); // Get the Redux dispatch function
//   const navigate = useNavigate(); // For navigation

//   const handleMusicClick = (music) => {
//     dispatch(setSelectedMusic(music)); // Save selected music to the Redux store
//     navigate("/tracks"); // Navigate to the Tracks page
//   };

//   return (
//     <div>
//       <DiscoverMusic onMusicClick={handleMusicClick} />
//     </div>
//   );
// };

// export default Home;



// import React from "react";
// import { useSelector } from "react-redux";

// const Tracks = () => {
//   const music = useSelector((state) => state.music.selectedMusic); // Access selected music from Redux

//   if (!music) {
//     return <p>No track selected. Please go back and choose a track.</p>;
//   }

//   return (
//     <div>
//       <h2>Now Playing</h2>
//       <p>Title: {music.title}</p>
//       <p>Artist: {music.artist}</p>
//     </div>
//   );
// };

// export default Tracks;