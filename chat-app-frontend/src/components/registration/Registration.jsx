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
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import api from "../../service/Axios";
import createUser from "../../service/UserService";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    about: ""
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
    console.log(formData);
    if (createUser(formData)) {
      console.log("created user");
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        p: 2
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: 450,
          maxWidth: "100%",
          p: 5,
          borderRadius: 4,
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255,255,255,0.9)",
          textAlign: "center",
          transition: "0.3s",
          "&:hover": {
            transform: "scale(1.02)"
          }
        }}
      >
        {/* Header Icon */}
        <PersonAddAlt1Icon sx={{ fontSize: 50, color: "#1976d2", mb: 1 }} />

        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Create Account 🚀
        </Typography>

        <Typography variant="body2" color="text.secondary" mb={3}>
          Join our chat community and start connecting instantly.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2.5
          }}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="About You"
            name="about"
            value={formData.about}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              background: "linear-gradient(45deg, #1976d2, #42a5f5)",
              transition: "0.3s",
              "&:hover": {
                background: "linear-gradient(45deg, #1565c0, #1e88e5)",
                transform: "translateY(-2px)"
              }
            }}
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default Registration;
