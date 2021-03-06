import React, { useState } from 'react';
import {
  Box,
  InputBase,
  Collapse,
  Fade,
  Typography,
  Button,
  styled,
  IconButton,
  ClickAwayListener,
  alpha,
} from '@mui/material';
import { Add, Clear } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { createListAsync } from '../../../features/lists/listsSlice.js';

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'showInput',
})(({ showInput, theme }) => ({
  width: '265px',
  minWidth: '265px',
  display: 'flex',
  flexDirection: 'column',
  minHeight: '30px',
  height: '100%',
  justifyContent: 'center',
  padding: '3px',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: showInput ? '#EBECF0' : '#ffffff52',
  '&:hover': {
    backgroundColor: showInput
      ? '#EBECF0'
      : alpha('#ffffff52', theme.palette.action[40]),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  border: `3px solid ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'white',
  width: '100%',
  maxHeight: '36px',
  padding: 0,
  fontSize: '14px',
  lineHeight: '20px',
  wordSpacing: '0px',
  [`& .MuiInputBase-input`]: {
    padding: '8px 12px',
  },
}));

const CreateNewListButton = () => {
  const dispatch = useDispatch();

  const { id } = useParams();

  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState('');

  const handleEnterKey = (e) => {
    if (e.key === 'Enter') {
      dispatch(createListAsync({ id, title }));
      setShowInput(false);
      setTitle('');
    }
  };

  const handleSubmit = () => {
    dispatch(createListAsync({ id, title }));
    setShowInput(false);
    setTitle('');
  };

  return (
    <ClickAwayListener onClickAway={() => setShowInput(false)}>
      <StyledBox showInput={showInput}>
        {showInput ? (
          <Fade in={showInput}>
            <Box sx={{ width: '100%' }}>
              <StyledInputBase
                onKeyPress={handleEnterKey}
                placeholder='Enter list title...'
                autoFocus={true}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
          </Fade>
        ) : (
          <Box
            onClick={() => setShowInput(true)}
            sx={{
              minHeight: '32px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            <Add sx={{ color: 'white' }} />
            <Typography sx={{ color: 'white' }}>Add another list</Typography>
          </Box>
        )}
        <Collapse in={showInput}>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.1 }}>
            <Button
              variant='contained'
              size='small'
              sx={{ color: 'white', mr: 1 }}
              onClick={handleSubmit}
            >
              Add list
            </Button>
            <IconButton disableRipple onClick={() => setShowInput(false)}>
              <Clear />
            </IconButton>
          </Box>
        </Collapse>
      </StyledBox>
    </ClickAwayListener>
  );
};

export default CreateNewListButton;
