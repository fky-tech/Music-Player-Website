import { Box, Container, Stack, CardMedia, Card, CardActionArea, CardContent, Button, IconButton, Link, Grid2 } from '@mui/material'
import Typography from '@mui/material/Typography'
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Tracks from './Tracks';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { useState } from 'react';
const DiscoverMusic = ({ onTrackClick, onAlbumClick, onArtistClick }) => {
  // const test = [
  //   {img: "https://picsum.photos/200/300", name: 'Track Name 1', Artist: "Artist Name", type: "tracks"},
  //   {img: "https://picsum.photos/300/400", name: 'Track Name', Artist: "Artist Name", type: "albums"},
  //   {img: "https://picsum.photos/250/350", name: 'Track Name', Artist: "Artist Name", type: "artists"},
  //   {img: "https://picsum.photos/270/370", name: 'Track Name', Artist: "Artist Name"},
  //   {img: "https://picsum.photos/240/340", name: 'Track Name', Artist: "Artist Name"},
  //   {img: "https://picsum.photos/230/330", name: 'Track Name', Artist: "Artist Name"},
  //   {img: "https://picsum.photos/260/360", name: 'Track Name', Artist: "Artist Name"},
  //   {img: "https://picsum.photos/280/380", name: 'Track Name', Artist: "Artist Name"},
  // ]

  const [tracks, setTracks] = useState([]);
  const [albums, setAlbums] = useState([]);
  // const [albumTracks, setAlbumTracks] = useState([]);
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/tracks/');
        setTracks(res.data.data.results);
        // console.log(res.data);
        console.log("Full API Response", res.data.data.results);
      } catch (error) {
        // if (error.response && error.response.status === 404) {
        //   console.error("Error fetching data", error.response.data.message);
        //   alert("Not found");
        // } else {
        //   console.error("Error fetching data", error.message);
        //   alert("Internal server error");
        // }
        console.error("Error fetching data", error.message);
      }

      try {
        const res = await axios.get('http://localhost:3000/api/albums/');
        setAlbums(res.data.data.results);
      } catch (error) {
        console.error("Error fetching data", error.message);
      }

      try {
        const res = await axios.get('http://localhost:3000/api/artists/');
        setArtists(res.data.data.results);
      } catch (error) {
        console.error("Error fetching data", error.message);
      }
    }
    fetchData();
  }, [])
  
  const handleAlbumClick = async (album_id, item) => {
    const res = await axios.get(`http://localhost:3000/api/albumTracks?id=${album_id}`);
    // console.log(res.data.data.results);
    // console.log(res.data.data.results.length);
    const albumTracks = res.data.data.results;
    // setAlbumTracks(res.data.data.results);

    onAlbumClick(item, albumTracks);
    // console.log("Albums", albumTracks)
  }

  const handleArtistAlbums = async (artist_id, artist) => {
    const albumRes = await axios.get(`http://localhost:3000/api/getArtistAlbums?id=${artist_id}`);
    const artistAlbums = albumRes.data.data.results;
    // console.log("Artist Albums", artistAlbums);

    onArtistClick(artist, artistAlbums)
  }

  // useEffect(() => {
  //   console.log("Updated Albums", albumTracks);
  // }, [albumTracks])

  // const [showTracks, setShowTracks] = useState(false);
  // const handleTracks = () => {
  //   setShowTracks(!showTracks);
  //   setShowTracks((prevState) => !prevState);
  // }

  return (
    <Box sx={{ width: "100%",  position: "relative" }}>
      <Container maxWidth="xl" sx={{ mt: "25vh", display: "flex", flexDirection: "column", gap: 15 }} >
        <Typography variant="h1" color="initial" sx={{ textAlign: 'center' }}>Discover Music</Typography>
        {/* Discover Songs */}
        <Stack direction={'column'} spacing={5}>
          <Typography variant="h3" color="initial">Songs</Typography>
            <Grid2 container spacing={10}>
              {tracks.map((item, index) => (
                <Grid2 sm={6} md={4} lg={3} key={index}>
                  <Card key={index} sx={{ maxWidth: "300px", position: 'relative' }}>
                    {/* Clickable card */}
                    <CardActionArea
                      sx={{
                          position: 'relative',
                          zIndex: 1,
                          "&:hover > .hoverContent": {
                              opacity: 1
                          },
                      }}
                      onClick={() => onTrackClick(item)}
                    >
                      <CardMedia
                          component="img"
                          image={item.image}
                          alt='Artist'
                          sx={{ height: 200, width: 300 }}
                      />
                      {/* A stack when the card is hovered display the play, more and favorite buttons */}
                      <Stack className="hoverContent" direction="row" spacing={9}
                        sx={{
                          position: 'absolute',
                          top: "80%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          opacity: 0,
                          transition: "opacity 0.3s ease-in-out",
                          zIndex: 2,
                        }}
                      >
                        <Stack direction="row" spacing={2}>
                          <IconButton color="primary"
                            onClick={(event) => {
                              event.stopPropagation();
                              console.log("Play button clicked!");
                            }}
                          >
                            <PlayCircleFilledOutlinedIcon sx={{ fontSize: 50, color: "white" }}/>
                          </IconButton>
                          <IconButton color="primary"
                            onClick={(event) => {
                              event.stopPropagation();
                              console.log("More button clicked!");
                            }}
                          >
                            <MoreHorizOutlinedIcon sx={{ fontSize: 35, color: "white" }}/>
                          </IconButton>
                        </Stack>
                        <IconButton variant="contained" color="primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            console.log("Favorite button clicked!");
                          }}
                        >
                          <FavoriteBorderOutlinedIcon sx={{ fontSize: 40, color: "white" }}/>
                        </IconButton>
                      </Stack>
                    </CardActionArea>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: 20 }}>
                      <Link href="#" underline="hover">{item.name}</Link>
                      <Link href="#" underline="hover">{item.artist_name}</Link>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
        </Stack>

        {/* Discover Albums */}
        <Stack direction={'column'} spacing={5}>
            <Typography variant="h3" color="initial">Albums</Typography>
            <Grid2 container spacing={10}>
              {albums.map((item, index) => (
                <Grid2 sm={6} md={4} lg={3} key={index}>
                  <Card key={index} sx={{ maxWidth: "300px", position: 'relative' }}>
                    <CardActionArea
                      sx={{
                          position: 'relative',
                          zIndex: 1,
                          "&:hover > .hoverContent": {
                              opacity: 1
                          },
                      }}
                      onClick={() => handleAlbumClick(item.id, item)}
                    >
                      <CardMedia
                          component="img"
                          image={item.image}
                          alt='Artist'
                          sx={{ height: 200, width: 300 }}
                      />
                      <Stack className="hoverContent" direction="row" spacing={9}
                        sx={{
                          position: 'absolute',
                          top: "80%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          opacity: 0,
                          transition: "opacity 0.3s ease-in-out",
                          zIndex: 2,
                        }}
                      >
                        <Stack direction="row" spacing={2}>
                          <IconButton color="primary">
                            {/* <PlayCircleFilledWhiteOutlinedIcon sx={{ fontSize: 40, color: "white" }}/> */}
                            <PlayCircleFilledOutlinedIcon sx={{ fontSize: 50, color: "white" }}/>
                          </IconButton>
                          <IconButton color="primary">
                            <MoreHorizOutlinedIcon sx={{ fontSize: 35, color: "white" }}/>
                          </IconButton>
                        </Stack>
                        <IconButton variant="contained" color="primary">
                          <FavoriteBorderOutlinedIcon sx={{ fontSize: 40, color: "white" }}/>
                        </IconButton>
                      </Stack>
                    </CardActionArea>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: 20 }}>
                      <Link href="#" underline="hover">{item.name}</Link>
                      <Link href="#" underline="hover">{item.artist_name}</Link>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
        </Stack>

        {/* Discover Artists */}
        <Stack direction={'column'} spacing={5}>
            <Typography variant="h3" color="initial">Artists</Typography>
            <Grid2 container spacing={10}>
              {artists.map((item, index) => (
                <Grid2 sm={6} md={4} lg={3} key={index}>
                  <Card key={index} sx={{ maxWidth: "300px", position: 'relative' }}>
                    <CardActionArea
                      sx={{
                          position: 'relative',
                          zIndex: 1,
                          "&:hover > .hoverContent": {
                              opacity: 1
                          },
                      }}
                      onClick={() => handleArtistAlbums(item.id, item)}
                    >
                      <CardMedia
                          component="img"
                          image={item.image}
                          alt='Artist'
                          sx={{ height: 200, width: 300 }}
                      />
                      <Stack className="hoverContent" direction="row" spacing={9}
                        sx={{
                          position: 'absolute',
                          top: "80%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          opacity: 0,
                          transition: "opacity 0.3s ease-in-out",
                          zIndex: 2,
                        }}
                      >
                        <Stack direction="row" spacing={2}>
                          <IconButton color="primary">
                            {/* <PlayCircleFilledWhiteOutlinedIcon sx={{ fontSize: 40, color: "white" }}/> */}
                            <PlayCircleFilledOutlinedIcon sx={{ fontSize: 50, color: "white" }}/>
                          </IconButton>
                          <IconButton color="primary">
                            <MoreHorizOutlinedIcon sx={{ fontSize: 35, color: "white" }}/>
                          </IconButton>
                        </Stack>
                        <IconButton variant="contained" color="primary">
                          <FavoriteBorderOutlinedIcon sx={{ fontSize: 40, color: "white" }}/>
                        </IconButton>
                      </Stack>
                    </CardActionArea>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1, fontSize: 20 }}>
                      <Link href="#" underline="hover">{item.name}</Link>
                      {/* <Link href="#" underline="hover">{t.Artist}</Link> */}
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
        </Stack>

        {/* Discover Genres */}
        <Box>
            <Typography variant="h3" color="initial">Genres</Typography>
        </Box>
      </Container>
    </Box>
  )
}

export default DiscoverMusic