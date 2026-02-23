import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Paper,
  Typography,
  InputAdornment,
  IconButton
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

import { authenticate } from "../../service/UserService";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/store";

function Login() {

  const navigate = useNavigate();
  const dispath = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(formData);
  };

  async function validate(auth) {
    let res = await authenticate(auth);
    if (res.data === true) {
      dispath(setUser(auth.username));
      navigate("/home");
    }
    return res.data;
  }

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
      <Paper
        elevation={12}
        sx={{
          width: 400,
          p: 5,
          borderRadius: 4,
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255,255,255,0.85)",
          textAlign: "center",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.02)",
          },
        }}
      >
        {/* Logo Icon */}
        <ChatBubbleOutlineIcon
          sx={{ fontSize: 50, color: "#667eea", mb: 1 }}
        />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome Back 👋
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Login to continue your chat experience
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 3 }}
        >
          <TextField
            label="User Name"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Login;
