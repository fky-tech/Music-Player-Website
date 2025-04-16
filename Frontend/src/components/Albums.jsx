import { Container, Grid2, Stack, IconButton, Typography, styled, InputBase,
  alpha, Card, CardMedia, Box, TableContainer, Table, TableHead, TableRow, TableCell, 
  TableBody} from "@mui/material"
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.white, 0.5),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: '53%',
  },
  [theme.breakpoints.up('lg')]: {
    width: '33%',
  },
}));

const SearchWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),
  position: 'absolute',
  height: '100%',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  padding: theme.spacing(.5, 12, .5, 6),
  width: '100%',
}))

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

const Albums = () => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const album = useSelector((state) => state.music.selectedAlbum || null); // Access selected album from redux store
  const albumTracks = useSelector((state) => state.music.selectedAlbumTracks || null);
  // const music = useSelector((state) => state.music);
  // console.log("Album Tracks", music);


  const handleMouseEnter = (index) => {
    setHoveredRow(index)
  }

  const handleMouseLeave = () => {
    setHoveredRow(null)
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", position: "relative", backgroundColor: "darkslategray" }}>
      <HomeNavbar />
      <Container maxWidth="xl" sx={{ pt: 27, pb: 10}}>
        <Stack direction="column" spacing={13} sx={{ pl: 7}}>
          {/* Info about the Album */}
          <Stack direction={{ xl: 'row', lg: 'column' }} spacing={5}>
            <Card sx={{ maxWidth: "300px", position: 'relative' }}>
              <CardMedia
                component="img"
                image={album.image}
                alt='Artist Img'
                sx={{ height: 270, width: 300 }}
              />
            </Card>
            <Stack direction="column" spacing={3} sx={{ pt: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h2" color="initial">{album.name}</Typography>
                <Typography variant="body1" color="initial">{album.artist_name}</Typography>
              </Box>
              <Typography variant="body1" color="initial">17 tracks. 1hr 5min</Typography>
              <Stack direction="row" spacing={3}>
                <IconButton aria-label="Play" variant="contained" color="primary"
                  sx={{ display: "flex", flexDirection: "row", gap: 1, width: { xl: "35%", lg: "10%" },
                  backgroundColor: "green", borderRadius: 5,
                    "&:hover": { backgroundColor: "darkgreen" }
                  }}
                >
                  <PlayCircleFilledOutlinedIcon sx={{ fontSize: 25, color: "white" }}/>
                  <Typography variant="body1" color="initial">Play</Typography>
                </IconButton>
                <IconButton aria-label="Play" variant="contained" color="primary"
                  sx={{ display: "flex", flexDirection: "row", gap: 1, width: { xl: "35%", lg: "10%" },
                  backgroundColor: "green", borderRadius: 5,
                    "&:hover": { backgroundColor: "darkgreen" }
                  }}
                >
                  <FavoriteBorderOutlinedIcon sx={{ fontSize: 25, color: "white" }}/>
                  <Typography variant="body1" color="initial">Like</Typography>
                </IconButton>
                <IconButton aria-label="Play" variant="contained" color="primary"
                  sx={{ display: "flex", flexDirection: "row", gap: 1, width: { xl: "35%", lg: "10%" },
                    backgroundColor: "green", borderRadius: 5,
                    "&:hover": { backgroundColor: "darkgreen" }
                  }}
                >
                  <MoreHorizOutlinedIcon sx={{ fontSize: 25, color: "white" }}/>
                  <Typography variant="body1" color="initial">More</Typography>
                </IconButton>
              </Stack>
            </Stack>
          </Stack>

          {/* Search for track */}
          <Search sx={{ flex: 1 }}>
            <SearchWrapper>
              <SearchIcon />
            </SearchWrapper>
            <StyledInputBase
              placeholder='Search...'
              inputProps={{ 'arial-label': 'search' }}
            >
            </StyledInputBase>
          </Search>

          {/* List of tracks */}
          <TableContainer >
            <Table sx={{ tableLayout: "fixed", maxWidth: "50rem"}}>
              <TableHead>
                <TableRow>
                  <StyledTableCell sx={{ width: "7px", pl: 3 }}>#</StyledTableCell>
                  <StyledTableCell sx={{ width: "200px" }}>
                    <Box sx={{ ml: "0px" }}>Title</Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "20px" }}>
                    <Box sx={{ ml: "5px" }}></Box>
                  </StyledTableCell>
                  <StyledTableCell sx={{ width: "50px" }}>
                    <Box sx={{ ml: "10px" }}>
                      <AccessTimeIcon />
                    </Box>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {albumTracks.map((item, index) => (
                  <StyledTableRow
                    key={index+1}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                    sx={{ width: "7px",height: "50px", padding: 0, pl: 3 }}
                  >
                    <TableCell
                    sx={{
                      padding: 0,
                      pl: 3,
                    }}>
                      {hoveredRow === index ? (
                        <Stack direction="row" spacing={64}>
                          <IconButton sx={{ padding: 0, color: "black" }}>
                            <PlayArrowIcon />
                          </IconButton>
                          <IconButton sx={{ padding: 0, color: "black" }}>
                            <MoreHorizOutlinedIcon />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Typography sx={{ padding: 0 }}>{index+1}</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ width: "200px", padding: 0 }}>
                      <Box sx={{ ml: "0px" }}>{item.name}</Box>
                    </TableCell>
                    <TableCell sx={{ width: "20px", padding: 0 }}>
                      <IconButton>
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }}/>
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ width: "50px", padding: 0 }}>
                      <Box sx={{ ml: "5px" }}>{Math.floor(item.duration / 60)}:{(item.duration%60).toString().padStart(2, "0")}</Box>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Box>
  )
}

export default Albums