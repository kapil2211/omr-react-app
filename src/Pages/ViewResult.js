import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TOTAL_QUESTIONS = 100;
const ROWS = 25;
const COLUMNS = 4;
const QUESTIONS_PER_COLUMN = TOTAL_QUESTIONS / COLUMNS;

const ViewResult = () => {
  const [data, setData] = useState({ rollNumber: "", responses: {} });
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("omr-data");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const handleEdit = () => {
    const updatedData = { ...data, submitted: false };
    localStorage.setItem("omr-data", JSON.stringify(updatedData));
    navigate("/");
  };

  const renderQuestion = (qNumber, rowIndex) => {
    const isStriped = Math.floor(rowIndex / 5) % 2 === 1;
    const bgColor = isStriped ? "#f8bbd0" : "#fff";

    return (
      <Box
        key={qNumber}
        display="flex"
        alignItems="center"
        sx={{
          minWidth: "250px",
          px: 1,
          backgroundColor: bgColor,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            width: 30,
            textAlign: "center",
          }}
        >
          {qNumber.toString().padStart(3, "0")}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "12px",
            ml: 2,
            color: "#ec407a",
          }}
        >
          {data.responses[qNumber] || <em style={{ color: "#888" }}>Not Answered</em>}
        </Typography>
      </Box>
    );
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom align="center">
        View Result
      </Typography>

      <Typography variant="subtitle1" align="center" sx={{ mb: 3 }}>
        <strong>Roll Number:</strong> {data.rollNumber}
      </Typography>

      <Paper variant="outlined" sx={{ borderColor: "#ec407a", p: 2, overflowX: "auto" }}>
        {Array.from({ length: ROWS }, (_, rowIndex) => {
          const isStriped = Math.floor(rowIndex / 5) % 2 === 1;
          const bgColor = isStriped ? "#f8bbd0" : "#fff";

          return (
            <Box
              key={rowIndex}
              display="flex"
              flexDirection="row"
              sx={{ p: 1, backgroundColor: bgColor }}
            >
              {Array.from({ length: COLUMNS }, (_, colIndex) => {
                const qNum = rowIndex + colIndex * QUESTIONS_PER_COLUMN + 1;

                return (
                  <Box
                    key={colIndex}
                    sx={{
                      display: "flex",
                      flex: 1,
                      borderRight: colIndex < COLUMNS - 1 ? "2px solid #bdbdbd" : "none",
                    }}
                  >
                    {renderQuestion(qNum, rowIndex)}
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Paper>

      <Box textAlign="center" mt={4}>
        <Button variant="outlined" color="secondary" onClick={handleEdit}>
          Edit / Go Back
        </Button>
      </Box>
    </Container>
  );
};

export default ViewResult;
