import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  ClickAwayListener,
  Collapse,
} from '@mui/material';
import { Box } from '@mui/system';
import { ViewHeadline, Close } from '@mui/icons-material';
import { editBoardAsync } from '../../../../../features/boards/boardSlice';

const DescriptionSection = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);

  const currentBoard = useSelector(
    (state) => state.boards.currentBoard && state.boards.currentBoard
  );

  const handleSubmit = () => {
    dispatch(editBoardAsync({ description, id: currentBoard._id }));
    setShow(false);
  };

  useEffect(() => {
    if (currentBoard) {
      setDescription(currentBoard.description);
    }
  }, [currentBoard]);

  return (
    <Box sx={{ p: '12px' }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <ViewHeadline sx={{ width: '30px', height: '30px' }} />
        <Typography sx={{ fontWeight: 600, ml: 2 }}>Description</Typography>
      </Box>
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Box>
          <InputBase
            onClick={() => setShow(true)}
            placeholder="It's your board's time to shine! Let people know what this board is used for and what they can expect to see here"
            multiline={true}
            minRows={4}
            maxRows={20}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{
              mt: 1,
              wordWrap: 'break-word',
              width: '100%',
              backgroundColor: '#091e420a',
              fontSize: '14px',
              padding: '8px 12px',
              border: `3px solid transparent`,
              '&:hover': {
                backgroundColor: theme.palette.common.hoverDark,
              },
              '&.Mui-focused': {
                border: `3px solid ${theme.palette.primary.main}`,
                backgroundColor: 'white',
              },
              '& .MuiInputBase-input': {
                '&:hover': {
                  cursor: 'pointer',
                },
                '&:focus': {
                  cursor: 'text',
                  '&::placeholder': {
                    opacity: 0.5,
                  },
                },
                '&::placeholder': {
                  opacity: 1,
                },
              },
            }}
          />
          <Collapse in={show} timeout={300}>
            <Box sx={{ mt: 1 }}>
              <Button
                variant='contained'
                size='small'
                sx={{ minWidth: '20px' }}
                onClick={handleSubmit}
              >
                Save
              </Button>
              <IconButton sx={{ ml: 0.5 }} onClick={() => setShow(false)}>
                <Close />
              </IconButton>
            </Box>
          </Collapse>
        </Box>
      </ClickAwayListener>
    </Box>
  );
};

export default DescriptionSection;
