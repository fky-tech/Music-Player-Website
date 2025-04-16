import { Box, Button, Stack, Typography, Container } from "@mui/material"
import HomeNavbar from "../components/HomeNavbar"
import DiscoverMusic from "../components/DiscoverMusic"
import Tracks from "../components/Tracks"
import Albums from "../components/Albums"
import Artists from "../components/Artists"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { setSelectedAlbum, setSelectedAlbumTracks, setSelectedArtist, setSelectedArtistAlbums, setSelectedTrack } from "../store"

// import { useState } from "react"
// import zIndex from "@mui/material/styles/zIndex"

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const theme = useTheme();
  // const [showType, setShowType] = useState(null);
  // const [selectedMusic, setSelectedMusic] = useState(null);

  const handleTrackClick = (track) => {
    // setShowType(type);
    // setSelectedMusic(music);
    dispatch(setSelectedTrack(track)); // Save selected music to the Redux store
    navigate('/tracks');
  }
  const handleAlbumClick = (album, albumTracks) => {
    dispatch(setSelectedAlbum(album));
    dispatch(setSelectedAlbumTracks(albumTracks));
    navigate('/albums');
  }
  const handleArtistClick = (artist, artistAlbums) => {
    dispatch(setSelectedArtist(artist));
    dispatch(setSelectedArtistAlbums(artistAlbums));
    navigate('/artists');
  }
  return (
    <Box sx={{ width: "100%",  position: "relative" }}>
      <HomeNavbar />
      <Container maxWidth="xl" sx={{ pt: 35, }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1 }}>
            <source src="../../public/assets/2984380-hd_1280_720_24fps.mp4" type="video/mp4"/>
        </video>
        <Container maxWidth="xl" sx={{display: "flex", flexDirection: "column", gap: 3, height: "55vh"}}>
          <Typography variant="h1" color="initial"
            sx={{ width: { xs: '100%', sm: '75%', md: '30%' }, color: "white" }}
          >
            Listen To Music Anytime Anywhere
          </Typography>
          <Typography variant="h6" color="initial" lineHeight={1.5}
            sx={{ width: { xs: '100%', sm: '75%', md: '50%' }, color: "white" }}
          >
            Discover the magic of music with ..., where every note finds its perfect harmony.
            Whether you're vibing to the latest hits, diving into timeless classics, or curating your
            own unique playlists
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button variant="outlined">Login</Button>
            <Button variant="outlined">SignUp</Button>
          </Stack>
        </Container>
      </Container>
      <DiscoverMusic onTrackClick={handleTrackClick} onAlbumClick={handleAlbumClick} onArtistClick={handleArtistClick}/>
      {/* {showType ? (
        showType === 'tracks' ? (
          <Tracks music={selectedMusic}/>
        ) : showType === 'albums' ? (
          <Albums music={selectedMusic}/>
        ) : (
          <Artists music={selectedMusic}/>
        )
      ) : (
            <>
              <Container maxWidth="xl" sx={{ pt: 35, }}>
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100vh", objectFit: "cover", zIndex: -1 }}>
                    <source src="../../public/assets/2984380-hd_1280_720_24fps.mp4" type="video/mp4"/>
                </video>
                <Container maxWidth="xl" sx={{display: "flex", flexDirection: "column", gap: 3, height: "55vh"}}>
                  <Typography variant="h1" color="initial"
                    sx={{ width: { xs: '100%', sm: '75%', md: '30%' }, color: "white" }}
                  >
                    Listen To Music Anytime Anywhere
                  </Typography>
                  <Typography variant="h6" color="initial" lineHeight={1.5}
                    sx={{ width: { xs: '100%', sm: '75%', md: '50%' }, color: "white" }}
                  >
                    Discover the magic of music with ..., where every note finds its perfect harmony.
                    Whether you're vibing to the latest hits, diving into timeless classics, or curating your
                    own unique playlists
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <Button variant="outlined">Login</Button>
                    <Button variant="outlined">SignUp</Button>
                  </Stack>
                </Container>
              </Container>
              <DiscoverMusic onMusicClick={handleMusicClick}/>
            </>
          )} */}
        {/* <Tracks music={selectedMusic}/>
        {/* <Albums /> */}
        {/* <Artists /> */}
    </Box>
  )
}

export default Home