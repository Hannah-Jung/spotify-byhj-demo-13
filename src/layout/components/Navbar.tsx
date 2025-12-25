// import Box from '@mui/material/Box'
// import LoginButton from '../../common/components/LoginButton'
// import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'

// const Navbar = () => {
//   const {data:userProfile} = useGetCurrentUserProfile()
//   return (
//     <Box display='flex' justifyContent="flex-end" alignItems="center" height="64px">
//       {userProfile? userProfile.display_name:<LoginButton/>}
//       {/* {userProfile?<img src={userProfile.images[0]?.url}/>:<LoginButton/>}       */}
//     </Box>
//   )
// }

// export default Navbar

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
} from "@mui/material";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import LoginButton from "../../common/components/LoginButton";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});

const Navbar = () => {
  const {data:userProfile, isLoading} = useGetCurrentUserProfile()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();
  // const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    queryClient.removeQueries({ queryKey: ["current-user-profile"] });
    // window.location.reload();
    queryClient.clear();
    handleMenuClose();
  };
  return (
    <Box display='flex' justifyContent="flex-end" alignItems="center" height="64px">
      {isLoading || userProfile ? (
        <ProfileContainer>
          <IconButton onClick={handleMenuOpen} size="small">
            <Avatar
              src={userProfile?.images[0]?.url || "/default-avatar.png"} 
              alt={userProfile?.display_name}
            />
          </IconButton>
          <ProfileMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            keepMounted
          >
            <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
          </ProfileMenu>
        </ProfileContainer>
      ) : (
        <LoginButton />
        
      )}
    </Box>
  )}

export default Navbar