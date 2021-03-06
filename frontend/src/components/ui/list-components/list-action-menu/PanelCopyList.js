import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { copyListAsync } from '../../../../features/lists/listsSlice';
import Header from './Header';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '16px',
}));

const PanelCopyList = ({ handleClose, list }) => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState('');

  let boards = useSelector(
    (state) => state.boards.boards && Object.values(state.boards.boards)
  );

  const { currentBoard } = useSelector(
    (state) => state.boards.currentBoard && state.boards
  );

  boards = boards.filter((board) => board._id !== currentBoard._id);

  const handleOpenSelect = () => {
    setOpen(true);
  };

  const handleCloseSelect = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setSelectedBoard(e.target.value);
  };

  const handleCopy = () => {
    dispatch(
      copyListAsync({
        boardId: selectedBoard,
        listId: list._id,
        title: list.title,
        cards: list.cards,
      })
    );
    handleClose();
  };

  return (
    <Box sx={{ width: '280px' }}>
      <Header title='Copy list' backButton={true} handleClose={handleClose} />
      <Divider sx={{ mx: 2 }} />
      <StyledBox sx={{ flexDirection: 'column' }}>
        <FormControl sx={{ minWidth: '100%' }}>
          <InputLabel id='board'>Boards</InputLabel>
          <Select
            labelId='board'
            open={open}
            onClose={handleCloseSelect}
            onOpen={handleOpenSelect}
            onChange={handleChange}
            value={selectedBoard}
            label='Board'
            sx={{
              '& .MuiSelect-select': {
                fontSize: '14px',
              },
              '& .MuiSvgIcon-root': {
                display: 'none',
              },
              maxHeight: '50px',
            }}
          >
            {boards.map((board, index) => (
              <MenuItem
                key={board._id}
                sx={{ fontSize: '14px' }}
                value={board._id}
              >
                {board.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button onClick={handleCopy} variant='contained' sx={{ mt: 1 }}>
          Copy
        </Button>
      </StyledBox>
    </Box>
  );
};

export default PanelCopyList;
