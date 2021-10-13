import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  alpha,
  Box,
  InputBase,
  ClickAwayListener,
  useTheme,
  IconButton,
} from '@mui/material';
import { Close, Search } from '@mui/icons-material';
import {getCardsSearchAsync,
  getBoardsSearchAsync,
  getListsSearchAsync,
} from '../../../features/search/searchSlice';

const StyledBox = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'focus',
})(({ focus, theme }) => ({
  marginLeft: 'auto',
  backgroundColor: '#ffffff66',
  maxHeight: '32px',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  minWidth: '240px',
  maxWidth: '240px',
  '&:hover': {
    backgroundColor: '#ffffff80',
  },
  '&.Mui-focused': {
    backgroundColor: 'white',
  },
  ...(focus && {
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  }),
}));

const StyledInputBase = styled(InputBase, {
  shouldForwardProp: (prop) => prop !== 'focus',
})(({ focus, theme }) => ({
  maxHeight: '32px',
  flexGrow: 1,
  padding: '4px 4px 4px 0px',
  fontSize: '14px',
  '& .MuiInputBase-input': {
    '&::placeholder': {
      color: 'white',
      opacity: 1,
    },
  },
  ...(focus && {
    '& .MuiInputBase-input': {
      '&::placeholder': {
        color: 'black',
        opacity: 1,
      },
    },
  }),
}));

const SearchBar = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState('');

  const handleClickAway = () => {
    setFocus(false);
    setSearch('');
  };

  useEffect(() => {
    if (search) {
      dispatch(getBoardsSearchAsync(search));
      dispatch(getListsSearchAsync(search));
      dispatch(getCardsSearchAsync(search));
    }
  }, [dispatch, search]);

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <StyledBox focus={focus}>
        <Search sx={{ m: 0.5, color: focus ? 'black' : 'white' }} />
        <StyledInputBase
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          focus={focus}
          sx={{ color: focus ? 'black' : 'white' }}
          onClick={() => setFocus(true)}
          placeholder='Search'
        />
        {focus && (
          <IconButton sx={{ width: '24px', height: '24px', mr: 0.75 }}>
            <Close
              sx={{
                color: theme.palette.grey[700],
                fontSize: '16px',
              }}
            />
          </IconButton>
        )}
      </StyledBox>
    </ClickAwayListener>
  );
};

export default SearchBar;
