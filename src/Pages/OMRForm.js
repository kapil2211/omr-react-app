import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Paper,
} from "@mui/material";
import OMRSheet from "../Components/OMRSheet";

const TOTAL_QUESTIONS = 100;

const OMRForm = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [responses, setResponses] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Load saved data only once on mount
  useEffect(() => {
    const savedData = localStorage.getItem("omr-data");
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setRollNumber(parsed.rollNumber || "");
      setResponses(parsed.responses || {});
    }
  }, []);

  const handleAnswerChange = (questionNumber, option) => {
    setResponses((prev) => ({ ...prev, [questionNumber]: option }));
  };

  const handleSubmit = () => {
    setError("");

    if (!rollNumber.trim()) {
      setError("Please enter your Roll Number.");
      return;
    }

    const answeredCount = Object.keys(responses).length;
    if (answeredCount < TOTAL_QUESTIONS / 2) {
      setError("Please answer at least 50% of the questions.");
      return;
    }

    // ✅ Save final result to localStorage on submit
    localStorage.setItem(
      "omr-data",
      JSON.stringify({ rollNumber, responses, submitted: true })
    );

    navigate("/view-result");
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center">
        OMR Form
      </Typography>

      <Box sx={{ maxWidth: 300, mx: "auto", mb: 3 }}>
        <TextField
          fullWidth
          label="Enter Roll Number"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
      </Box>

      <OMRSheet responses={responses} onAnswerChange={handleAnswerChange} />

      {error && (
        <Typography color="error" textAlign="center" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Box textAlign="center" mt={3}>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default OMRForm;
