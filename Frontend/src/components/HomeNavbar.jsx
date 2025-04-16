import Typography from '@mui/material/Typography'
import { AppBar, Box, Button, IconButton, Toolbar, Container, TextField, styled, alpha, InputBase, Menu, MenuItem, keyframes } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from '@mui/icons-material/Search';
import AdbIcon from '@mui/icons-material/Adb';
import { useState } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.background.white, 0.5),
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    // marginLeft: theme.spacing(3),
    width: '25%',
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

const slideDown = keyframes`
  from {
    transform: translateY(-2%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`
const HomeNavbar = () => {
  const [anchorEl, setAnchorEl]  =useState(null);
  const isMenUOPen = Boolean(anchorEl);
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  }
  const handleMenuClose = () => {
    setAnchorEl(null);
  }
  return (
    <Box sx={{ flexGrow:1 }}>
      <AppBar sx={{ zIndex: 1100, position: 'fixed', backgroundColor: 'gray', color: 'white' }}>
          <Toolbar>
            <Container maxWidth='xl' sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
             }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 5,
               }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <AdbIcon sx={{ mr: 1 }} />
                  <Typography variant="h2" color="initial">Logo</Typography>
                </Box>
                <Box sx={{
                  display: {xs: 'none', lg: 'flex'},
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4
                }} >
                  <Button color='inherit'>Discover</Button>
                  <Button color='inherit'>Contact</Button>
                </Box>
              </Box>
              <Box sx={{ display: {xs: 'none', lg: 'flex'}, alignItems: 'center', gap: 5 }}>
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
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:'center',
                    gap: 1
                  }}>
                  <Button color='inherit'>Register</Button>
                  <Button color='inherit'>Login</Button>
                </Box>
              </Box>
              <IconButton
                  sx={{ display: { xs: "flex", lg: "none" } }}
                  onClick={isMenUOPen ? handleMenuClose : handleMenuOpen}
                >
                  {isMenUOPen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>
            </Container>
          </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        
        sx={{
          '& .MuiPaper-root': {
            position: 'absolute',
            width: '100%',
            height: '50%',
            mt: {xs: '2.2%', lg: '1.5%'},
            pt: '4%',
            zIndex: 100,
            animation: `${slideDown} 0.5s ease-in-out`,
            display: { xs: "flex", lg: "none" },
            justifyContent: 'center',
          },
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, borderBottom: 1, pb: 2}}>
          <MenuItem sx={{ fontSize: '1.2rem' }}>Discover</MenuItem>
          <MenuItem sx={{ fontSize: '1.2rem' }}>Contact</MenuItem>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2}}>
          <MenuItem sx={{ fontSize: '1.2rem' }}>Login</MenuItem>
          <MenuItem sx={{ fontSize: '1.2rem' }}>Register</MenuItem>
        </Box>
      </Menu>
    </Box>
  )
}

export default HomeNavbar