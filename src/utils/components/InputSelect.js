import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectValue, theme) {
  return {
    fontWeight:
    selectValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({name, sValue, sMenu}) {
  const theme = useTheme();
  const [selectValue, setSelectValue] = sValue;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectValue(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id={`${name}-input-label`}>{name}</InputLabel>
        <Select
          labelId={`${name}-input-label`}
          id={`${name}-input-select`}
          value={selectValue}
          onChange={handleChange}
          input={<OutlinedInput label={name} />}
          MenuProps={MenuProps}
        >
          {sMenu.map((selectItem) => (
            <MenuItem
              key={selectItem}
              value={selectItem}
              style={getStyles(selectItem, selectValue, theme)}
            >
              {selectItem}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}