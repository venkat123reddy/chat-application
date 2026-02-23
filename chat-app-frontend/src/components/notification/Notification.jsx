import React, { useEffect, useState } from "react";
import {
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector, useDispatch } from 'react-redux';
import api from "../../service/Axios";

function NotificationMenu() {

  const [anchorEl, setAnchorEl] = useState(null);

  const currentUser = useSelector((state)=> state.currentProfile.userId);

  const [notifications, setNotification] = useState([]);


  useEffect(()=>{

    console.log("notifications.......");

    const fetchNotifications = async () =>{

       let res = await api.get(`api/v1/notifications/${currentUser}`);
        console.log("notifications "+res.data);
       setNotification(res.data);

    }
    fetchNotifications();
  },[currentUser])


  // const notifications = [
  //   "New message from Reddy1",
  //   "User Reddy2 is online",
  //   "You have 2 unread messages"
  // ];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {/* 🔔 Notification Icon */}
      <IconButton color="inherit" onClick={handleClick}>
        <Badge badgeContent={notifications.length} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {notifications.length === 0 ? (
          <MenuItem>
            <Typography>No notifications</Typography>
          </MenuItem>
        ) : (
          notifications.map((note, index) => (
            <MenuItem key={index} onClick={handleClose}>
              {note}
            </MenuItem>
          ))
        )}
      </Menu>
    </>
  );
}

export default NotificationMenu;
