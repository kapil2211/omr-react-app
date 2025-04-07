// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          OMR App
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" href="/">
            OMR Form
          </Button>
          <Button color="inherit" href="/view-result">
            View Result
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
