import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Box,
  InputLabel,
  FormControl,
  Select,
  Menu,
  MenuItem,
  Button,
  ClickAwayListener,
} from '@mui/material';
import { moveCardAsync } from '../../../features/lists/listsSlice';
import CardActionsHeader from './CardActionsHeader';

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: '16px',
}));

const MoveCardMenu = ({ handleClose, open, currentCard, anchorEl }) => {
  const dispatch = useDispatch();

  const [openSelect, setOpenSelect] = useState(false);
  const [selectedList, setSelectedList] = useState('');

  const currentLists = useSelector(
    (state) =>
      state.lists.currentLists && Object.values(state.lists.currentLists)
  );

  const filteredLists = currentLists.filter(
    (list) => list._id !== currentCard.list
  );

  const handleOpenSelect = () => {
    setOpenSelect(true);
  };

  const handleCloseSelect = () => {
    setOpenSelect(false);
  };

  const handleChange = (e) => {
    setSelectedList(e.target.value);
  };

  const handleMoveCard = () => {
    dispatch(moveCardAsync({ id: currentCard._id, listId: selectedList }));
    handleClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
      <Box sx={{ width: '280px' }}>
        <CardActionsHeader handleClose={handleClose} title='Move list' />
        <StyledBox sx={{ flexDirection: 'column' }}>
          <FormControl sx={{ minWidth: '100%' }}>
            <InputLabel id='list'>Lists</InputLabel>
            <Select
              labelId='list'
              open={openSelect}
              onClose={handleCloseSelect}
              onOpen={handleOpenSelect}
              onChange={handleChange}
              value={selectedList}
              label='List'
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
              {filteredLists.map((list, index) => (
                <MenuItem
                  key={list._id}
                  sx={{ fontSize: '14px' }}
                  value={list._id}
                >
                  {list.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button onClick={handleMoveCard} variant='contained' sx={{ mt: 1 }}>
            Move
          </Button>
        </StyledBox>
      </Box>
    </Menu>
  );
};

export default MoveCardMenu;
