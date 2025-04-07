import React from 'react';
import {
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';

const TOTAL_QUESTIONS = 100;
const ROWS = 25;

const OmrSheet = ({ responses = {}, onAnswerChange = () => {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));     // 1 column
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 2 columns
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));      // 4 columns

  const COLUMNS = isMobile ? 1 : isTablet ? 2 : 4;
  const QUESTIONS_PER_COLUMN = TOTAL_QUESTIONS / COLUMNS;

  const renderQuestion = (qNumber, colIndex, rowIndex) => {
    let bgColor = '#fff';

    const groupIndex = Math.floor(rowIndex / 5);
    if (colIndex % 2 === 0) {
      bgColor = groupIndex % 2 === 0 ? '#fff' : '#f8bbd0';
    } else {
      bgColor = groupIndex % 2 === 0 ? '#f8bbd0' : '#fff';
    }

    return (
      <Box
        key={qNumber}
        display="flex"
        alignItems="center"
        sx={{
          px: 0.5,
          py: 0.2,
          backgroundColor: bgColor,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            minWidth: 50,
          }}
        >
          {qNumber.toString().padStart(3, '0')}
        </Typography>

        <RadioGroup
          row
          name={`q-${qNumber}`}
          value={responses[qNumber] || ''}
          onChange={(e) => onAnswerChange(qNumber, e.target.value)}
          sx={{ flexGrow: 1,
            justifyContent: 'space-between', }}
        >
          {['A', 'B', 'C', 'D'].map((opt) => (
            <FormControlLabel
              key={opt}
              value={opt}
              control={
                <Radio
                  checked={responses[qNumber] === opt}
                  icon={
                    <Box
                      sx={{
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        border: '2px solid #ec407a',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: '#ec407a',
                      }}
                    >
                      {opt}
                    </Box>
                  }
                  checkedIcon={
                    <Box
                      sx={{
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        backgroundColor: 'rgb(115, 177, 239)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        border: '2px solid #ec407a',
                      }}
                    >
                      {opt}
                    </Box>
                  }
                  sx={{ p: 0.3 }}
                />
              }
              label=""
              sx={{ mx: 0.3 }}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  };

  // Calculate number of rows needed for each column based on new column count
  const questions = Array.from({ length: TOTAL_QUESTIONS }, (_, i) => i + 1);
  const columns = Array.from({ length: COLUMNS }, (_, colIndex) =>
    questions.slice(
      colIndex * QUESTIONS_PER_COLUMN,
      (colIndex + 1) * QUESTIONS_PER_COLUMN
    )
  );

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        px: 1,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 1000 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          OMR Sheet - 100 Questions
        </Typography>
  
        <Paper variant="outlined" sx={{ borderColor: '#ec407a' }}>
          <Box
            display="flex"
           flexDirection="row"
          >
            {columns.map((column, colIndex) => (
              <Box
                key={colIndex}
                sx={{
                  flex: 1,
                  minWidth: 0,
                  borderRight: colIndex < COLUMNS - 1 ? '2px solid #ec407a' : 'none',
                }}
              >
                {column.map((qNum, rowIndex) =>
                  renderQuestion(qNum, colIndex, rowIndex)
                )}
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default OmrSheet;
