import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  Paper,
  Stack
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={10}
          sx={{
            p: 6,
            borderRadius: 4,
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          {/* Icon */}
          <ChatIcon sx={{ fontSize: 60, color: "#667eea", mb: 2 }} />

          {/* Title */}
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Welcome to ChatSphere 💬
          </Typography>

          {/* Subtitle */}
          <Typography variant="body1" color="text.secondary" mb={4}>
            Connect with your friends in real-time.  
            Fast, secure, and beautifully designed messaging experience.
          </Typography>

          {/* Buttons */}
          <Stack direction="column" spacing={2}>
            <Button
              variant="contained"
              size="large"
              startIcon={<LoginIcon />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/login")}
            >
              Login
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<PersonAddIcon />}
              sx={{
                py: 1.5,
                borderRadius: 3,
                fontWeight: "bold",
              }}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
};

export default WelcomePage;
