import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../service/UserService";
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Button,
  Checkbox
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import axios from "axios";

const GroupChat = () => {
  const currentUser = useSelector((state)=> state.currentProfile.userId);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");

  // Fetch users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await getAllUsers();
    console.log(res.data);
    setUsers(res.data);
  };

  const handleSelectUser = (user) => {
    if (selectedUsers.includes(user.email)) {
      setSelectedUsers(selectedUsers.filter(id => id !== user.email));
    } else {
      setSelectedUsers([...selectedUsers, user.email]);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedUsers.length === 0) {
      alert("Enter group name and select users");
      return;
    }

    let res = await axios.post("http://localhost:8080/api/v1/chat-group/create-group", {
      groupName: groupName,
      members: selectedUsers,
      createBy:currentUser
    });

    alert("Group Created Successfully!");
    setGroupName("");
    setSelectedUsers([]);
  };

  const filteredUsers = users.filter(user =>
    user.userName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ width: 450, margin: "auto", mt: 5 }}>
      
      {/* Title */}
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Contacts
      </Typography>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search contacts..."
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1 }} />
        }}
        sx={{ mb: 3 }}
      />

      {/* Group Name + Button */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <TextField
          fullWidth
          label="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleCreateGroup}
        >
          Create
        </Button>
      </Box>

      {/* User List Card */}
      <Card>
        <CardContent>
          <List>
            {filteredUsers.map((user) => (
              <ListItem
                key={user.userId}
             
              >
                <Checkbox
                  checked={selectedUsers.includes(user.email)}
                  onChange={() => handleSelectUser(user)}
                />

                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "#1976d2" }}>
                    {user.userName.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={user.userName}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>

    </Box>
  );
};

export default GroupChat;
