import { useState,useEffect,useRef } from 'react';
import { 
    Box, 
    Paper, 
    Typography, 
    TextField, 
    IconButton,
    Avatar,
    AppBar,
    Toolbar
} from '@mui/material';
import api from "../../service/Axios"
import SendIcon from '@mui/icons-material/Send';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CallIcon from '@mui/icons-material/Call';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useSelector, useDispatch } from 'react-redux';
import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";
import { getAllMessages } from '../../service/MessageService';

const GroupChat = () => {
    const currentUser = useSelector((state)=> state.currentProfile.userId);

    const currentGroup = useSelector((state)=>state.currentGroup.groupName)

    const receiver = useSelector((state)=> state.chatUser.userId);
    const stompClientRef = useRef(null);
    const [latest, setLatest] = useState([]);

    console.log("current group : "+currentGroup);
   
    useEffect(()=>{
        console.log("updated")
    },[latest]);

    useEffect(()=>{


        async function fetchMessages() {
            let res = await api.get(`http://localhost:8080/api/v1/group-messages/all/${currentGroup}`);
            let data = await res.data;
            console.log(data);
            setLatest(data);

        }

         if(currentGroup) {
        console.log(latest);
         console.log("effect")
         fetchMessages();
         console.log(latest);
        
        
    }

  

    },[currentGroup])


    //var socket = new SockJS('http://localhost:8080/ws?username=reddy2');
    //var stompClient = Stomp.over(socket);

 useEffect(() => {
    const socket = new SockJS(`http://localhost:8080/ws?username=${currentUser}`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log("Connected");

        stompClient.subscribe("/user/queue/messages", (msg) => {
          const message = JSON.parse(msg.body);
          console.log("received"+message);
          setLatest(prev => [...prev, message]);
        });
      },
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    return () => {
      stompClient.deactivate();
      console.log("connection closed")
    };
  }, []);

  const sendMessage = () => {
      if (newMessage.trim()) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });
    stompClientRef.current.publish({
      destination: "/app/groupchat/send",
      body: JSON.stringify({
        sender: currentUser,
        groupName: currentGroup,
        message: newMessage
      }),
    });
     setLatest(prev => [...prev, {
        sender: currentUser,
        receiver:receiver ,
        message: newMessage
      }]);
    setNewMessage('');

}
  };


   


    const [messages, setMessages] = useState([
        {
            receiver: "venkata",
            sender: "raj",
            time: "12:15 PM",
            content: "Is there any discount for career plan?",
        },
        {
            receiver: "raj",
            sender: "venkata",
            time: "12:15 PM",
            content: "No sir",
        },
        {
            receiver: "venkata",
            sender: "raj",
            time: "12:15 PM",
            content: "I will take",
        },
        {
            receiver: "raj",
            sender: "venkata",
            time: "12:15 PM",
            content: "This price is already discounted",
        },
        {
            receiver: "venkata",
            sender: "raj",
            time: "12:15 PM",
            content: "Previously I had taken from you only",
        },
        {
            receiver: "raj",
            sender: "venkata",
            time: "12:15 PM",
            content: "Original pricing 999/per month",
        },
        {
            receiver: "venkata",
            sender: "raj",
            time: "12:16 PM",
            content: "That's I am asking",
        },
        {
            receiver: "raj",
            sender: "venkata",
            time: "12:16 PM",
            content: "Okey",
        },
        {
            receiver: "venkata",
            sender: "raj",
            time: "12:16 PM",
            content: "I wil try to refer",
        }
    ]);

    const [newMessage, setNewMessage] = useState('');

    const handleSend = () => {
        if (newMessage.trim()) {
            const now = new Date();
            const time = now.toLocaleTimeString('en-US', { 
                hour: 'numeric', 
                minute: '2-digit',
                hour12: true 
            });

            setMessages([...messages, {
                groupName: currentGroup,
                sender: currentUser,
                time: time,
                content: newMessage
            }]);
            setNewMessage('');
        }
    };

    return (
        <Box sx={{ 
            height: '100vh', 
            width: 750,
            display: 'flex', 
            flexDirection: 'column',
            bgcolor: '#f0f0f0'
        }}>
            {/* Header */}
           {currentGroup!="aaa" && <AppBar position="static" sx={{ bgcolor: '#361ad4ff' }}>
                <Toolbar>
                    <Avatar sx={{ mr: 2 }}>
                        {currentGroup.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {currentGroup}
                    </Typography>
                
                </Toolbar>
            </AppBar>}

            {/* Chat Messages Area */}
            <Box sx={{ 
                flex: 1, 
                overflowY: 'auto',
                padding: 2,
                bgcolor: '#d6d6dbff'
            }}>
                {Array.isArray(latest) && latest.map((msg, index) => {
                    const isSent = msg.sender === currentUser;
                    return (
                        <Box
                            key={index}
                            sx={{
                                display: 'flex',
                                justifyContent: isSent ? 'flex-end' : 'flex-start',
                                mb: 1
                            }}
                        >
                            <Paper
                                sx={{
                                    padding: '8px 12px',
                                    maxWidth: '60%',
                                    bgcolor: isSent ? '#dcf8c6' : '#ffffff',
                                    borderRadius: '8px',
                                    boxShadow: '0 1px 0.5px rgba(0,0,0,0.13)'
                                }}
                            >
                                {isSent && (
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: '#0088cc',
                                            fontWeight: 600,
                                            display: 'block',
                                            mb: 0.5
                                        }}
                                    >
                                        You
                                    </Typography>
                                )}

                                 {isSent==false && (
                                    <Typography 
                                        variant="caption" 
                                        sx={{ 
                                            color: '#0088cc',
                                            fontWeight: 600,
                                            display: 'block',
                                            mb: 0.5
                                        }}
                                    >
                                    {msg.sender.split('@')[0]}
                                    </Typography>
                                )}
                                <Typography variant="body1" sx={{ mb: 0.5 }}>
                                    {msg.message}
                                </Typography>
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        color: '#667781',
                                        fontSize: '11px',
                                        display: 'block',
                                        textAlign: 'right'
                                    }}
                                >
                                    {msg.time}
                                </Typography>
                            </Paper>
                        </Box>
                    );
                })}
            </Box>

            {/* Message Input */}
            <Box sx={{ 
                p: 1, 
                bgcolor: '#f0f0f0',
                display: 'flex',
                gap: 1
            }}>
                <TextField
                    fullWidth
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            handleSend();
                        }
                    }}
                    sx={{
                        bgcolor: 'white',
                        borderRadius: '20px',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        }
                    }}
                    size="small"
                />
                <IconButton 
                    color="primary" 
                    onClick={sendMessage}
                    sx={{
                        bgcolor: '#075e54',
                        color: 'white',
                        '&:hover': {
                            bgcolor: '#064e47'
                        }
                    }}
                >
                    <SendIcon />
                </IconButton>
            </Box>
        </Box>
    );
}

export default GroupChat;