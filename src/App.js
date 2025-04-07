// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import { Box, Container } from "@mui/material";
import OMRForm from "./Pages/OMRForm";
import ViewResult from "./Pages/ViewResult";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<OMRForm />} />
          <Route path="/view-result" element={<ViewResult />} />

        </Routes>
      </Container>
    </Router>
  );
};

export default App;
