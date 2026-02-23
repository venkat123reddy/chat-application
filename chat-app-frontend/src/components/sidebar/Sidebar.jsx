import { Box, IconButton, Tooltip } from "@mui/material";
import { red } from "@mui/material/colors";
import { getAllUsers, getUsers } from "../../service/UserService";
import Profiles from "../profiles/Profiles";
import ChatGroups from "../groups/ChatGroups";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import GroupChat from "../groupchat/GroupChat";


const Sidebar = ()=>{

  const currentStatus = useSelector((state)=> state.navStatus.status);

  useEffect(()=>{
   console.log("currentStatus : "+currentStatus);
  },[currentStatus])
  
    const get = ()=>{
       const data = getUsers();
       console.log(data);
    }

  
    

    return (
        <>
    <Box
      sx={{
        width: 600,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        pt: 2,
        backgroundColor:red,
        borderRight: "1px solid #ddd"
      }}
    >
    {currentStatus ==0 && <Profiles></Profiles> }
    {currentStatus==1 && <ChatGroups></ChatGroups>}
    {currentStatus==2 && <GroupChat></GroupChat>}
    </Box>
   
        </>
  
    )


}

export default Sidebar;