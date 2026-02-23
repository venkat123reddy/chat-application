import { Box, IconButton, Tooltip } from "@mui/material";
import ContactsIcon from "@mui/icons-material/Contacts";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";
import Sidebar from '../sidebar/Sidebar.jsx'
import NotificationMenu from "../notification/Notification.jsx";
import GroupIcon from '@mui/icons-material/Group';
import AddIcon from '@mui/icons-material/Add';
import { setNavStatus } from "../store/store.js";
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

 
const Navbar = () => {

  const dispath = useDispatch();
  const navigate = useNavigate();

  const setStatus = (status)=>{
    dispath(setNavStatus(status));
    console.log("nav bar :"+ status);
  }

  const handleLogout = ()=>{
    navigate("/")
  }
  return (
    <>
    <Box
      sx={{
        width: 64,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        pt: 2,
        borderRight: "1px solid #ddd"
      }}
    >
      {/* <Tooltip title="Contacts">
        <IconButton><ContactsIcon /></IconButton>
      </Tooltip> */}

      <Tooltip title="Chats">
        <IconButton onClick={()=>setStatus(0)}><ChatIcon /></IconButton>
      </Tooltip>

      {/* <Tooltip title="Profile">
        <IconButton><PersonIcon /></IconButton>
      </Tooltip> */}

       <Tooltip title="Groups">
    <IconButton  onClick={()=>setStatus(1)}>
      <GroupIcon />
    </IconButton>
  </Tooltip>

  <Tooltip title="Create Group">
    <IconButton color="primary">
       <AddIcon onClick={()=>setStatus(2)} />   
    </IconButton>
  </Tooltip>
      <Tooltip>
       <NotificationMenu></NotificationMenu>
      </Tooltip>


<Tooltip title="Logout">
  <IconButton onClick={handleLogout}>
    <LogoutIcon />
  </IconButton>
</Tooltip>
    </Box>
      </>
  );
};





export default Navbar;
