import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';

const Input = styled(MuiInput)`
  width: 'auto';
`;

export default function InputSlider({name, sideNameFlag = false, inputSliderValue, range, disabled = false}) {
  const [sliderValue, setSliderValue] = inputSliderValue;
  const [min, max] = range;

  const handleSliderChange = (event, newValue) => {
    setSliderValue(newValue);
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value >= 0) {
        setSliderValue(value);
    }
  };

  const handleBlur = () => {
    if (sliderValue < min) {
        setSliderValue(min);
    } else if (sliderValue > max) {
        setSliderValue(max);
    }
  };

  return (
    <Box sx={{ width: 250 }}>
      {!sideNameFlag ? 
            <Typography id="input-slider" gutterBottom>
                {name}
            </Typography>
            :
            <></>
      }
      <Grid container spacing={2} alignItems="center">
        {sideNameFlag ? 
                <Grid item>
                    <Typography id="input-slider" gutterBottom>
                        {name}
                    </Typography>
                </Grid>
                :
                <></>
        }
        <Grid item xs>
          <Slider
            value={typeof sliderValue === 'number' ? sliderValue : 0}
            onChange={handleSliderChange}
            min = {min}
            max = {max}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            disabled={disabled}
          />
        </Grid>
        <Grid item>
          <Input
            value={sliderValue}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: min,
              max: max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
            disabled={disabled}
          />
        </Grid>
      </Grid>
    </Box>
  );
}