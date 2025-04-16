import { Container, Grid2, Stack, IconButton, Typography, styled, InputBase,
  alpha, Card, CardMedia, Box, TableContainer, Table, TableHead, TableRow, TableCell, 
  TableBody,
  Slider,
  Button} from "@mui/material"
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { useEffect, useRef, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { useSelector } from "react-redux";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: 16,
  color: theme.palette.common.black,
  padding: 0,
  height: "40px"
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover":{
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
}))


const Artists = () => {
  const [hoveredRow, setHoveredRow] = useState(null)
  // const [artistAlbums, setArtistAlbums] = useState([])
  const [artistAlbumTracks, setArtistAlbumTracks] = useState([]);
  const artist = useSelector((state) => state.music.selectedArtist || null);
  const artistAlbum = useSelector((state) => state.music.selectedArtistAlbums || null);
  // setArtistAlbums(artistAlbum);
  // console.log(artistAlbum);

  // artistAlbums.map((item, index) => {
    // const handleAlbumTracks = async () => {
    //   try {
    //     const albumTracksRes = await axios.get(`http://localhost:3000/api/getArtistAlbumTracks?id=${item.id}`);
    //     console.log(albumTracksRes.data.data.results);
    //   } catch(error) {
    //     console.error("Error", error.message)
    //   }
    // }
    // handleAlbumTracks();
    

    useEffect(() => {
      // artistAlbum.map((item, index) => {
      const handleAlbumTracks = async () => {
        try {
          // const res = await axios.get(`http://localhost:3000/api/getArtistAlbumTracks?id=${item.id}`);
          // const albumTracksRes = res.data.data.results;
          // console.log(albumTracksRes);
          // setArtistAlbumTracks(albumTracksRes);
          const allTracks = await Promise.all(
            artistAlbum.map(async (item, index) => {
              const res = await axios.get(`http://localhost:3000/api/getArtistAlbumTracks?id=${item.id}`);
              return { albumIndex: index, tracks: res.data.data.results };
            })
          );
          console.log("all", allTracks)
          setArtistAlbumTracks(allTracks)
          console.log("Album Tracks", artistAlbumTracks);
          
        } catch(error) {
          console.error("Error", error.message)
        }
      }
      handleAlbumTracks();
    // })
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredRow(index)
  }

  const handleMouseLeave = () => {
    setHoveredRow(null)
  }

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const trackDuration = Math.floor(audioRef.current?.duration);
  const [visibleStack, setVisibleStack] = useState(1);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, "0")}`;
  }

  const handleProgressChange = (event, newValue) => {
    setProgress(newValue);
    audioRef.current.currentTime = newValue;
  }

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    const audioElement = audioRef.current;
    const updateProgress = () => {
      const currentTime = Math.floor(audioElement.currentTime);
      const totalDuration = Math.floor(audioElement.duration);
      
      if (currentTime <= totalDuration) {
        setProgress(currentTime);
      }
    };
    audioElement.addEventListener("timeupdate", updateProgress);
    return () => {
      audioElement.removeEventListener("timeupdate", updateProgress);
    }
  }, []);
  
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", position: "relative", backgroundColor: "darkslategray" }}>
      <HomeNavbar />
      <Container maxWidth="xl" sx={{ pt: 27, pb: 10 }}>
        {/* <HomeNavbar /> */}
        <Stack direction="column" spacing={17} sx={{ pl: 7}}>
          {/* Info about the track */}
          <Stack direction={{ xl: 'row', lg: 'column' }} spacing={5}>
            <Card sx={{ maxWidth: "300px", maxHeight: "260px", position: 'relative', flexShrink: 0 }}>
              <CardMedia
                component="img"
                image={artist.image}
                alt='Artist Img'
                sx={{ height: 270, width: 300 }}
              />
            </Card>
            <Stack direction="column" spacing={3} sx={{ pt: 2 }}>
              <Typography variant="h2" color="initial">{artist.name}</Typography>
              {/* Play, more, like buttons */}
              <Stack direction="row" spacing={3}>
                <IconButton aria-label="Play" variant="contained" color="primary"
                  sx={{ display: "flex", flexDirection: "row", gap: 1, width: { xl: "10%", lg: "10%" },
                  backgroundColor: "green", borderRadius: 5,
                    "&:hover": { backgroundColor: "darkgreen" }
                  }}
                >
                  <PlayCircleFilledOutlinedIcon sx={{ fontSize: 25, color: "white" }}/>
                  <Typography variant="body1" color="initial">Play</Typography>
                </IconButton>
                <IconButton aria-label="Play" variant="contained" color="primary"
                  sx={{ display: "flex", flexDirection: "row", gap: 1, width: { xl: "10%", lg: "10%" },
                  backgroundColor: "green", borderRadius: 5,
                    "&:hover": { backgroundColor: "darkgreen" }
                  }}
                >
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 25, color: "white" }}/>
                  <Typography variant="body1" color="initial">Like</Typography>
                </IconButton>
                <IconButton aria-label="Play" variant="contained" color="primary"
                  sx={{ display: "flex", flexDirection: "row", gap: 1, width: { xl: "10%", lg: "10%" },
                    backgroundColor: "green", borderRadius: 5,
                    "&:hover": { backgroundColor: "darkgreen" }
                  }}
                >
                  <MoreHorizOutlinedIcon sx={{ fontSize: 25, color: "white" }}/>
                  <Typography variant="body1" color="initial">More</Typography>
                </IconButton>
              </Stack>
              {/* Bio of the artist */}
              <Box sx={{ width: "50%", backgroundColor: "darkgray" }}>
                <Typography variant="body1" color="white" sx={{ padding: 2, textAlign: "justify", pr: 4 }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam id omnis
                  necessitatibus. Laboriosam reiciendis voluptatem tenetur voluptatum
                  nemo, non sunt a, fugit repellat sequi assumenda quidem quod pariatur. Beatae, porro?
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/* Albums of the artist */}
          <Stack>
            <Stack direction="row" spacing={5}
              sx={{ borderBottom: "1px solid black", width: "70%", padding: 1, pl: 4, }}
            >
              <Button onClick={() => setVisibleStack(1)}>
                <Typography variant="body1" color="initial" fontSize={19} fontWeight="bold">Albums</Typography>
              </Button>
              <Button onClick={() => setVisibleStack(2)}>
                <Typography variant="body1" color="initial" fontSize={19} fontWeight="bold">About</Typography>
              </Button>
            </Stack>


            {/* Album image and songs */}
            {visibleStack === 1 && (
              <>
              {artistAlbum.map((item, albumIndex) => (
              <Stack key={albumIndex} direction="column" spacing={20} sx={{ margin: 4, mt: 6 }}>
                {/* Album image */}
                {/* {artistAlbum.map((item, index) => (
                  <Card key={index} sx={{ maxWidth: "170px", maxHeight: "170px", position: 'relative', flexShrink: 0 }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt='Album Img'
                      sx={{ height: 170, width: 170 }}
                    />
                  </Card>
                ))} */}
                {/* {artistAlbumTracks.map((track, index) => ( */}
                <Stack direction="column" spacing={3}>
                  <Card sx={{ maxWidth: "170px", maxHeight: "170px", position: 'relative', flexShrink: 0 }}>
                    <CardMedia
                      component="img"
                      image={item.image}
                      alt='Album Img'
                      sx={{ height: 170, width: 170 }}
                    />
                  </Card>
                  <Stack direction="row" spacing={0}>
                    <IconButton onClick={togglePlayPause}>
                      {/* <PlayCircleFilledOutlinedIcon sx={{ fontSize: 50, color: "white" }}/> */}
                      {isPlaying ? <PauseCircleFilledOutlinedIcon sx={{ fontSize: 50, color: "white" }}/>
                      : <PlayCircleFilledOutlinedIcon sx={{ fontSize: 50, color: "white" }}/>}
                    </IconButton>
                    {/* Album name and current playing song */}
                    <Stack direction="column" spacing={0}>
                      <Typography variant="body1" color="initial" sx={{ mt: 1.5, fontWeight: "bold" }}>{item.name}</Typography>
                      <Typography variant="body2" color="initial">Song</Typography>
                    </Stack>
                  </Stack>
                  {/* Audio slider */}
                  <Stack direction="row" alignItems="center" spacing={3}>
                    <audio ref={audioRef} src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
                    {/* Start duration */}
                    <Typography variant="body2" color="initial">{formatTime(progress)}</Typography>
                    {/* Slider */}
                    <Slider 
                      value={progress}
                      aria-labelledby="time-indicator"
                      min={0}
                      max={trackDuration}
                      step={1}
                      onChange={handleProgressChange}
                      sx={{ width: "20rem" }}
                    />
                    {/* End duration */}
                    <Typography variant="body2" color="initial">{formatTime(trackDuration)}</Typography>
                  </Stack>

                  {/* All songs from the album */}
                  <TableContainer >
                    <Table sx={{ tableLayout: "fixed", maxWidth: "40rem"}}>
                      <TableBody>
                        {artistAlbumTracks
                        .filter((track => track.album_id === item.id))
                        .map((row, index) => (
                          <StyledTableRow
                            key={index}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            sx={{ width: "7px", height: "50px", padding: 0, pl: 3 }}
                          >
                            <TableCell
                            sx={{
                              padding: 0,
                              pl: 3,
                              width: "7px",
                            }}>
                              {hoveredRow === index ? (
                                <Stack direction="row" spacing={50}>
                                  <IconButton sx={{ padding: 0, color: "black" }}>
                                    <PlayArrowIcon />
                                  </IconButton>
                                  <IconButton sx={{ padding: 0, color: "black" }}>
                                    <MoreHorizOutlinedIcon />
                                  </IconButton>
                                </Stack>
                              ) : (
                                <Typography sx={{ padding: 0 }}>{index}</Typography>
                              )}
                            </TableCell>
                            <TableCell sx={{ width: "200px", padding: 0 }}>
                              <Box sx={{ ml: "0px" }}>{row.name}</Box>
                            </TableCell>
                            <TableCell sx={{ width: "20px", padding: 0 }}>
                              <IconButton>
                                <FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }}/>
                              </IconButton>
                            </TableCell>
                            <TableCell sx={{ width: "50px", padding: 0 }}>
                              <Box sx={{ ml: "5px" }}>{row.duration}</Box>
                            </TableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Stack>
                {/* ))} */}
              </Stack>
            ))}
            </>
            )}
            {visibleStack === 2 && (
              <Box sx={{ width: "50%", backgroundColor: "darkgray", margin: 5 }}>
                <Typography variant="body1" color="white" sx={{ padding: 2, textAlign: "justify", pr: 4 }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam id omnis
                  necessitatibus. Laboriosam reiciendis voluptatem tenetur voluptatum
                  nemo, non sunt a, fugit repellat sequi assumenda quidem quod pariatur. Beatae, porro?
                </Typography>
              </Box>
            )}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default Artists