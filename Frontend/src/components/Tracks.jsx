import { Container, Grid2, Stack, IconButton, Typography, styled, InputBase,
  alpha, Card, CardMedia, Box, TableContainer, Table, TableHead, TableRow, TableCell, 
  TableBody} from "@mui/material"
import PlayCircleFilledOutlinedIcon from '@mui/icons-material/PlayCircleFilledOutlined';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useState } from "react";
import HomeNavbar from "./HomeNavbar";
// import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: 16,
  color: theme.palette.common.black,
  // borderBottom: "1px solid black",
  padding: 0,
  // paddingBottom: 10,
  height: "40px"
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover":{
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
}))


const Tracks = () => {
  // const location = useLocation();
  // const { music } = location.state || {};
  const [hoveredRow, setHoveredRow] = useState(null);
  const track = useSelector((state) => state.music.selectedTrack || null); // Access selected track from redux store
  const min = Math.floor(track.duration / 60);
  const sec = track.duration % 60;

  const handleMouseEnter = (index) => {
    setHoveredRow(index)
  }

  const handleMouseLeave = () => {
    setHoveredRow(null)
  }

  return (
    <Box sx={{ width: "100%", minHeight: "100vh", position: "relative", backgroundColor: "darkslategray" }}>
      <HomeNavbar />
      <Container maxWidth="xl" sx={{ pt: 27, pb: 10 }}>
        <Stack direction="column" spacing={17} sx={{ pl: 7 }}>
          {/* Info about the track */}
          <Stack direction={{ xl: 'row', lg: 'column' }} spacing={5}>
            <Card sx={{ maxWidth: "300px", position: 'relative' }}>
              <CardMedia
                component="img"
                image={track.image}
                alt='Artist Img'
                sx={{ height: 270, width: 300 }}
              />
            </Card>
            <Stack direction="column" spacing={3} sx={{ pt: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Typography variant="h2" color="initial">{track.name}</Typography>
                <Typography variant="body1" color="initial">{track.artist_name}</Typography>
              </Box>
              <Typography variant="body1" color="initial">{min}:{sec.toString().padStart(2, '0')}</Typography>
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

          {/* Track */}
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
                {/* {[1].map((row, index) => ( */}
                  <StyledTableRow
                    // key={index}
                    onMouseEnter={() => handleMouseEnter(1)}
                    onMouseLeave={handleMouseLeave}
                    sx={{ width: "7px",height: "50px", padding: 0, pl: 3 }}
                  >
                    <TableCell
                    sx={{
                      // width: "70px",
                      // height: "50px",
                      // display: "flex",
                      // alignItems: "center",
                      // justifyContent: "flex-start",
                      padding: 0,
                      pl: 3,
                    }}>
                      {hoveredRow === 1 ? (
                        <Stack direction="row" spacing={64}>
                          <IconButton sx={{ padding: 0, color: "black" }}>
                            <PlayArrowIcon />
                          </IconButton>
                          <IconButton sx={{ padding: 0, color: "black" }}>
                            <MoreHorizOutlinedIcon />
                          </IconButton>
                        </Stack>
                      ) : (
                        <Typography sx={{ padding: 0 }}>1</Typography>
                      )}
                    </TableCell>
                    <TableCell sx={{ width: "200px", padding: 0 }}>
                      <Box sx={{ ml: "0px" }}>{track.name}</Box>
                    </TableCell>
                    <TableCell sx={{ width: "20px", padding: 0 }}>
                      <IconButton>
                        <FavoriteBorderOutlinedIcon sx={{ fontSize: 20 }}/>
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ width: "50px", padding: 0 }}>
                      <Box sx={{ ml: "5px" }}>{Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, "0")}</Box>
                    </TableCell>
                  </StyledTableRow>
                {/* ))} */}
              </TableBody>
            </Table>
          </TableContainer>
        </Stack>
      </Container>
    </Box>
  )
}

export default Tracks