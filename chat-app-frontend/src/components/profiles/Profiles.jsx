import { getAllUsers } from "../../service/UserService";
import { useState, useEffect } from 'react';
import { 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Avatar, 
    Typography,
    Box,
    TextField,
    InputAdornment,
    IconButton,
    Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MessageIcon from '@mui/icons-material/Message';
import { useSelector, useDispatch } from "react-redux"
import { setChat } from "../store/store";

const Profiles = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const dispath = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                console.log("calling..data");
                const data = await getAllUsers();
                console.log(data.data);
                setUsers(data.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleMessage = (user) => {
        dispath(setChat(user.email));
        // Add your message/chat logic here
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Box sx={{ 
            maxWidth: 500, 
            margin: 'auto', 
            padding: 3,
            minHeight: '100vh'
        }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                Contacts
            </Typography>

            {/* Search Bar */}
            <TextField
                fullWidth
                placeholder="Search contacts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                size="small"
                sx={{ mb: 2 }}
            />

            {/* Contact List */}
            <Paper elevation={2}>
                <List>
                    {filteredUsers.map((user) => (
                        <ListItem 
                            key={user.userId}
                            secondaryAction={
                                <IconButton 
                                    edge="end" 
                                    aria-label="message"
                                    onClick={() => handleMessage(user)}
                                    sx={{
                                        color: 'primary.main',
                                        '&:hover': {
                                            backgroundColor: 'primary.light',
                                        }
                                    }}
                                >
                                    <MessageIcon />
                                </IconButton>
                            }
                            sx={{ 
                                '&:hover': { 
                                    backgroundColor: 'action.hover',
                                }
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar sx={{ bgcolor: 'primary.main' }}>
                                    {user.email.charAt(0).toUpperCase()}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText 
                                primary={user.userName}
                               
                                primaryTypographyProps={{
                                    noWrap: true,
                                    sx: { pr: 1 }
                                }}
                            />
                        </ListItem>
                    ))}
                </List>

                {/* No Results Message */}
                {filteredUsers.length === 0 && (
                    <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            No contacts found
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}

export default Profiles;